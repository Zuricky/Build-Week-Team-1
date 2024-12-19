// TEST
const questions = [

  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn't get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: [
      "Ice Cream Sandwich",
      "Jelly Bean",
      "Marshmallow",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
]

let currentQuestionIndex = 0;
let score = 0;

const questionText = document.querySelector("#question-text");
const optionsContainer = document.querySelector("#options-container");
const questionNumDisplay = document.querySelector("#question-number");

// Mischia le risposte
const shuffle = (arr) => arr.sort(() => Math.random() - 0.5);;

// Imposta la domanda
const loadQuestion = (i) => {
  const question = questions[i];
  questionText.textContent = question.question;

  // Rimuove le opzioni precedenti
  optionsContainer.innerHTML = "";

  questionText.style.display = "block";
  optionsContainer.style.display = "block";

  // Combina le risposte e le mischia
  const answers = shuffle([question.correct_answer, ...question.incorrect_answers]);

  // Crea i bottoni
  answers.forEach((answer) => {
    const button = document.createElement("button");
    button.classList.add('answerButton')  //MODIFICA !!!!
    button.textContent = answer;
    button.onclick = () => checkAnswer(answer, question.correct_answer);
    optionsContainer.appendChild(button);
  });

  // Numero domanda
  questionNumDisplay.textContent = `QUESTION ${i + 1}/${questions.length}`;

};

// Controlla la risposta e disabilita i bottoni
const checkAnswer = (selectedAnswer, correctAnswer) => {

  Array.from(optionsContainer.children).forEach((button) => {
    button.disabled = true;
  });

  // Modifica il puteggio se corretto
  if (selectedAnswer === correctAnswer) {
    score += 1;
  }
  setTimeout(nextQuestion, 1000);

  questionText.style.display = "none";
  optionsContainer.style.display = "none";
};

// Domanda successiva
const nextQuestion = () => {
  currentQuestionIndex++;
  if (currentQuestionIndex < questions.length) {
    loadQuestion(currentQuestionIndex);
    startTimer();
  } else {
    endQuiz();
  }

};

const endQuiz = () => {

  questionText.style.display = "none";
  optionsContainer.style.display = "none";
  questionNumDisplay.style.display = "none";


  const breakLine = document.createElement('br');

  const appElement = document.getElementById('app');
  appElement.style.display = 'none';

  const correctPercentage = (score / questions.length) * 100;

  const correctPercentageText = document.querySelector("#correct-percentage");
  correctPercentageText.innerHTML = `Correct:<br> ${correctPercentage.toFixed(2)}%`;

  const correctAnswersN = document.querySelector("#correctNumber");
  correctAnswersN.textContent = `${score} /${questions.length}.`;

  const wrongPercentage = ((questions.length - score) / questions.length) * 100;

  const wrongPercentageText = document.querySelector("#wrong-percentage");
  wrongPercentageText.innerHTML = `Wrong:<br> ${wrongPercentage.toFixed(2)}%`;

  const wrongAnswers = questions.length - score;

  const wrongAnswersN = document.querySelector("#wrongNumber");
  wrongAnswersN.textContent = ` ${wrongAnswers}/${questions.length}.`;
  wrongPercentageText.appendChild(breakLine);


  let messaggio;
  if (score > questions.length / 2) {
    messaggio = "Congratulations! You passed the exam. We'll send you the certification in few minutes. Check your email.";
  } else {
    messaggio = "You didn't pass the exam. We'll send you instructions on how to retake the test.";
  }


  const resultText = document.querySelector("#result-text");
  resultText.style.display = "block";
  resultText.textContent = messaggio;


  const resultChartDiv = document.getElementById('result-chart');
  // resultChartDiv.style.visibility = "visible"; 

  // Crea il grafico
  const ctx = document.getElementById('result-chart').getContext('2d');
  const resultChart = new Chart(ctx, {
    type: 'doughnut', // Tipo di grafico (a torta)
    data: {
      labels: ['Correct', 'Wrong'], // Etichette
      datasets: [{
        label: 'Quiz Results',
        data: [correctPercentage, wrongPercentage], // Dati da visualizzare
        backgroundColor: ['#00FFFF', '#D20094'], // Colori
        borderColor: ['#00FFFF', '#D20094'],
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          callbacks: {
            label: (context) => {
              const percentage = context.raw.toFixed(2);
              return `${context.label}: ${percentage}%`;
            }
          }
        }
      }
    }
  });
  optionsContainer.innerHTML = "";
  const blueButton2 = document.getElementById("blueButton2");
  blueButton2.style.display = "inline";
  blueButton2.style.textAlign = "center"
};


const FULL_DASH_ARRAY = 283;
const WARNING_THRESHOLD = 10;
const ALERT_THRESHOLD = 5;

const COLOR_CODES = {
  info: {
    color: "green"
  },
  warning: {
    color: "orange",
    threshold: WARNING_THRESHOLD
  },
  alert: {
    color: "red",
    threshold: ALERT_THRESHOLD
  }
};

const TIME_LIMIT = 30;
let timePassed = 0;
let timeLeft = TIME_LIMIT;
let timerInterval = null;
let remainingPathColor = COLOR_CODES.info.color;

document.getElementById("app").innerHTML = `
<div class="base-timer">
<svg class="base-timer__svg" viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
  <g class="base-timer__circle">
    <circle class="base-timer__path-elapsed" cx="50" cy="50" r="45"></circle>
    <path
      id="base-timer-path-remaining"
      stroke-dasharray="283"
      class="base-timer__path-remaining ${remainingPathColor}"
      d="
        M 50, 50
        m -45, 0
        a 45,45 0 1,0 90,0
        a 45,45 0 1,0 -90,0
      "
    ></path>
  </g>
</svg>
<span id="base-timer-label" class="base-timer__label">${formatTime(
  timeLeft
)}</span>
</div>
`;

function stopTimer() {
  clearInterval(timerInterval); // Ferma il timer
}

function startTimer() {
  stopTimer(); // Ferma il timer precedente
  timePassed = 0;
  timeLeft = TIME_LIMIT;
  document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);

  document.getElementById("base-timer-path-remaining")
    .classList.remove(COLOR_CODES.warning.color, COLOR_CODES.alert.color);
  document.getElementById("base-timer-path-remaining")
    .classList.add(remainingPathColor);

  timerInterval = setInterval(() => {
    timePassed += 1;
    timeLeft = TIME_LIMIT - timePassed;
    document.getElementById("base-timer-label").innerHTML = formatTime(timeLeft);
    setCircleDasharray();
    setRemainingPathColor(timeLeft);

    if (timeLeft === 0) {
      onTimesUp();
    }
  }, 1000);
}

function onTimesUp() {
  stopTimer(); // Ferma il timer quando il tempo è scaduto
  nextQuestion(); // Passa alla domanda successiva
}

function formatTime(time) {

  let seconds = time % 60;
  if (seconds < 10) {
    seconds = `0${seconds}`;
  }

  return `${seconds}`;
}

function setRemainingPathColor(timeLeft) {
  const { alert, warning, info } = COLOR_CODES;
  if (timeLeft <= alert.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(warning.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(alert.color);
  } else if (timeLeft <= warning.threshold) {
    document
      .getElementById("base-timer-path-remaining")
      .classList.remove(info.color);
    document
      .getElementById("base-timer-path-remaining")
      .classList.add(warning.color);
  }
}

function calculateTimeFraction() {
  const rawTimeFraction = timeLeft / TIME_LIMIT;
  return rawTimeFraction - (1 / TIME_LIMIT) * (1 - rawTimeFraction);
}

function setCircleDasharray() {
  const circleDasharray = `${(
    calculateTimeFraction() * FULL_DASH_ARRAY
  ).toFixed(0)} 283`;
  document
    .getElementById("base-timer-path-remaining")
    .setAttribute("stroke-dasharray", circleDasharray);
}

loadQuestion(currentQuestionIndex);
startTimer();
