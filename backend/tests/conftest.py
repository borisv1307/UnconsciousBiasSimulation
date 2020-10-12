# import pytest
# import os,sys,inspect
# currentdir = os.path.dirname(os.path.abspath(inspect.getfile(inspect.currentframe())))
# parentdir = os.path.dirname(currentdir)
# sys.path.insert(0,parentdir)
# from project import create_app
#
#
# @pytest.fixture(scope='module')
# def test_client():
#     flask_app = create_app()
#     flask_app.config['TESTING'] = True
#
#     # Create a test client using the Flask application configured for testing
#     with flask_app.test_client() as testing_client:
#         yield testing_client
        # Establish an application context
        # with flask_app.app_context():
              # this is where the testing happens!
