from flask import Flask, render_template
from flask_socketio import SocketIO, emit

app = Flask(__name__)
app.config['SECRET_KEY'] = 'your_secret_key'
socketio = SocketIO(app, cors_allowed_origins='*')
text = ''
@app.route('/')
def index():
    return render_template('index.html')

@socketio.on('connect')
def handle_connect():
    print('Client connected')
    emit('server_message', {'data': 'Connected to the server'})

@socketio.on('client_message')
def handle_message(data):
    print('received message: ' + data['text'])
    emit('server_message', {'data': data['text']}, broadcast=True)

if __name__ == '__main__':
    socketio.run(app)
