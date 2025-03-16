let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

async function carregarPerguntas() {
  const response = await fetch('/perguntas');
  perguntas = await response.json();
  mostrarPergunta();
}

function mostrarPergunta() {
  const pergunta = perguntas[perguntaAtual];
  questionElement.textContent = pergunta.pergunta;
  optionsElement.innerHTML = "";
  pergunta.opcoes.forEach(opcao => {
    const button = document.createElement("button");
    button.textContent = opcao;
    button.addEventListener("click", () => verificarResposta(opcao));
    optionsElement.appendChild(button);
  });
}

async function verificarResposta(resposta) {
  const response = await fetch('/verificar_resposta', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      pergunta_id: perguntaAtual,
      resposta: resposta
    }),
  });
  const resultado = await response.json();

  if (resultado.resultado === "correto") {
    pontuacao++;
    alert("Correto!");
  } else {
    alert(`Errado! A resposta correta é: ${resultado.resposta_correta}`);
  }
  scoreElement.textContent = `Pontuação: ${pontuacao}`;
  nextButton.disabled = false;
}

function proximaPergunta() {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
    nextButton.disabled = true;
  } else {
    alert(`Fim do jogo! Sua pontuação final é: ${pontuacao}`);
    perguntaAtual = 0;
    pontuacao = 0;
    mostrarPergunta();
  }
}

nextButton.addEventListener("click", proximaPergunta);
carregarPerguntas();
