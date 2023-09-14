import sys

sys.dont_write_bytecode = True

pytest_plugins = [
    'tests.fixtures.fixture_users',
]