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
            "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
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
];

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

    // Combina le risposte e le mischia
    const answers = shuffle([question.correct_answer, ...question.incorrect_answers]);

    // Crea i bottoni
    answers.forEach((answer) => {
        const button = document.createElement("button");
        button.textContent = answer;
        button.onclick = () => checkAnswer(answer, question.correct_answer);
        optionsContainer.appendChild(button);
    });

    // Numero domanda
    questionNumDisplay.textContent = `QUESTION ${i + 1}/${questions.length}`;
};

// Controlla la risposta e disabilita i bottoni
const checkAnswer = (selectedAnswer, correctAnswer) => {
    // Disable all buttons
    Array.from(optionsContainer.children).forEach((button) => {
        button.disabled = true;
    });

    // Modifica il puteggio se corretto
    if (selectedAnswer === correctAnswer) {
        score += 1;
    }
    setTimeout(nextQuestion, 1000);
};

// Domanda successiva
const nextQuestion = () => {
    currentQuestionIndex++;
    if (currentQuestionIndex < questions.length) {
        loadQuestion(currentQuestionIndex);
        //timeLeft = ?;
    } else {
        endQuiz();
    }
};

const endQuiz = () => {
    questionText.textContent = `Quiz completato! Il tuo punteggio: ${score}/${questions.length}`;
    optionsContainer.innerHTML = "";
    questionNumDisplay.textContent = "";
};

loadQuestion(currentQuestionIndex);