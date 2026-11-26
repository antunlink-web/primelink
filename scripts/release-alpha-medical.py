#!/usr/bin/env python3
"""Project-specific Alpha Medical release. Only deploy/rollback mutate Docker."""

import argparse
import fcntl
import gzip
import hashlib
from http.client import HTTPResponse
import io
import json
import os
from pathlib import Path
import pwd
import re
import signal
import socket
import stat
import subprocess
import sys
import tarfile
import time
from functools import cmp_to_key
from urllib.error import HTTPError
from urllib.parse import urljoin, urlsplit
from urllib.request import HTTPRedirectHandler, ProxyHandler, Request, build_opener

ROOT = Path('/opt/primelink/apps/primelink-hr/repo')
HEAD = 'bc298f6bcbf0d124e3fcb2268ebb31ac1dd3bcdb'
IMAGE = 'primelink/primelink-hr:release-bc298f6'
IMAGE_ID = 'sha256:aa4bbc83ab541bde6b7b7da928ca703e7e385ed81a92785eec59537453e5d032'
OLD_ID = '0b166373c1a8856649b8930835a2168c8566c815959521e0be1456e30c2a6a9c'
CONTAINER = 'primelink-hr-app'
NETWORK = 'primelink-proxy'
RELEASE = 'alpha-medical-20261017'
CANDIDATE = CONTAINER + '-candidate-' + RELEASE
ROLLBACK = CONTAINER + '-rollback-bc298f6-' + RELEASE
FAILED = CONTAINER + '-failed-' + RELEASE
MANIFEST = ROOT / 'docs/releases/alpha-medical-20261017.inputs.json'
ALPHA = 'src/assets/projects/alpha-medical-portfolio.webp'
REVIEWED_MANIFEST = '201a2e3c8c71e048e483c4945fe4549aaad6c26b4b75857f8126e834ccc2a276'
SOURCE_SHA = 'c8f7000f20fd3060e03a276db1b3b6f79b35d46eb92bfd38632b93c35fdaa388'
EXPECTED_STATUS = sorted([
    ' D src/assets/projects/airwolt-portfolio.webp', ' M scripts/check-static.ts',
    ' M src/data/portfolio-sort.ts', ' M src/i18n/locales/en.json',
    ' M src/i18n/locales/hr.json', ' M src/pages/PortfolioPage.tsx',
    '?? docs/releases/alpha-medical-20261017.inputs.json',
    '?? docs/releases/alpha-medical-20261017.txt', '?? scripts/release-alpha-medical.py',
    '?? src/assets/projects/alpha-medical-portfolio.webp',
])
DOCKER = ['docker', '--host', 'unix:///var/run/docker.sock']
CONFIG_KEYS = ('User', 'WorkingDir', 'Entrypoint', 'Cmd', 'Env', 'Healthcheck',
               'ExposedPorts', 'StopSignal', 'StopTimeout', 'Shell', 'Volumes', 'Labels')
# Exact output of the locked Vite compiler for the reviewed sorter. A compiler
# format change fails closed; do not silently infer order from declaration order.
SORTER = ('const m=["luxurysecondhand","trazilica","chairs"];function I(s){return '
          's.map((r,o)=>({...r,sortOrder:r.sortOrder??o})).sort((r,o)=>{const '
          'n=m.findIndex(i=>i===r.id),l=m.findIndex(i=>i===o.id);if(n!==l)return '
          'n<0?1:l<0?-1:n-l;if(!!r.pinned!=!!o.pinned)return r.pinned?-1:1;const '
          'a=r.publishedAt??r.completedAt,t=o.publishedAt??o.completedAt;return '
          'a&&t&&a!==t?a<t?1:-1:!!a!=!!t?a?-1:1:r.sortOrder-o.sortOrder})}')
EXPECTED_DOMAINS = ('luxurysecondhand.hr trazilica.hr chairs.hr alpha-medical.hr '
                    'hpc-spg.hr pingvinsport.com careflow.hr flowcall.eu lajt.hr '
                    'flowsms.eu textro.eu mojakarta.hr perks.hr lumibaby.hr '
                    'aurumgradnja.com tijelokaodioprirode.eu evaciglar.eu '
                    'infinityservices.hr konzalting.primelink.hr prika.hr protekst.eu '
                    'udrugalumen.hr voltapp.hr yogawithnika.eu dadathlon.eu '
                    'daddyhood.eu donatice.eu controlmaster.hr arks.hr euroratan.com '
                    'xiiigimnazija.hr').split()


def require(condition, message):
    if not condition:
        raise RuntimeError(message)


def digest(data):
    return hashlib.sha256(data).hexdigest()


def canonical(value):
    return json.dumps(value, sort_keys=True, separators=(',', ':')).encode()


def git(*args):
    return subprocess.check_output(['git', '--no-optional-locks', *args], cwd=ROOT)


def identity():
    require(Path.cwd().resolve() == ROOT, 'Run from the exact repository root')
    require(Path(__file__).resolve() == ROOT / 'scripts/release-alpha-medical.py', 'Wrong script location')
    require(socket.gethostname() == 'primelink-apps', 'Wrong hostname')
    require(pwd.getpwuid(os.getuid()).pw_name == 'antun' and os.getuid() == os.geteuid(), 'Run as antun without sudo')


def status_entries():
    entries = git('status', '--porcelain=v1', '-z', '--untracked-files=all').decode().split('\0')
    require(all(entry[:2].strip() not in ('R', 'C') for entry in entries if entry), 'Renames/copies require new review')
    return sorted(entry for entry in entries if entry)


def verify():
    identity()
    require(git('rev-parse', '--show-toplevel').decode().strip() == str(ROOT), 'Wrong Git root')
    require(git('rev-parse', 'HEAD').decode().strip() == HEAD, 'Git revision changed')
    for operation in ('MERGE_HEAD', 'CHERRY_PICK_HEAD', 'REVERT_HEAD', 'rebase-merge', 'rebase-apply'):
        require(not (ROOT / '.git' / operation).exists(), 'Git operation in progress')
    require(not MANIFEST.is_symlink(), 'Manifest symlink forbidden')
    raw = MANIFEST.read_bytes()
    manifest = json.loads(raw)
    require(manifest['base_revision'] == HEAD and manifest['release'] == RELEASE, 'Manifest identity changed')
    require(manifest['reviewed_manifest_sha256'] == REVIEWED_MANIFEST, 'Reviewed preparation changed')
    require(status_entries() == manifest['working_tree_status'] == EXPECTED_STATUS,
            'Working tree/index/untracked files differ from reviewed snapshot')
    context_files = manifest['context_files']
    require(context_files == sorted(set(context_files)), 'Noncanonical context allowlist')
    require(set(manifest['files']) == set(context_files) | {
        'docs/releases/alpha-medical-20261017.txt', 'scripts/release-alpha-medical.py',
        'src/assets/projects/airwolt-portfolio.webp'}, 'Release input inventory changed')
    require(digest(canonical({k: manifest['files'][k] for k in context_files})) == SOURCE_SHA,
            'Build inputs differ from the original reviewed source snapshot')
    require(manifest['source_context_sha256'] == SOURCE_SHA, 'Source fingerprint changed')
    for name, expected in manifest['files'].items():
        relative = Path(name)
        require(not relative.is_absolute() and '..' not in relative.parts, 'Unsafe input path')
        path = ROOT / name
        require(path.resolve() == path and not path.is_symlink(), f'Symlink forbidden: {name}')
        if expected is None:
            require(not path.exists(), f'Deleted input restored: {name}')
        else:
            require(path.is_file() and stat.S_ISREG(path.stat().st_mode), f'Missing regular file: {name}')
            require(stat.S_IMODE(path.stat().st_mode) == expected['mode'], f'File mode changed: {name}')
            require(digest(path.read_bytes()) == expected['sha256'], f'File bytes changed: {name}')
    require(ALPHA in context_files and 'src/assets/projects/airwolt-portfolio.webp' not in context_files,
            'Alpha/Airwolt context mismatch')
    # The route list is independently pinned by the source checks and this list.
    require(manifest['public_routes'] == ['/', '/besplatna-seo-analiza', '/izrada-crm-sustava',
            '/izrada-web-aplikacija', '/izrada-web-stranica', '/kontakt', '/ponuda', '/ponuda/forma',
            '/portfolio', '/redizajn-web-stranice', '/saas-razvoj', '/stripe-integracije'], 'Route matrix changed')
    return manifest, digest(raw)


def run(*args, data=None, timeout=30):
    # Never expose Docker stderr, raw inspection, environments or health logs.
    try:
        result = subprocess.run([*DOCKER, *args], input=data, stdout=subprocess.PIPE,
                                stderr=subprocess.PIPE, timeout=timeout, check=False)
    except subprocess.TimeoutExpired:
        raise RuntimeError(f'Docker {args[0]} timed out') from None
    require(result.returncode == 0, f'Docker {args[0]} failed (details withheld; inspect this project securely)')
    return result.stdout


def docker_json(*args):
    return json.loads(run(*args))


def inspect(cid):
    result = docker_json('container', 'inspect', cid)
    require(len(result) == 1, 'Ambiguous container identity')
    return result[0]


def named(name):
    # Listing distinguishes an absent object from an inspection/daemon failure.
    ids = run('container', 'ls', '-aq', '--no-trunc', '--filter', 'name=^/' + name + '$').decode().split()
    require(len(ids) <= 1, 'Ambiguous reserved name')
    return inspect(ids[0]) if ids else None


def unused(name):
    require(named(name) is None, f'Reserved container name already exists: {name}')


def image_unused(tag):
    require(not run('image', 'ls', '-aq', '--no-trunc', '--filter', 'reference=' + tag).strip(), 'Release image tag already exists')


def defaults(container, image):
    for key in CONFIG_KEYS:
        actual = container['Config'].get(key)
        expected = image['Config'].get(key)
        if key == 'User':
            actual = actual or ''
            expected = expected or ''
        require(actual == expected, f'Unexpected runtime image override: {key}')
    require(not container['Config'].get('Tty') and not container['Config'].get('OpenStdin'), 'Unexpected interactive runtime')


def runtime(container, network, restart):
    host = container['HostConfig']
    require(host['NetworkMode'] == network, 'Network mode changed')
    require(host['RestartPolicy'] == {'Name': restart, 'MaximumRetryCount': 0}, 'Restart policy changed')
    require(not container['Mounts'], 'Unexpected mounts')
    for key in ('Binds', 'Mounts', 'PortBindings', 'VolumesFrom', 'Devices', 'DeviceRequests',
                'CapAdd', 'CapDrop', 'SecurityOpt', 'Tmpfs', 'Ulimits', 'Dns', 'DnsOptions',
                'DnsSearch', 'ExtraHosts', 'Links', 'GroupAdd', 'Sysctls'):
        require(not host.get(key), f'Unexpected runtime setting: {key}')
    for key in ('Privileged', 'ReadonlyRootfs', 'PublishAllPorts', 'AutoRemove', 'Init',
                'Memory', 'MemoryReservation', 'NanoCpus', 'CpuQuota', 'CpuPeriod', 'CpuShares',
                'CpusetCpus', 'CpusetMems', 'PidsLimit', 'CgroupParent', 'PidMode', 'UTSMode',
                'UsernsMode', 'OomKillDisable', 'OomScoreAdj'):
        require(not host.get(key), f'Unexpected runtime setting: {key}')
    expected_networks = {NETWORK} if network == NETWORK else {'none'}
    require(set(container['NetworkSettings']['Networks']) == expected_networks, 'Unexpected attached networks')
    endpoint = container['NetworkSettings']['Networks'][network]
    require(not endpoint.get('Aliases') and not endpoint.get('IPAMConfig') and not endpoint.get('Links')
            and not endpoint.get('DriverOpts') and not endpoint.get('GwPriority'), 'Unexpected network overrides')


def local_daemon():
    for key in ('DOCKER_HOST', 'DOCKER_CONTEXT', 'DOCKER_TLS_VERIFY', 'DOCKER_CERT_PATH'):
        require(not os.environ.get(key), f'Unset {key}; release uses only the reviewed local Docker socket')
    info = docker_json('info', '--format', '{{json .}}')
    require(info['Name'] == 'primelink-apps', 'Wrong Docker daemon host')
    network = docker_json('network', 'inspect', NETWORK)[0]
    require(network['Name'] == NETWORK and network['Driver'] == 'bridge' and not network.get('Internal'), 'Proxy network changed')
    return info['ID'], network['Id']


def inspect_production():
    container = inspect(CONTAINER)
    image = docker_json('image', 'inspect', IMAGE)[0]
    require(container['Id'] == OLD_ID and container['Name'] == '/' + CONTAINER, 'Production container identity changed')
    require(container['Image'] == image['Id'] == IMAGE_ID, 'Production image ID changed')
    require(container['Config']['Image'] == IMAGE, 'Production image reference changed')
    require(container['State']['Running'] and container['State'].get('Health', {}).get('Status') == 'healthy', 'Production is not healthy')
    require(container['Config'].get('User') == '', 'Production user setting changed')
    defaults(container, image)
    runtime(container, NETWORK, 'unless-stopped')
    return container


def write_context(manifest, destination):
    # Snapshot every byte before emitting anything. No later build reads the tree.
    files = []
    for name in manifest['context_files']:
        data = (ROOT / name).read_bytes()
        require(digest(data) == manifest['files'][name]['sha256'], f'Input changed during snapshot: {name}')
        files.append((name, data))
    with tarfile.open(fileobj=destination, mode='w|') as archive:
        for name, data in files:
            info = tarfile.TarInfo(name)
            info.size, info.mode, info.mtime = len(data), manifest['files'][name]['mode'], 0
            archive.addfile(info, io.BytesIO(data))


class NoRedirect(HTTPRedirectHandler):
    def redirect_request(self, req, fp, code, msg, headers, newurl):
        return None


class BufferSocket:
    def __init__(self, data):
        self.data = data

    def makefile(self, *_args):
        return io.BytesIO(self.data)


def transport(cid=None):
    opener = build_opener(ProxyHandler({}), NoRedirect())

    def request(path, compressed=False):
        require(path.startswith('/') and not path.startswith('//') and not urlsplit(path).netloc
                and '\r' not in path and '\n' not in path, 'Unsafe HTTP path')
        headers = {'User-Agent': 'PrimeLink-release/2', 'Cache-Control': 'no-cache',
                   'Accept-Encoding': 'gzip' if compressed else 'identity'}
        if cid:
            packet = ('GET ' + path + ' HTTP/1.1\r\nHost: primelink.hr\r\nConnection: close\r\n' +
                      ''.join(k + ': ' + v + '\r\n' for k, v in headers.items()) + '\r\n').encode()
            raw = run('exec', '-i', cid, 'nc', '-w', '15', '127.0.0.1', '3000', data=packet, timeout=20)
            response = HTTPResponse(BufferSocket(raw))
            response.begin()
        else:
            try:
                response = opener.open(Request('https://primelink.hr' + path, headers=headers), timeout=15)
            except HTTPError as error:
                response = error
        with response:
            body = response.read(10_000_001)
            require(len(body) <= 10_000_000, 'HTTP response too large')
            return response.status, response.headers, body
    return request


def portfolio_order(js):
    text = js.decode()
    require(SORTER in text, 'Served sorter differs from the reviewed locked compiler output')
    match = re.search(r'([\w$]+)=(\[\{id:"luxurysecondhand".*?\}\])', text)
    require(match is not None, 'Served project array missing')
    data_var = re.escape(match[1])
    sorted_match = re.search(r'([\w$]+)=I\(' + data_var + r'\)', text[match.end():])
    require(sorted_match is not None, 'Served data does not use the reviewed sorter')
    sorted_var = re.escape(sorted_match[1])
    require(re.search(r'==="all"\?' + sorted_var + ':' + sorted_var + r'\.filter\(', text), 'All filter does not use sorted projects')
    projects = []
    for item in re.findall(r'\{id:"[^"{}]+"[^{}]*\}', match[2]):
        fields = {}
        for key in ('id', 'name', 'url', 'publishedAt', 'completedAt', 'sortOrder', 'pinned'):
            field = re.search(r'\b' + key + r':("(?:[^"\\]|\\.)*"|!0|!1|true|false|-?\d+)', item)
            if field:
                fields[key] = {'!0': True, '!1': False}.get(field[1]) if field[1] in ('!0', '!1') else json.loads(field[1])
        fields.setdefault('sortOrder', len(projects))
        projects.append(fields)
    pins = ['luxurysecondhand', 'trazilica', 'chairs']

    def compare(a, b):
        ap = pins.index(a['id']) if a['id'] in pins else 3
        bp = pins.index(b['id']) if b['id'] in pins else 3
        if ap != bp:
            return ap - bp
        if bool(a.get('pinned')) != bool(b.get('pinned')):
            return -1 if a.get('pinned') else 1
        ad, bd = a.get('publishedAt', a.get('completedAt')), b.get('publishedAt', b.get('completedAt'))
        if ad and bd and ad != bd:
            return -1 if ad > bd else 1
        if bool(ad) != bool(bd):
            return -1 if ad else 1
        return a['sortOrder'] - b['sortOrder']

    projects.sort(key=cmp_to_key(compare))
    require(len(projects) == 31 and [urlsplit(p['url']).hostname for p in projects] == EXPECTED_DOMAINS,
            'Served portfolio count/order differs; expected Luxury, Trazilica, chairs, Alpha, then retained projects')
    print('PASS: served compiled portfolio: 31 projects; Luxury, Trazilica, chairs, Alpha first')


def check_http(manifest, release_content=False, cid=None):
    request = transport(cid)
    evidence = {}

    def fetch(path, expected=200, cache=None, compressed=False):
        status, headers, body = request(path, compressed)
        require(status == expected, f'HTTP {status}, expected {expected}: {path}')
        if cache:
            require(cache in headers.get('Cache-Control', ''), f'Unexpected cache policy: {path}')
        if compressed:
            require(headers.get('Content-Encoding') == 'gzip', 'gzip missing')
            body = gzip.decompress(body)
        evidence[path] = digest(body)
        return body, headers

    for path in manifest['public_routes']:
        fetch(path, cache='no-cache')
    portfolio, _ = fetch('/portfolio', cache='no-cache')
    text = portfolio.decode()
    require('href="https://primelink.hr/portfolio"' in text, 'Portfolio canonical missing')
    for path in ('/portfolio/', '/PORTFOLIO', '/ponuda/forma', '/robots.txt', '/sitemap.xml'):
        fetch(path)
    for path, target in (('/usluge/portfolio', '/portfolio'), ('/USLUGE/PORTFOLIO/', '/PORTFOLIO'),
                         ('/usluge/release-check-missing', '/release-check-missing')):
        _, headers = fetch(path, 302)
        require(headers.get('Location') == target, f'Unexpected relative redirect: {path}')
    for path in ('/release-check-missing', '/portfolio/release-check-missing', '/usluge/ponuda/forma',
                 '/404.html', '/assets/release-check-missing.js', '/vendor/fonts/release-check-missing.ttf'):
        body, _ = fetch(path, 404, 'no-cache')
        require(re.search(rb'noindex,\s*nofollow', body), f'404 robots missing: {path}')
    fetch('/vendor/fonts/inter.css', cache='no-cache')
    for font in ('inter-a699af1dea30.ttf', 'inter-e45972c7e9f2.ttf', 'inter-6f49e1b28bce.ttf'):
        data, _ = fetch('/vendor/fonts/' + font, cache='max-age=31536000, immutable')
        require(digest(data) == manifest['files']['public/vendor/fonts/' + font]['sha256'], 'Font bytes changed')
    scripts = re.findall(r'<script\b[^>]*\bsrc="(/assets/[^"<>]+\.js)"', text)
    require(scripts, 'No main JavaScript found')
    main = b''
    for path in scripts:
        data, _ = fetch(path, cache='max-age=31536000, immutable')
        main += data
    # gzip is validated directly on nginx; proxies may legitimately recompress.
    if cid:
        original_sha = evidence[scripts[0]]
        raw, _ = fetch(scripts[0], cache='immutable', compressed=True)
        require(digest(raw) == original_sha, 'gzip changed JavaScript bytes')
    for path in re.findall(r'<link\b[^>]*\bhref="(/assets/[^"<>]+\.css)"', text):
        fetch(path, cache='max-age=31536000, immutable')
    chunks = re.findall(rb'["\']([^"\']*PortfolioPage-[A-Za-z0-9_-]+\.js)["\']', main)
    require(chunks, 'No PortfolioPage chunk in main JavaScript')
    paths = {urlsplit(urljoin('https://primelink.hr' + scripts[0], item.decode())).path for item in chunks}
    require(len(paths) == 1, 'Expected one portfolio chunk')
    portfolio_js, _ = fetch(paths.pop(), cache='max-age=31536000, immutable')
    if release_content:
        require(b'airwolt' not in main.lower(), 'Airwolt found in main bundle/locales')
        require(b'https://alpha-medical.hr/' in portfolio_js, 'Alpha URL missing from served portfolio')
        require(b'airwolt' not in portfolio_js.lower(), 'Airwolt found in served portfolio')
        portfolio_order(portfolio_js)
        images = set(re.findall(rb'/assets/alpha-medical-portfolio-[A-Za-z0-9_-]+\.webp', portfolio_js))
        require(len(images) == 1, 'Expected one served Alpha screenshot')
        data, headers = fetch(images.pop().decode(), cache='max-age=31536000, immutable')
        require(headers.get_content_type() == 'image/webp', 'Alpha content type differs')
        require(digest(data) == manifest['files'][ALPHA]['sha256'], 'Served Alpha screenshot differs')
    print('PASS: ' + ('container loopback' if cid else 'public HTTPS') + ' route/assets/cache/content checks')
    return evidence


def public_policy():
    opener = build_opener(ProxyHandler({}), NoRedirect())
    policy = {}
    for url in ('http://primelink.hr/', 'http://www.primelink.hr/', 'https://www.primelink.hr/'):
        try:
            response = opener.open(Request(url, headers={'Cache-Control': 'no-cache'}), timeout=15)
        except HTTPError as error:
            response = error
        with response:
            require(response.status in (200, 301, 302, 307, 308), 'Unexpected HTTP/www policy')
            policy[url] = [response.status, response.headers.get('Location')]
    return policy


def healthy(cid, timeout=120):
    deadline = time.monotonic() + timeout
    while time.monotonic() < deadline:
        state = inspect(cid)['State']
        require(state['Running'], 'Container exited before becoming healthy')
        if state.get('Health', {}).get('Status') == 'healthy':
            return
        require(state.get('Health', {}).get('Status') != 'unhealthy', 'Container became unhealthy')
        time.sleep(2)
    raise RuntimeError('Health deadline exceeded')


def checked_id(cid):
    require(isinstance(cid, str) and re.fullmatch(r'[0-9a-f]{64}', cid), 'Invalid recorded container ID')
    return cid


def save_state(directory, state):
    temporary = directory / 'state.next'
    with temporary.open('w', encoding='utf8') as output:
        json.dump(state, output, sort_keys=True, indent=2)
        output.write('\n')
        output.flush()
        os.fsync(output.fileno())
    temporary.replace(directory / 'state.json')
    fd = os.open(directory, os.O_RDONLY | os.O_DIRECTORY)
    try:
        os.fsync(fd)
    finally:
        os.close(fd)


def stage(directory, state, value):
    state['phase'] = value
    save_state(directory, state)
    print('RELEASE: ' + value, flush=True)


def release_image(tag, manifest_hash, expected_id=None):
    image = docker_json('image', 'inspect', tag)[0]
    if expected_id:
        require(image['Id'] == expected_id, 'Release image/tag changed')
    labels = image['Config'].get('Labels') or {}
    require(labels.get('org.opencontainers.image.title') == 'primelink.hr'
            and labels.get('org.opencontainers.image.revision') == HEAD
            and labels.get('io.primelink.release.inputs.sha256') == manifest_hash
            and labels.get('io.primelink.release.source.sha256') == SOURCE_SHA
            and labels.get('io.primelink.release.dirty') == 'true', 'Release image labels changed')
    return image


def same_daemon(state):
    require(local_daemon() == (state['daemon_id'], state['network_id']), 'Daemon/network identity changed')


def signal_failure(number, _frame):
    raise RuntimeError(f'Interrupted by signal {number}')


def install_signals(handler):
    return {s: signal.signal(s, handler) for s in (signal.SIGINT, signal.SIGTERM, signal.SIGHUP)}


def restore_signals(handlers):
    for number, handler in handlers.items():
        signal.signal(number, handler)


def recover(directory, state, manifest):
    # Recovery depends on immutable Docker IDs and saved baseline, never on the
    # current source tree still passing verify(). Ignore further catchable signals.
    handlers = install_signals(signal.SIG_IGN)
    try:
        same_daemon(state)
        require(state['old_id'] == OLD_ID and state['old_image'] == IMAGE_ID and state['source_sha256'] == SOURCE_SHA,
                'Rollback journal identity changed')
        old = inspect(OLD_ID)
        require(old['Image'] == IMAGE_ID and old['Name'] in ('/' + CONTAINER, '/' + ROLLBACK), 'Original rollback identity changed')
        require(digest(canonical(old['HostConfig'])) == state['original_host_config_sha256']
                and digest(canonical(old['Config'])) == state['original_config_sha256'], 'Original rollback configuration changed')
        require(docker_json('image', 'inspect', IMAGE)[0]['Id'] == IMAGE_ID, 'Original image/tag changed')
        new_id = state.get('new_id')
        cidfile = directory / 'replacement.cid'
        if not new_id and cidfile.exists():
            new_id = checked_id(cidfile.read_text().strip())
            state['new_id'] = new_id
        live = named(CONTAINER)
        require(not live or live['Id'] in (OLD_ID, new_id), 'Unknown container occupies production name; refusing to touch it')
        if new_id:
            new = inspect(checked_id(new_id))
            require(new['Image'] == state['new_image_id'] and new['Config']['Image'] == state['new_image_id']
                    and new['Name'] in ('/' + CONTAINER, '/' + FAILED), 'Replacement identity changed')
            failed = named(FAILED)
            require(not failed or failed['Id'] == new_id, 'Unknown container occupies failed name')
            require(set(new['NetworkSettings']['Networks']) <= {NETWORK}, 'Replacement acquired unexpected networks')
            if new['State']['Running']:
                run('container', 'stop', '--time', '15', new_id, timeout=40)
            if new['Name'] != '/' + FAILED:
                run('container', 'rename', new_id, FAILED)
            if NETWORK in inspect(new_id)['NetworkSettings']['Networks']:
                run('network', 'disconnect', NETWORK, new_id)
        old = inspect(OLD_ID)
        require(set(old['NetworkSettings']['Networks']) <= {NETWORK}, 'Original acquired unexpected networks')
        if old['Name'] != '/' + CONTAINER:
            # Clear stale Docker-generated DNS names before reconnecting live name.
            if NETWORK in old['NetworkSettings']['Networks']:
                run('network', 'disconnect', NETWORK, OLD_ID)
            run('container', 'rename', OLD_ID, CONTAINER)
        if NETWORK not in inspect(OLD_ID)['NetworkSettings']['Networks']:
            run('network', 'connect', NETWORK, OLD_ID)
        if not inspect(OLD_ID)['State']['Running']:
            run('container', 'start', OLD_ID)
        healthy(OLD_ID)
        inspect_production()
        require(check_http(manifest) == state['baseline_http'], 'Public baseline bytes did not return after rollback')
        require(public_policy() == state['public_policy'], 'HTTP/www baseline policy did not return')
        stage(directory, state, 'rolled-back-original-healthy')
    finally:
        restore_signals(handlers)


def deploy(manifest, manifest_hash):
    daemon_id, network_id = local_daemon()
    original = inspect_production()
    for name in (CANDIDATE, ROLLBACK, FAILED):
        unused(name)
    tag = f'primelink/primelink-hr:release-bc298f6-{RELEASE}-{manifest_hash[:12]}'
    image_unused(tag)
    directory = Path('/tmp') / f'primelink-hr-{RELEASE}-{manifest_hash[:12]}'
    directory.mkdir(mode=0o700)  # Exclusive: never overwrite or resume a previous attempt.
    state = {'release': RELEASE, 'inputs_sha256': manifest_hash, 'source_sha256': SOURCE_SHA,
             'old_id': OLD_ID, 'old_image': IMAGE_ID, 'new_image': tag,
             'daemon_id': daemon_id, 'network_id': network_id, 'cutover_started': False,
             'original_host_config_sha256': digest(canonical(original['HostConfig'])),
             'original_config_sha256': digest(canonical(original['Config']))}
    stage(directory, state, 'preflight-passed')
    print('Release journal: ' + str(directory / 'state.json'), flush=True)
    handlers = install_signals(signal_failure)
    try:
        (directory / 'inputs.json').write_bytes(MANIFEST.read_bytes())
        require(digest((directory / 'inputs.json').read_bytes()) == manifest_hash, 'Manifest changed before snapshot')
        archive = directory / 'source.tar'
        with archive.open('xb') as output:
            write_context(manifest, output)
        state['source_tar_sha256'] = digest(archive.read_bytes())
        state['base_images'] = {}
        for base in ('oven/bun:1.4.2', 'nginx:alpine'):
            # Pull only these project build dependencies; never retag the old
            # release image. Explicit local bases permit recording their IDs.
            run('image', 'pull', base, timeout=600)
            base_info = docker_json('image', 'inspect', base)[0]
            state['base_images'][base] = {'id': base_info['Id'], 'repo_digests': base_info.get('RepoDigests', [])}
        image_unused(tag)
        # Existing successful host suites are reused; Dockerfile's normal build
        # assertions run once as part of the actual release image build.
        stage(directory, state, 'building-reviewed-context')
        with archive.open('rb') as source, (directory / 'build.log').open('xb') as log:
            result = subprocess.run([*DOCKER, 'build', '--pull=false', '--file', 'Dockerfile',
                '--build-arg', 'BUILD_COMMIT=' + HEAD,
                '--label', 'io.primelink.release.inputs.sha256=' + manifest_hash,
                '--label', 'io.primelink.release.source.sha256=' + SOURCE_SHA,
                '--label', 'io.primelink.release.dirty=true', '--tag', tag, '-'],
                stdin=source, stdout=log, stderr=subprocess.STDOUT, timeout=1800, check=False)
        require(result.returncode == 0, 'Release build failed; see private build.log')
        image = release_image(tag, manifest_hash)
        new_image = state['new_image_id'] = image['Id']
        # Fail if another process retagged a local base while building. Retain
        # the build log too (BuildKit records its resolved FROM digests there).
        for base in ('oven/bun:1.4.2', 'nginx:alpine'):
            base_info = docker_json('image', 'inspect', base)[0]
            require(base_info['Id'] == state['base_images'][base]['id'], 'Build base image changed')
        (directory / 'image-history.json').write_bytes(run('image', 'history', '--no-trunc', '--format', '{{json .}}', new_image))
        candidate_id = checked_id(run('container', 'create', '--name', CANDIDATE,
            '--network', 'none', '--restart', 'no', new_image).decode().strip())
        state['candidate_id'] = candidate_id
        stage(directory, state, 'candidate-created')
        candidate = inspect(candidate_id)
        defaults(candidate, image)
        runtime(candidate, 'none', 'no')
        # Compare EVERY HostConfig field, including daemon defaults and fields
        # unknown to this tool. Only these two intentional differences are allowed.
        def comparable(container):
            config = {
                k: v for k, v in container['HostConfig'].items()
                if k not in ('NetworkMode', 'RestartPolicy', 'ConsoleSize')
            }
            config['Dns'] = config.get('Dns') or []
            config['OomKillDisable'] = bool(config.get('OomKillDisable'))
            return config
        require(comparable(original) == comparable(candidate), 'Original runtime differs from default candidate; new review required')
        run('container', 'start', candidate_id)
        healthy(candidate_id)
        run('exec', candidate_id, 'nginx', '-t')
        run('exec', candidate_id, 'cmp', '/etc/nginx/primelink-static-routes.map', '/usr/share/nginx/html/static-routes.map')
        state['candidate_http'] = check_http(manifest, True, candidate_id)
        stage(directory, state, 'candidate-validated')
        state['baseline_http'] = check_http(manifest)
        state['public_policy'] = public_policy()
        # All failures above leave the original running. Recheck just before stop.
        require(verify()[1] == manifest_hash, 'Release manifest changed before cutover')
        same_daemon(state)
        live = inspect_production()
        require(live['HostConfig'] == original['HostConfig'] and live['Config'] == original['Config'], 'Original runtime changed during preparation')
        release_image(tag, manifest_hash, new_image)
        require(inspect(candidate_id)['State']['Health']['Status'] == 'healthy', 'Candidate lost health')
        for name in (ROLLBACK, FAILED):
            unused(name)
        run('container', 'stop', '--time', '15', candidate_id, timeout=40)
        state['cutover_started'] = True
        stage(directory, state, 'cutover-starting')
        run('container', 'stop', '--time', '15', OLD_ID, timeout=40)
        run('container', 'rename', OLD_ID, ROLLBACK)
        run('network', 'disconnect', NETWORK, OLD_ID)
        new_id = checked_id(run('container', 'create', '--cidfile', str(directory / 'replacement.cid'),
            '--name', CONTAINER, '--network', NETWORK, '--restart', 'unless-stopped', new_image).decode().strip())
        state['new_id'] = new_id
        stage(directory, state, 'replacement-created')
        new = inspect(new_id)
        require(new['Image'] == new_image and new['Name'] == '/' + CONTAINER, 'Replacement image/name mismatch')
        defaults(new, image)
        runtime(new, NETWORK, 'unless-stopped')
        require(new['HostConfig'].get('ContainerIDFile') == str(directory / 'replacement.cid'), 'Replacement CID file differs')
        expected_host = comparable(original)
        replacement_host = comparable(new)
        expected_host.pop('ContainerIDFile', None)
        replacement_host.pop('ContainerIDFile', None)
        require(replacement_host == expected_host,
                'Replacement runtime differs from reviewed original')
        run('container', 'start', new_id)
        healthy(new_id)
        run('exec', new_id, 'nginx', '-t')
        require(check_http(manifest, True, new_id) == state['candidate_http'], 'Replacement bytes differ from candidate')
        public = check_http(manifest, True)
        require(public == state['candidate_http'], 'Public release bytes differ from validated candidate')
        require(public_policy() == state['public_policy'], 'HTTP/www policy changed')
        retained = inspect(OLD_ID)
        require(retained['Name'] == '/' + ROLLBACK and retained['Image'] == IMAGE_ID
                and not retained['State']['Running'] and not retained['NetworkSettings']['Networks'], 'Rollback object not safely retained')
        require(docker_json('image', 'inspect', IMAGE)[0]['Id'] == IMAGE_ID, 'Original image/tag changed')
        healthy(new_id, timeout=10)
        state['public_http'] = public
        stage(directory, state, 'success-original-retained')
        print('SUCCESS: release deployed; original container/image retained. Journal: ' + str(directory / 'state.json'))
    except BaseException:
        if state['cutover_started']:
            print('Cutover failed/interrupted; restoring the original container.', file=sys.stderr, flush=True)
            try:
                recover(directory, state, manifest)
            except BaseException as rollback_error:
                print('AUTOMATIC ROLLBACK FAILED: ' + str(rollback_error) + '\nJournal: ' + str(directory / 'state.json'), file=sys.stderr)
                raise RuntimeError('Operator recovery required; original container and image have not been deleted') from None
        else:
            stage(directory, state, 'failed-before-cutover-original-untouched')
        raise
    finally:
        restore_signals(handlers)


def lock():
    path = '/tmp/primelink-hr-alpha-medical-20261017.lock'
    fd = os.open(path, os.O_CREAT | os.O_RDWR | os.O_NOFOLLOW, 0o600)
    require(os.fstat(fd).st_uid == os.getuid() and stat.S_ISREG(os.fstat(fd).st_mode), 'Unsafe release lock')
    try:
        fcntl.flock(fd, fcntl.LOCK_EX | fcntl.LOCK_NB)
    except BlockingIOError:
        os.close(fd)
        raise RuntimeError('Another release/rollback is running') from None
    return fd


def manual_rollback(directory):
    identity()
    require(directory is not None, 'rollback requires --state /tmp/primelink-hr-alpha-medical-20261017-<digest>')
    require(directory.parent == Path('/tmp') and re.fullmatch(r'primelink-hr-alpha-medical-20261017-[0-9a-f]{12}', directory.name), 'Wrong journal directory')
    require(directory.resolve() == directory and directory.is_dir() and directory.stat().st_uid == os.getuid()
            and stat.S_IMODE(directory.stat().st_mode) == 0o700, 'Unsafe journal directory')
    state = json.loads((directory / 'state.json').read_bytes())
    require(state['release'] == RELEASE and state['cutover_started'], 'No cutover to roll back')
    raw = (directory / 'inputs.json').read_bytes()
    require(digest(raw) == state['inputs_sha256'] and directory.name.endswith(state['inputs_sha256'][:12]), 'Saved manifest differs')
    manifest = json.loads(raw)
    require(manifest['base_revision'] == HEAD and digest(canonical({k: manifest['files'][k] for k in manifest['context_files']})) == SOURCE_SHA, 'Saved source differs')
    require(state['new_image'] == f'primelink/primelink-hr:release-bc298f6-{RELEASE}-{state["inputs_sha256"][:12]}', 'Wrong release image')
    recover(directory, state, manifest)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('command', choices=('verify', 'inspect-production', 'context', 'check-http', 'deploy', 'rollback'))
    parser.add_argument('--release-content', action='store_true')
    parser.add_argument('--state', type=Path, help='Saved journal directory, only for explicit rollback')
    args = parser.parse_args()
    os.umask(0o077)
    if args.command == 'rollback':
        fd = lock()
        try:
            manual_rollback(args.state)
        finally:
            os.close(fd)
        return
    require(args.state is None, '--state is only for rollback')
    manifest, manifest_hash = verify()
    if args.command == 'deploy':
        fd = lock()
        try:
            deploy(manifest, manifest_hash)
        finally:
            os.close(fd)
    elif args.command == 'context':
        write_context(manifest, sys.stdout.buffer)
    elif args.command == 'inspect-production':
        local_daemon()
        container = inspect_production()
        print(json.dumps({'container_id': container['Id'], 'image_id': container['Image'], 'healthy': True,
                          'network': NETWORK, 'restart': 'unless-stopped', 'runtime_overrides': False}, indent=2))
    elif args.command == 'check-http':
        check_http(manifest, args.release_content)
    else:
        print(f'PASS: identity, exact dirty snapshot and {len(manifest["files"])} input checks')
        print('Source fingerprint: ' + SOURCE_SHA)
        print('Release input manifest SHA-256: ' + manifest_hash)
        print(f'Proposed image: primelink/primelink-hr:release-bc298f6-{RELEASE}-{manifest_hash[:12]}')


if __name__ == '__main__':
    try:
        main()
    except (RuntimeError, OSError, ValueError, KeyError, subprocess.SubprocessError) as error:
        print(f'BLOCKED: {error}', file=sys.stderr)
        sys.exit(1)
