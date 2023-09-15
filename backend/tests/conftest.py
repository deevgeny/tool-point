import sys

sys.dont_write_bytecode = True

pytest_plugins = [
    'tests.fixtures.fixture_users',
    'tests.fixtures.fixture_api_clients'
]