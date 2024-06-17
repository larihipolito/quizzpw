let score = 0;
let currentQuestionIndex = 0;
let currentCategory = '';

const telaInicio = document.getElementById('start-screen');
const telaCategorias = document.getElementById('category-screen');
const telaQuestoes = document.getElementById('question-screen');
const questionContainer = document.getElementById('question-container');
const placarDisplay = document.getElementById('score');
const nextButton = document.getElementById('next-button');
const telaFinal = document.getElementById('final-screen');
const placarfinalDisplay = document.getElementById('final-score');
const playAgainButton = document.getElementById('play-again-button');

document.getElementById('start-button').addEventListener('click', () => {
  telaInicio.style.display = 'none';
  telaCategorias.style.display = 'flex';
});

document.querySelectorAll('.category-button').forEach(button => {
  button.addEventListener('click', () => {
    currentCategory = button.getAttribute('data-category');
    currentQuestionIndex = 0;
    showQuestions(currentCategory);
  });
});

nextButton.addEventListener('click', () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions[currentCategory].length) {
    showQuestions(currentCategory);
  } else {
    showFinalScore();
  }
});

function showQuestions(category) {
  telaCategorias.style.display = 'none';
  telaQuestoes.style.display = 'flex';
  questionContainer.innerHTML = '';

  const q = questions[category][currentQuestionIndex];

  const questionElement = document.createElement('div');
  questionElement.classList.add('question');

  const optionsHtml = q.options.map((option, i) => `
    <button class="option-button" onclick="checkAnswer('${category}', ${currentQuestionIndex}, '${option}')">${option}</button>
  `).join('');

  questionElement.innerHTML = `
    <p>${q.question}</p>
    ${optionsHtml}
  `;
  questionContainer.appendChild(questionElement);

  nextButton.style.display = 'none';
}

window.checkAnswer = function (category, index, selectedOption) {
  const correctAnswer = questions[category][index].answer;
  const options = questionContainer.querySelectorAll('.option-button');

  options.forEach((option) => {
    option.disabled = true; 
    if (option.textContent === correctAnswer) {
      option.classList.add('correct');
    } else if (option.textContent === selectedOption) {
      option.classList.add('incorrect');
    }
  });

  if (selectedOption === questions[category][index].answer) {
    score += 10;
  } else {
    score -= 5;
  }
  placarDisplay.textContent = `Placar: ${score}`;

  nextButton.style.display = 'block';
}

function showFinalScore() {
  telaQuestoes.style.display = 'none';
  telaFinal.style.display = 'flex';
  placarfinalDisplay.textContent = `Placar final: ${score}`;
  playAgainButton.addEventListener('click', () => {
    telaFinal.style.display = 'none';
    telaInicio.style.display = 'flex';
    score = 0;
    placarDisplay.textContent = 'Placar: 0';
    currentQuestionIndex = 0;
  });
}
  
const questions = {
    "HARRY POTTER": [
        { question: "Quantos filmes tem a saga Harry Potter?", options: ["5", "10", "7", "8"], answer: "8" },
        { question: "Qual é o feitiço usado para desarmar um oponente?", options: ["Avada Kedrava", "Expelliarmus", "Lumos", "Accio"], answer: "Expelliarmus" },
        { question: "Quem é o diretor de Hogwarts durante a maior parte da saga?", options: ["Albus Dumbledore", "Severus Snape", "Minerva McGonagall", "Dolores Umbridge"], answer: "Albus Dumbledore" },
        { question: "Qual dos seguintes itens NÃO é uma horcrux?", options: ["O diadema de Rowena Ravenclaw", "A varinha de sabugueiro", "O diário de Tom Riddle", "O medalhão de Salazar Slytherin"], answer: "A varinha de sabugueiro" },
        { question: "Qual é o verdadeiro nome de Voldemort?", options: ["Tom Marvolo Riddle", "Severus Snape", "Lucius Malfoy", "Sirius Black"], answer: "Tom Marvolo Riddle" }
      ],
    "MARVEL": [
        { question: "Qual é o nome da inteligência artificial criada por Tony Stark que controla sua armadura?", options: ["J.A.R.V.I.S", "F.R.I.D.A.Y.", "Ultron", "Vision"], answer: "J.A.R.V.I.S" },
        { question: "Qual é a última frase de Tony Stark em Vingadores: Ultimato?", options: ["Avengers, assemble!", "I love you 3000.", "I am Iron Man.", "We won, Mr. Stark."], answer: "I am Iron Man." },
        { question: "Em 'Capitão América: Guerra Civil', qual é o nome do acordo que regulamenta a atividade dos super-heróis?", options: ["Tratado de Versalhes", "Acordo de Sokovia", "Acordo de Genebra", "Tratado de Wakanda"], answer: "Acordo de Sokovia" },
        { question: "Na batalha em Nova Iorque em 'Os Vingadores' (2012), Tony Stark diz a famosa frase 'Nós temos o Hulk' para Loki. Posteriormente, em 'Vingadores: Guerra Infinita' (2018), qual personagem repete essa frase para Thanos, quando tenta surpreendê-lo?", options: ["Thor", "Steve Rogers", "Loki", "Tony Stark"], answer: "Loki" },
        { question: "Qual é a última cena pós-créditos de 'Os Vingadores' (2012)?", options: ["Thanos sorrindo para a câmera", "Nick Fury recrutando um novo membro", "Thor voltando para Asgard", "Os Vingadores comendo shawarma"], answer: "Os Vingadores comendo shawarma" }
    ],
    "DISNEY": [
        { question: "Qual o nome da atriz que interpretou a bela em 'A bela e a fera live action'?", options: ["Florença Stuart", "Emma Watson", "Emma Stone", "Nadine April"], answer: "Emma Watson" },
        { question: "Qual o primeiro filme produzido pela Disney?", options: ["A pequena sereia", "Branca de Neve e os 7 anões", "Peter Pan", "A bela adormecida"], answer: "Branca de Neve e os 7 anões" },
        { question: "Quais são os nomes dos sete anões do filme Branca de neve e os sete anões?", options: ["Zangado, Dengoso, Atchim, Dunga, Soneca , Alegre e Mestre", "Fofo, Alegre, Dunga, Dengoso, Esperto, Soneca e Zangado", "Saúde, Carente, Dunga, Alegre, Sábio, Soneca e Zangado", "Atchim, Dengoso, Dunga, Feliz, Mestre, Soneca e Zangado"], answer: "Atchim, Dengoso, Dunga, Feliz, Mestre, Soneca e Zangado" },
        { question: "Em 1929, Mickey falou suas primeiras palavras. Quais foram elas?", options: ["Misca-musca", "A Minnie vai adorar isso", "Cachorro Quente", "Minnie, minha amiga"], answer: "Cachorro Quente" },
        { question: "Quem é a única princesa da Disney que não é realmente da realeza?", options: ["Mulan", "Esmeralda", "Bela", "Moana"], answer: "Mulan" }
    ],
    "VELOZES E FURIOSOS": [
        { question: "Em qual filme da franquia 'Velozes e Furiosos' Brian O'Conner, interpretado por Paul Walker, faz sua primeira aparição?", options: ["Velozes e Furiosos 2", "Velozes e Furiosos: Desafio em Tóquio", "Velozes e Furiosos", "Velozes e Furiosos 6"], answer: "Velozes e Furiosos" },
        { question: "Qual ator interpreta o personagem Dominic Toretto na série de filmes 'Velozes e Furiosos'?", options: ["Vin Diesel", "Dwayne Johnson", "Jason Statham", "Tyrese Gibson"], answer: "Vin Diesel" },
        { question: "Em qual filme da franquia 'Velozes e Furiosos' é introduzido o personagem Luke Hobbs, interpretado por Dwayne Johnson?", options: ["Velozes e Furiosos 5: Operação Rio", "Velozes e Furiosos 6", "Velozes e Furiosos 7", "Velozes e Furiosos: Desafio em Tóquio"], answer: "Velozes e Furiosos 5: Operação Rio" },
        { question: "Qual é o título do quarto filme da série 'Velozes e Furiosos' que marca o retorno de Vin Diesel à franquia?", options: ["Velozes e Furiosos: Desafio em Tóquio", "Velozes e Furiosos: Operação Rio", "Velozes e Furiosos 4", "Velozes e Furiosos: Hobbs & Shaw"], answer: "Velozes e Furiosos 4" },
        { question: "Em qual filme da franquia 'Velozes e Furiosos' é revelado que Letty, personagem de Michelle Rodriguez, está viva?", options: ["Velozes e Furiosos 6", "Velozes e Furiosos 7", "Velozes e Furiosos 8", "Velozes e Furiosos: Hobbs & Shaw"], answer: "Velozes e Furiosos 7" }
    ],
    "FILMES NACIONAIS": [
        { question: "Complete: Chicó- Fui logo dizendo I love you e ela se derreteu todinha. João Grilo- I love you? Chicó- É, quer dizer...", options: ["eu te amo em inglês.", "morena em francês.", "eu te amo em francês.", "morena em inglês."], answer: "morena em francês." },
        { question: "No filme Tropa de Elite, o personagem principal 'Nascimento' chefiava a Equipe Alfa do BOPE. Qual o significado da sigla 'BOPE'?", options: ["Batalhão de Operações Policiais Especiais", "Batalhão de Operações Perigosas Especiais", "Batalhão de Operações Primordiais Especiais", "Batalhão de Operações Perplexas Especiais"], answer: "Batalhão de Operações Policiais Especiais" },
        { question: "No filme 'Hoje Eu Quero Voltar Sozinho', o personagem principal, Leonardo, se apaixona por:", options: ["Giovana", "Maria", "Leonardo", "Gabriel"], answer: "Gabriel" },
        { question: "Onde se passa o filme 'Cidade de Deus'?", options: ["Bahia", "São Paulo", "Rio de Janeiro", "Espírito Santo"], answer: "Rio de Janeiro" },
        { question: "Em qual das alternativas tem o nome de uma das trilhas sonoras de Tropa de Elite?", options: ["Libertários não morrem", "Jorge da Capadócia", "Que tiro foi esse", "Rap das armas"], answer: "Rap das armas" }
    ],
    "BARBIE": [
        { question: "Em 'Barbie: Life in the Dreamhouse', há uma personagem reconhecida pelo seu estilo esportivo. Quem é ela?", options: ["Nikki", "Teresa", "Chelsea", "Summer"], answer: "Summer" },
        { question: "Qual o nome da tia que a Barbie vai visitar em Paris em 'Moda e Magia'?", options: ["Jaqueline", "Milicent", "Liliana", "Raquelle"], answer: "Milicent" },
        { question: "No filme Barbie em A Princesa e a Plebeia, as duas trocam de papel. Em que outro filme da barbie o mesmo acontece?", options: ["Barbie e o castelo de diamante", "Barbie e a princesa da ilha", "Barbie a princesa e a popstar", "Barbie vida de sereia"], answer: "Barbie a princesa e a popstar" },
        { question: "Em Barbie As 12 bailarinas, elas descobrem um portal através de um antigo ritual, como elas acham o portal?", options: ["Dançando sobre as pedras do quarto", "Pelo pátio do castelo", "Dançando no jardim", "Tocando nas pedras do quarto"], answer: "Dançando sobre as pedras do quarto" },
        { question: "Em qual filme a Barbie tem a companhia de um dragão roxo?", options: ["Fairytopia", "Portal Secreto", "Rapunzel", "Segredo das Fadas"], answer: "Rapunzel" }
    ]
  };
  