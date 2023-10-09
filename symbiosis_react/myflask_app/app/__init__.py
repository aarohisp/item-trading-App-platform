from flask import Flask
from flask_restful import Api
import logging
from apis.routes import initialize_routes

from middleware.request_middleware import before_request, after_request

def create_app():
    app = Flask(__name__)
    api = Api(app)

    # Middleware
    app.before_request(before_request)
    app.after_request(after_request)

    # Logging configuration
    logging.basicConfig(filename='../logs/app.log', level=logging.DEBUG)

    # Initialize API routes
    initialize_routes(api)

    return app
