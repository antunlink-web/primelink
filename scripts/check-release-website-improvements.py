#!/usr/bin/env python3
"""Focused release preflight checks; no Docker calls or application build."""
from pathlib import Path
import runpy
import unittest
from unittest.mock import patch
import hashlib
import io
import json
import tempfile
import urllib.error


release = runpy.run_path(
    str(Path(__file__).with_name('release-website-improvements.py'))
)
runtime_user_options = release['runtime_user_options']


class RuntimeUserChecks(unittest.TestCase):
    def test_docker_defaults(self):
        for runtime in ({}, {'User': None}, {'User': ''}):
            for image in ({}, {'User': None}, {'User': ''}):
                with self.subTest(runtime=runtime, image=image):
                    self.assertEqual(runtime_user_options(runtime, image), [])

    def test_nonempty_user_preserved(self):
        for user in ('nginx', '1000:1000', '0', 'root'):
            with self.subTest(user=user):
                self.assertEqual(
                    runtime_user_options({'User': user}, {'User': user}),
                    ['--user', user],
                )

    def test_different_user_rejected(self):
        for runtime, image in (
            ({'User': '1000'}, {'User': '1001'}),
            ({'User': 'nginx'}, {}),
            ({'User': ''}, {'User': 'nginx'}),
        ):
            with self.subTest(runtime=runtime, image=image):
                with self.assertRaisesRegex(RuntimeError, 'Runtime override requires review: User'):
                    runtime_user_options(runtime, image)

    def test_other_override_guards_remain_strict(self):
        for key in ('Cmd', 'Entrypoint', 'Env', 'WorkingDir', 'Healthcheck'):
            with self.subTest(key=key):
                with self.assertRaisesRegex(RuntimeError, 'Runtime override requires review: ' + key):
                    runtime_user_options({key: ''}, {})


class PublicChecks(unittest.TestCase):
    def response(self, url, status=200, body=b'checked html'):
        response = io.BytesIO(body)
        response.status = status
        response.geturl = lambda: url
        return response

    def check_routes(self, path=None, status=200, baseline=False):
        def get(url, **kwargs):
            if path and url == 'https://primelink.hr' + path:
                raise urllib.error.HTTPError(url, status, 'mock', {}, io.BytesIO(b'error'))
            return self.response(url)
        with patch('urllib.request.urlopen', side_effect=get):
            return release['public'](baseline=baseline)

    def test_baseline_new_404_recorded(self):
        for route in release['NEW_ROUTES']:
            result = self.check_routes(route, 404, baseline=True)
            self.assertEqual(result[route], {'status': 404})
            self.assertEqual(result['/'], hashlib.sha256(b'checked html').hexdigest())

    def test_existing_baseline_404_rejected(self):
        for route in set(release['ROUTES']) - release['NEW_ROUTES']:
            with self.subTest(route=route), self.assertRaisesRegex(RuntimeError, 'HTTP 404'):
                self.check_routes(route, 404, baseline=True)

    def test_unexpected_errors_rejected(self):
        for baseline in (True, False):
            for code in (403, 429, 500, 503):
                with self.subTest(baseline=baseline, code=code), self.assertRaises(RuntimeError):
                    self.check_routes('/integracije-karticnog-placanja', code, baseline)
        with patch('urllib.request.urlopen', side_effect=urllib.error.URLError('offline')):
            with self.assertRaises(urllib.error.URLError):
                release['public'](baseline=True)

    def test_postdeployment_404_rejected_on_every_route(self):
        for route in release['ROUTES']:
            with self.subTest(route=route), self.assertRaises(RuntimeError):
                self.check_routes(route, 404)

    def test_non_200_and_redirect_rejected(self):
        for status, url in ((204, 'https://primelink.hr/'), (200, 'https://primelink.hr/other')):
            with patch('urllib.request.urlopen', return_value=self.response(url, status)):
                with self.assertRaises(RuntimeError):
                    release['public']()

    def test_strict_success_matches_expected_content(self):
        result = self.check_routes()
        expected = {route: hashlib.sha256(b'checked html').hexdigest() for route in release['ROUTES']}
        self.assertEqual(result, expected)
        expected['/'] = hashlib.sha256(b'wrong page').hexdigest()
        with self.assertRaises(RuntimeError):
            release['require'](result == expected, 'Content differs')


class CandidateChecks(unittest.TestCase):
    def test_candidate_requires_200_and_archive_bytes(self):
        expected = {route: hashlib.sha256(b'html').hexdigest() for route in release['ROUTES']}
        from subprocess import CompletedProcess, CalledProcessError
        for headers, body, passes in (
            (b'  HTTP/1.1 200 OK\n', b'html', True),
            (b'  HTTP/1.1 404 Not Found\n', b'html', False),
            (b'  HTTP/1.1 302 Found\n  HTTP/1.1 200 OK\n', b'html', False),
            (b'  HTTP/1.1 200 OK\n', b'wrong', False),
        ):
            with patch('subprocess.run', return_value=CompletedProcess([], 0, body, headers)):
                if passes:
                    release['candidate_routes']('mock-candidate', expected)
                else:
                    with self.assertRaises(RuntimeError):
                        release['candidate_routes']('mock-candidate', expected)
        with patch('subprocess.run', side_effect=CalledProcessError(1, 'wget')):
            with self.assertRaises(CalledProcessError):
                release['candidate_routes']('mock-candidate', expected)


class RetryChecks(unittest.TestCase):
    def test_readonly_failure_preserved_and_retry_allowed(self):
        with tempfile.TemporaryDirectory() as root:
            directory = Path(root) / 'host-test'
            directory.mkdir()
            state = {'status': 'preflight', 'cutover': False, 'old': 'old', 'old_image': 'image'}
            (directory / 'state.json').write_text(json.dumps(state))
            release['prepare_journal'](directory, {'Id': 'old', 'Image': 'image'})
            self.assertTrue(directory.is_dir())
            retained = list(Path(root).glob('host-test-preflight-*/journal/state.json'))
            self.assertEqual(len(retained), 1)
            self.assertEqual(json.loads(retained[0].read_text()), state)

    def test_progressed_attempt_cannot_be_overwritten(self):
        for changes in ({'cutover': True}, {'new_image': 'new'}, {'old': 'different'}):
            with tempfile.TemporaryDirectory() as root:
                directory = Path(root) / 'host-test'
                directory.mkdir()
                state = dict(status='preflight', cutover=False, old='old', old_image='image')
                state.update(changes)
                (directory / 'state.json').write_text(json.dumps(state))
                with self.assertRaises(RuntimeError):
                    release['prepare_journal'](directory, {'Id': 'old', 'Image': 'image'})
                self.assertEqual(json.loads((directory / 'state.json').read_text()), state)


if __name__ == '__main__':
    unittest.main()
