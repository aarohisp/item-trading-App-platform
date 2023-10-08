# Where you'll initialize and add all the routes for your resources.

from apis.user_resources import UserResource

def initialize_routes(api):
    api.add_resource(UserResource, '/user/<int:user_id>', '/user')