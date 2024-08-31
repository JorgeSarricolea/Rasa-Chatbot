from flask import Flask, request, jsonify, send_from_directory, render_template
import requests
import logging, os
from flask_cors import CORS

app = Flask(__name__, template_folder="./templates")
CORS(app)
    #  , resources={r"/*": {"origins": "http://127.0.0.1:5000"}})  # Configuración de CORS

# Configuración de logs
logging.basicConfig(level=logging.DEBUG)

# URL del servidor de acciones de Rasa
RASA_URL = "http://localhost:5005/webhooks/rest/webhook"
# RASA_URL = os.getenv('RASA_URL', 'http://localhost:5005/webhooks/rest/webhook')

# @app.route('/static/<path:path>')
# def send_static(path):
#     return send_from_directory('../Chatbot_Javier/models', path)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/get_bot_response', methods=['POST'])
def get_response():
    # Obtener el mensaje del cuerpo de la solicitud
    data = request.get_json()
    message = data['message']

    # Enviar el mensaje al servidor Rasa
    print("before sending message to rasa", message)
    response = send_message_to_rasa(message)

    # Devolver la respuesta del servidor Rasa
    return jsonify(response)

def send_message_to_rasa(message):
    try:
        response = requests.post(RASA_URL, json={"message": message})
        if response.status_code == 200:
            return response.json()
        else:
            return [{'text': 'Error processing request'}]
    except Exception as e:
        print("Error:", e)
        return [{'text': 'Error processing request'}]

@app.route('/restart_conversation', methods=['POST'])
def restart_conversation():
    # Enviar una solicitud POST al servidor de Rasa para reiniciar la conversación
    try:
        response = requests.post(RASA_URL, json={"message": "/restart"})
        if response.status_code == 200:
            return jsonify({"response": "Conversation restarted successfully"})
        else:
            return jsonify({"response": "Failed to restart conversation"})
    except Exception as e:
        print("Error:", e)
        return jsonify({"response": "Error restarting conversation"})

if __name__ == '__main__':
    app.run(debug=True)