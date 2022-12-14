const startButton = document.getElementById("start-btn");
const nextButton = document.getElementById("next-btn");
const submitButton = document.getElementById("submit-btn");
const questionContainerElement = document.getElementById("question-container");
const questionElement = document.getElementById("question");
const answerButtonsElement = document.getElementById("answer-buttons");
const answerField = document.getElementById("answer");
const points = document.getElementById("points");

let currentQuestionIndex, pointsCounter;

startButton.addEventListener("click", startGame);
nextButton.addEventListener("click", () => {
  currentQuestionIndex++;
  setNextQuestion();
});

function startGame() {
  startButton.classList.add("hide");
  pointsCounter = 0;
  points.innerHTML = "Points = " + pointsCounter;
  currentQuestionIndex = 0;
  questionContainerElement.classList.remove("hide");
  setNextQuestion();
}

function setNextQuestion() {
  resetState();
  showQuestion(questions[currentQuestionIndex]);
}

function showQuestion(question) {
  questionElement.innerText = question.question;
  if (question.isNotMultipleChoice) {
    question.answers.forEach((answer) => {
      const button = document.createElement("button");
      button.innerText = answer.text;
      button.classList.add("btn");
      if (answer.correct) {
        button.dataset.correct = answer.correct;
      }
      button.addEventListener("click", selectAnswer);
      answerButtonsElement.appendChild(button);
    });
  } else {
    submitButton.classList.remove("hide");
    answerField.classList.remove("hide");
    submitButton.addEventListener("click", function setAnswerCorret() {
      if (question.answers.text.indexOf(answerField.value) !== -1) {
        submitButton.dataset.correct = true;
      }
      submitAnswer(submitButton);
      submitButton.removeEventListener("click", setAnswerCorret);
    });
  }
}

function resetState() {
  nextButton.classList.add("hide");
  submitButton.removeAttribute("data-correct");
  answerField.classList.add("hide");
  answerField.value = "";
  while (answerButtonsElement.firstChild) {
    answerButtonsElement.removeChild(answerButtonsElement.firstChild);
  }
}

function submitAnswer(e) {
  const selectedButton = e;
  const correct = selectedButton.dataset.correct;
  if (correct === "true") {
    pointsCounter += 1;
    points.innerHTML = "Points = " + pointsCounter;
  }
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide", "correct", "wrong");
    submitButton.classList.add("hide");
    if (correct) {
      setColor(nextButton, correct);
    } else {
      setColor(nextButton);
    }
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide", "correct", "wrong");
    submitButton.classList.add("hide");
    if (correct) {
      setColor(startButton, correct);
    } else {
      setColor(startButton);
    }
  }
}

function selectAnswer(e) {
  const selectedButton = e.target;
  const correct = selectedButton.dataset.correct;
  if (correct === "true") {
    pointsCounter += 1;
    points.innerHTML = "Points = " + pointsCounter;
  }
  Array.from(answerButtonsElement.children).forEach((button) => {
    setColor(button, button.dataset.correct);
  });
  if (questions.length > currentQuestionIndex + 1) {
    nextButton.classList.remove("hide", "correct", "wrong");
    if (correct) {
      setColor(nextButton, correct);
    } else {
      setColor(nextButton);
    }
  } else {
    startButton.innerText = "Restart";
    startButton.classList.remove("hide", "correct", "wrong");
    if (correct) {
      setColor(startButton, correct);
    } else {
      setColor(startButton);
    }
  }
}

function setColor(element, correct) {
  element.classList.remove("correct", "wrong");
  if (correct) {
    element.classList.add("correct");
  } else {
    element.classList.add("wrong");
  }
}

const questions = [
  {
    s: true,
    question: "Ist Nike oder Adidas besser?",
    answers: [
      { text: "Nike", correct: false },
      { text: "Trage keine Markenkleider", correct: true },
      { text: "Jeder was er mag", correct: true },
      { text: "Adidas", correct: false },
    ],
  },
  {
    s: true,
    question: "Wo ist die BBB?",
    answers: [
      { text: "Luzern", correct: false },
      { text: "Baden", correct: true },
      { text: "Brugg", correct: false },
      { text: "Chur", correct: false },
    ],
  },
  {
    question: "Welcher Buchstabe ist in der oberen linken Ecke der Tastatur?",
    answers: { text: ["q", "Q"] },
  },
  {
    s: true,
    question: "Welcher Grosse Fluss fliesst durch Äypten?",
    answers: [
      { text: "Nil", correct: true },
      { text: "Aare", correct: false },
      { text: "Amazonas", correct: false },
      { text: "Mississippi", correct: false },
    ],
  },
  {
    question: "Was ist die Chemische Schreibweise für Wasser?",
    answers: { text: ["h2o", "H2o", "H2O", "h2O"] },
  },
  {
    question: "Was macht Kinder froh?",
    answers: { text: ["Haribo", "haribo"] },
  },
];
