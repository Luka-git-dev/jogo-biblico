// Carregar perguntas do arquivo JSON
let perguntas = [];
let perguntaAtual = 0;
let pontuacao = 0;

const questionElement = document.getElementById("question");
const optionsElement = document.getElementById("options");
const nextButton = document.getElementById("next-button");
const scoreElement = document.getElementById("score");
const dialog = document.getElementById("dialog");
const dialogMessage = document.getElementById("dialog-message");
const dialogButton = document.getElementById("dialog-button");
const endMessage = document.getElementById("end-message");
const endText = document.getElementById("end-text");
const restartButton = document.getElementById("restart-button");

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
  // Atualizar barra de progresso
  const progress = document.getElementById("progress");
  progress.style.width = `${((perguntaAtual + 1) / perguntas.length) * 100}%`;
}

// Função para verificar a resposta
function verificarResposta(resposta) {
  const pergunta = perguntas[perguntaAtual];
  if (resposta === pergunta.resposta) {
    pontuacao++;
    dialogMessage.textContent = "Correto!";
  } else {
    dialogMessage.textContent = `Errado! A resposta correta é: ${pergunta.resposta}`;
  }
  // Mostrar a caixa de diálogo
  dialog.style.display = "block";
  // Desabilitar os botões de opção
  const buttons = optionsElement.querySelectorAll("button");
  buttons.forEach(button => button.disabled = true);
}

// Fechar a caixa de diálogo e avançar para a próxima pergunta
dialogButton.addEventListener("click", () => {
  dialog.style.display = "none";
  proximaPergunta();
});

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
    endText.textContent = `Parabéns! Você acertou ${pontuacao} de ${perguntas.length} perguntas.`;
    endMessage.style.display = "block";
  }
}

// Reiniciar o jogo
restartButton.addEventListener("click", () => {
  endMessage.style.display = "none";
  perguntaAtual = 0;
  pontuacao = 0;
  mostrarPergunta();
  scoreElement.textContent = `Pontuação: ${pontuacao}`;
});

// Iniciar o jogo
carregarPerguntas();
