from flask import Flask, request
from flask_jwt import JWT, jwt_required, current_identity
from werkzeug.security import safe_str_cmp

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your-secret-key'  # Change this to a strong, secret key

# Dummy User Model for demonstration purposes (Replace with a real User model)
class User(object):
    def __init__(self, id, username, password):
        self.id = id
        self.username = username
        self.password = password

# Dummy User Data (Replace with real user data)
users = [
    User(1, 'user1', 'password1'),
    User(2, 'user2', 'password2')
]

# Function to retrieve a user by username
def authenticate(username, password):
    user = next((user for user in users if user.username == username), None)
    if user and safe_str_cmp(user.password.encode('utf-8'), password.encode('utf-8')):
        return user

# Function to retrieve a user by ID
def identity(payload):
    user_id = payload['identity']
    return next((user for user in users if user.id == user_id), None)

jwt = JWT(app, authenticate, identity)

# Protected route example
@app.route('/protected')
@jwt_required()
def protected_route():
    return jsonify(message='This is a protected route.')

if __name__ == '__main__':
    app.run(debug=True)
