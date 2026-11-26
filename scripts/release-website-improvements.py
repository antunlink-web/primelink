#!/usr/bin/env python3
"""primelink.hr only: package checked dist, use existing nginx/Docker cutover, retain rollback."""
import fcntl
import signal
import hashlib
import json
import os
from pathlib import Path
import pwd
import socket
import subprocess
import sys
import time
import tarfile
import tempfile
import urllib.error
import urllib.request

ROOT = Path('/opt/primelink/apps/primelink-hr/repo')
RELEASE = ROOT / 'docs/releases/website-improvements-20261019'
NAME = 'primelink-hr-app'
NETWORK = 'primelink-proxy'
DOCKER = ['docker', '--host', 'unix:///var/run/docker.sock']
# Confirmed additions in the release's src/App.tsx diff against HEAD.
NEW_ROUTES = {'/integracije-karticnog-placanja', '/izrada-web-trgovina', '/hosting-odrzavanje'}
ROUTES = ['/', '/kontakt', '/ponuda', '/ponuda/forma', '/portfolio',
          '/besplatna-seo-analiza', '/izrada-web-stranica', '/redizajn-web-stranice',
          '/izrada-crm-sustava', '/izrada-web-aplikacija', '/stripe-integracije',
          '/saas-razvoj', *sorted(NEW_ROUTES)]


def require(ok, message):
    if not ok:
        raise RuntimeError(message)


def runtime_user_options(config, image_config):
    for key in ['Cmd', 'Entrypoint', 'Env', 'User', 'WorkingDir', 'Healthcheck']:
        runtime_value = config.get(key)
        image_value = image_config.get(key)
        if key == 'User':
            # Docker's missing, null, and empty User all select the default user.
            runtime_value = '' if runtime_value is None else runtime_value
            image_value = '' if image_value is None else image_value
        require(runtime_value == image_value, 'Runtime override requires review: ' + key)
    user = config.get('User')
    return ['--user', user] if user else []


def docker(*args):
    return subprocess.check_output([*DOCKER, *args], timeout=300).decode().strip()


def inspect(name):
    return json.loads(docker('inspect', name))[0]


def save(directory, state):
    temp = directory / 'state.tmp'
    temp.write_text(json.dumps(state, indent=2))
    temp.replace(directory / 'state.json')


def healthy(cid):
    for _ in range(60):
        state = inspect(cid)['State']
        if state.get('Health', {}).get('Status') == 'healthy':
            return
        require(state['Running'] and state.get('Health', {}).get('Status') != 'unhealthy', 'Container unhealthy')
        time.sleep(2)
    raise RuntimeError('Container health timeout')


def public(*, baseline=False):
    result = {}
    for path in ROUTES:
        url = 'https://primelink.hr' + path
        try:
            with urllib.request.urlopen(url, timeout=20) as response:
                require(response.status == 200 and response.geturl() == url,
                        'Live route must return direct 200: ' + path)
                result[path] = hashlib.sha256(response.read()).hexdigest()
        except urllib.error.HTTPError as error:
            if baseline and path in NEW_ROUTES and error.code == 404 and error.geturl() == url:
                result[path] = {'status': 404}
                error.close()
            else:
                raise RuntimeError(f'Live route failed: {path} (HTTP {error.code})') from error
    return result


def archive_expected(archive):
    # Bind candidate/public bytes to the already checked, checksum-verified build.
    with tarfile.open(archive, 'r:gz') as package:
        return {path: hashlib.sha256(package.extractfile(
            'dist/' + (path.strip('/') + '/' if path != '/' else '') + 'index.html'
        ).read()).hexdigest() for path in ROUTES}


def candidate_routes(candidate, expected):
    for path in ROUTES:
        response = subprocess.run([*DOCKER, 'exec', candidate, 'wget', '-S', '-O-', 'http://127.0.0.1:3000' + path], timeout=20, check=True, capture_output=True)
        statuses = [line.strip().split()[1] for line in response.stderr.splitlines()
                    if line.strip().startswith(b'HTTP/')]
        require(statuses == [b'200'], 'Candidate route must return direct 200: ' + path)
        require(hashlib.sha256(response.stdout).hexdigest() == expected[path],
                'Candidate bytes differ from archive: ' + path)


def prepare_journal(directory, old):
    if directory.exists():
        previous = json.loads((directory / 'state.json').read_text())
        require(previous.get('status') == 'preflight' and previous.get('cutover') is False
                and previous.get('old') == old['Id'] and previous.get('old_image') == old['Image']
                and not previous.get('new_image') and not previous.get('new')
                and not (directory / 'package.log').exists(),
                'Prior attempt progressed beyond read-only preflight; inspect its journal before retry')
        # Keep evidence from the failed baseline; do not silently discard it.
        retained = Path(tempfile.mkdtemp(prefix=directory.name + '-preflight-', dir=directory.parent))
        directory.rename(retained / 'journal')
    directory.mkdir()


def rollback(directory, state):
    old = inspect(state['old'])
    require(old['Image'] == state['old_image'], 'Rollback image changed')
    require(old['Name'] in ('/' + NAME, '/' + state['rollback']), 'Rollback name changed')
    if state.get('new'):
        new = inspect(state['new'])
        require(new['Image'] == state['new_image'] and new['Name'] == '/' + NAME, 'Replacement identity changed')
        docker('stop', state['new'])
        docker('rename', state['new'], state['failed'])
        docker('network', 'disconnect', NETWORK, state['new'])
    old = inspect(state['old'])
    if old['Name'] != '/' + NAME:
        if NETWORK in old['NetworkSettings']['Networks']:
            docker('network', 'disconnect', NETWORK, state['old'])
        docker('rename', state['old'], NAME)
    if NETWORK not in inspect(state['old'])['NetworkSettings']['Networks']:
        docker('network', 'connect', NETWORK, state['old'])
    docker('start', state['old'])
    healthy(state['old'])
    require(public(baseline=True) == state['baseline'], 'Rollback public bytes differ')
    state['status'] = 'rolled-back'
    save(directory, state)


def main():
    require(socket.gethostname() == 'primelink-apps' and pwd.getpwuid(os.getuid()).pw_name == 'antun', 'Wrong host/user')
    require(Path.cwd().resolve() == ROOT, 'Wrong project directory')
    os.umask(0o077)
    lock = open(RELEASE / 'deployment.lock', 'a')
    fcntl.flock(lock.fileno(), fcntl.LOCK_EX | fcntl.LOCK_NB)
    def interrupted(number, _frame):
        raise RuntimeError('Interrupted by signal ' + str(number))
    for number in (signal.SIGTERM, signal.SIGHUP):
        signal.signal(number, interrupted)
    if len(sys.argv) == 3 and sys.argv[1] == 'rollback':
        directory = Path(sys.argv[2]).resolve()
        require(directory.parent == RELEASE and directory.name.startswith('host-'), 'Wrong release journal')
        rollback(directory, json.loads((directory / 'state.json').read_text()))
        return
    require(sys.argv[1:] == ['deploy'], 'Use deploy, or rollback <host-journal-directory>')
    archive = RELEASE / 'runtime.tar.gz'
    digest = hashlib.sha256(archive.read_bytes()).hexdigest()
    require(digest == (RELEASE / 'runtime.sha256').read_text().strip(), 'Runtime archive changed')
    expected = archive_expected(archive)
    old = inspect(NAME)  # Fresh production version; never reuse historical IDs.
    require(old['State']['Running'] and old['State'].get('Health', {}).get('Status') == 'healthy', 'Production is not healthy')
    require(set(old['NetworkSettings']['Networks']) == {NETWORK}, 'Unexpected production networks')
    require(not old['Mounts'] and not old['HostConfig'].get('PortBindings'), 'Unexpected mounts or host ports')
    require(old['HostConfig']['RestartPolicy'] == {'Name': 'unless-stopped', 'MaximumRetryCount': 0}, 'Unexpected restart policy')
    require('3000/tcp' in old['Config']['ExposedPorts'], 'Wrong application port')
    original_image = json.loads(docker('image', 'inspect', old['Image']))[0]
    require(original_image['Config'].get('Labels', {}).get('org.opencontainers.image.title') == 'primelink.hr', 'Wrong project image')
    user_options = runtime_user_options(old['Config'], original_image['Config'])
    suffix = digest[:12]
    directory = RELEASE / ('host-' + suffix)
    prepare_journal(directory, old)
    state = {'old': old['Id'], 'old_image': old['Image'], 'old_tag': old['Config']['Image'],
             'rollback': NAME + '-rollback-' + suffix, 'failed': NAME + '-failed-' + suffix,
             'status': 'preflight', 'cutover': False}
    (directory / 'production.json').write_text(json.dumps(old, indent=2))
    save(directory, state)
    print('Current production:', old['Id'], old['Image'], old['Config']['Image'], flush=True)
    for name in [state['rollback'], state['failed'], NAME + '-candidate-' + suffix]:
        require(not docker('ps', '-aq', '--filter', 'name=^/' + name + '$'), 'Reserved name occupied: ' + name)
    state['baseline'] = public(baseline=True)
    save(directory, state)
    image = 'primelink/primelink-hr:website-20261019-' + suffix
    require(not docker('image', 'ls', '-q', image), 'Release image tag already exists')
    with archive.open('rb') as context, (directory / 'package.log').open('wb') as log:
        subprocess.run([*DOCKER, 'build', '--build-arg', 'BUILD_COMMIT=bc298f6bcbf0d124e3fcb2268ebb31ac1dd3bcdb',
                        '--label', 'hr.primelink.runtime-sha256=' + digest, '--tag', image, '-'],
                       stdin=context, stdout=log, stderr=subprocess.STDOUT, check=True, timeout=600)
    state['new_image'] = json.loads(docker('image', 'inspect', image))[0]['Id']
    save(directory, state)
    candidate = docker('create', '--name', NAME + '-candidate-' + suffix, '--network', NETWORK, '--restart', 'unless-stopped', *user_options, state['new_image'])
    state['candidate'] = candidate
    save(directory, state)
    candidate_info = inspect(candidate)
    # Match all HostConfig fields, including unexpected limits/capabilities. No guessing.
    def comparable(container):
        host = dict(container['HostConfig'])
        host.pop('ConsoleSize', None)
        host['Dns'] = host.get('Dns') or []
        host['OomKillDisable'] = bool(host.get('OomKillDisable'))
        return host
    require(comparable(candidate_info) == comparable(old), 'Runtime differs from production; no cutover')
    try:
        docker('start', candidate)
        healthy(candidate)
        docker('exec', candidate, 'nginx', '-t')
        candidate_routes(candidate, expected)
    finally:
        docker('stop', candidate)
    current = inspect(NAME)
    require(current['Id'] == old['Id'] and current['Image'] == old['Image'] and current['HostConfig'] == old['HostConfig'], 'Production changed during preparation')
    require(public(baseline=True) == state['baseline'], 'Public production changed during preparation')
    save(directory, state)
    try:
        state['cutover'] = True
        save(directory, state)
        docker('stop', old['Id'])
        docker('rename', old['Id'], state['rollback'])
        docker('network', 'disconnect', NETWORK, old['Id'])
        state['new'] = docker('create', '--name', NAME, '--network', NETWORK, '--restart', 'unless-stopped', *user_options, state['new_image'])
        save(directory, state)
        docker('start', state['new'])
        healthy(state['new'])
        docker('exec', state['new'], 'nginx', '-t')
        require(public() == expected, 'Live route bytes differ from verified archive')
        state['status'] = 'deployed-original-retained'
        save(directory, state)
        print('DEPLOYED. Rollback journal:', directory)
    except BaseException:
        rollback(directory, state)
        raise


if __name__ == '__main__':
    main()
