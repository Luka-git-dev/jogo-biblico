from flask import Flask, jsonify, request, render_template

app = Flask(__name__)

# Carregar perguntas do arquivo JSON
import json
with open('perguntas.json', 'r') as f:
    perguntas = json.load(f)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/perguntas')
def get_perguntas():
    return jsonify(perguntas)

@app.route('/verificar_resposta', methods=['POST'])
def verificar_resposta():
    data = request.json
    pergunta_id = data['pergunta_id']
    resposta = data['resposta']
    
    if perguntas[pergunta_id]['resposta'] == resposta:
        return jsonify({"resultado": "correto"})
    else:
        return jsonify({"resultado": "errado", "resposta_correta": perguntas[pergunta_id]['resposta']})

if __name__ == '__main__':
    app.run(debug=True)
