// Carregar perguntas do arquivo JSON
let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");

// Função para carregar perguntas do arquivo JSON
async function carregarPerguntas() {
  const response = await fetch('perguntas.json');
  perguntas = await response.json();
  mostrarPergunta();
}

// Função para exibir a pergunta atual
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

// Função para verificar a resposta
function verificarResposta(resposta) {
  const pergunta = perguntas[perguntaAtual];
  if (resposta === pergunta.resposta) {
    pontuacao++;
    alert("Correto!");
  } else {
    alert(`Errado! A resposta correta é: ${pergunta.resposta}`);
  }
  scoreElement.textContent = `Pontuação: ${pontuacao}`;
  nextButton.disabled = false;
}

// Função para passar para a próxima pergunta
function proximaPergunta() {
  perguntaAtual++;
  if (perguntaAtual < perguntas.length) {
    mostrarPergunta();
    nextButton.disabled = true;
    // Reabilitar os botões de opção
    const buttons = optionsElement.querySelectorAll("button");
    buttons.forEach(button => button.disabled = false);
  } else {
    // Exibir mensagem final
    const endMessage = document.getElementById("end-message");
    const endText = document.getElementById("end-text");
    endText.textContent = `Parabéns! Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
    endMessage.style.display = "block";
  }
}

// Reiniciar o jogo
const restartButton = document.getElementById("restart-button");
restartButton.addEventListener("click", () => {
  const endMessage = document.getElementById("end-message");
  endMessage.style.display = "none";
  perguntaAtual = 0;
  pontuacao = 0;
  mostrarPergunta();
  scoreElement.textContent = `Pontuação: ${pontuacao}`;
});
