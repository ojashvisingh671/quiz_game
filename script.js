let questions = [];
let currentQuestion = 0;
let score = 0;
let timeLeft = 30;
let timer;

// Fetch questions from the JSON file
fetch('questions.json')
  .then(response => response.json())
  .then(data => {
    questions = data;
    showQuestion();
    startTimer();
  })
  .catch(error => console.error('Error loading questions:', error));

function showQuestion() {
  const questionContainer = document.getElementById('question-container');
  if (questions.length > 0) {
    questionContainer.innerHTML = `<p>${questions[currentQuestion].question}</p>
                                   <input type="text" id="answer" placeholder="Your answer">`;
  }
}

function nextQuestion() {
  clearInterval(timer);
  checkAnswer();
  currentQuestion++;
  if (currentQuestion < questions.length) {
    timeLeft = 30;
    startTimer();
    showQuestion();
  } else {
    endQuiz();
  }
}

function checkAnswer() {
  const answer = document.getElementById('answer').value;
  if (answer.trim().toLowerCase() === questions[currentQuestion].answer.toLowerCase()) {
    score++;
  }
}

function startTimer() {
  timer = setInterval(() => {
    timeLeft--;
    document.getElementById('time').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timer);
      nextQuestion();
    }
  }, 1000);
}

function endQuiz() {
  localStorage.setItem('quizScore', `You scored ${score}/${questions.length}`);
  window.location.href = 'result.html';
}
