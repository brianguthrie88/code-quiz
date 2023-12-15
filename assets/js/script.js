// here are the different parts of the html that are made into variables
var headerEl = document.querySelector("header");
var mainEl = document.querySelector("main");
var timerEl = document.querySelector(".timer-count");
var quizEl = document.querySelector(".quiz")
var endOfGame = document.querySelector(".end-of-game");
var highScoresEl = document.getElementById("highScores");
var gameSummaryEl = document.getElementById("game-summary");
var submitInitials = document.createElement("input");
var input = document.createElement("input");

//this variable holds an array of objects that have each question, answer selections and correct answers in them
var questions = [
    {
        question: "Commonly used data types DO NOT include:",
        answers: ["1. strings", "2. booleans", "3. alerts", "4. numbers"],
        correctAnswer: "3. alerts"
    },

    {
        question: "The condition in an if/else statement is enclosed within ______.",
        answers: ["1. quotes", "2. curly brackets", "3. parenthesis", "4. square brackets"],
        correctAnswer: "3. parenthesis"
    },

    {
        question: "Arrays in JavaScript can be used to store ______.",
        answers: ["1. numbers and strings", "2. other arrays", "3. booleans", "4. all of the above"],
        correctAnswer: "4. all of the above"
    },

    {
        question: "String values must be enclosed within ______ when being assigned to variables.",
        answers: ["1. commas", "2. curly brackets", "3. quotes", "4. parenthesis"],
        correctAnswer: "3. quotes"
    },

    {
        question: "A very useful tool used during development and debugging for printing content to the debugger is:",
        answers: ["1. JavaScript", "2. terminal/bash", "3. for loops", "4. console.log"],
        correctAnswer: "4. console.log"
    }
];

// these variables help with the timer functionality and the questions displaying on the screen
var timerCount = 75;
var timer;
var questionIndex = 0;

//these are elements that are created at the beginning of the app that show the summary of the game with textContent and then are appended to the hard coded html
var highScoresH3El = document.createElement("h3");
var summaryH1El = document.createElement("h1");
var summaryAEl = document.createElement("a");
var startButtonEl = document.createElement("button");
highScoresH3El.textContent = "View Highscores";
summaryH1El.textContent = "Coding Quiz challenge";
summaryAEl.textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by 15 seconds!";
startButtonEl.textContent = "Start Quiz";

highScoresEl.appendChild(highScoresH3El);
gameSummaryEl.appendChild(summaryH1El);
gameSummaryEl.appendChild(summaryAEl);
gameSummaryEl.appendChild(startButtonEl);



//this function is when the game is started, certain elements go away and the timer starts, also the questions start to display on the screen
function startGame() {
  // Prevents start button from being clicked when round is in progress
  startButtonEl.disabled = true;
  summaryH1El.remove();
  summaryAEl.remove();
  startButtonEl.remove();
  startTimer()
  renderQuestion(questionIndex)
}


//this funtion is how the timer works when the timer starts, the timer goes down every second and if the timer is 0 or less then 0 or the questions are complete then the game is over
function startTimer() {
  // Sets timer
  timer = setInterval(function() {
    timerCount--;
    timerEl.textContent = timerCount;
    if (timerCount <= 0 || questionIndex === questions.length ) {
      gameOver();
      quizEl.remove();
    }
    
  }, 1000);
}

//this function renders the questions to the page by iterating through the questions with the questionIndex parameter that starts as 0, this also will create the answers and append those to the page
function renderQuestion(questionIndex) {
  quizEl.textContent = "";
  var showQuestion = document.createElement("h2");
  var showAnswers = document.createElement("ul");
  for (var i = 0; i < questions.length; i++) {
    if(i < questions.length) {
      showQuestion.textContent = questions[questionIndex].question;
      quizEl.appendChild(showQuestion);
      var answersEl = questions[questionIndex].answers;
    } else {
     return;
    }
    // showQuestion.textContent = questions[questionIndex].question;
    // quizEl.appendChild(showQuestion);
    // var answersEl = questions[questionIndex].answers;
  }
  answersEl.forEach(function (newItem) {
    var listItem = document.createElement("li");
    listItem.textContent = newItem;
    listItem.addEventListener("click", verifyAnswer);
    quizEl.appendChild(showAnswers);
    showAnswers.appendChild(listItem);
  })
}


//this function will verify if the answer that the user chooses is correct then the question will go to the next one
function verifyAnswer(e) {
  var element = e.target.textContent;
  var theAnswer = questions[questionIndex].correctAnswer;
  if(element === theAnswer && questionIndex < questions.length){
    provideFeedback(element === theAnswer);
    questionIndex++;
    setTimeout(() => renderQuestion(questionIndex), 1000);
  } else {
    provideFeedback(false);
    return;
  }
  
}

//this fuction provides feedback for the user by either showing them that their answer was wrong or correct with text that is displayed on the screen
function provideFeedback(correct) {
  var correctOrIncorrect = document.createElement("p");
  if(correct) {
    correctOrIncorrect.textContent = "correct";
    
  } else {
    correctOrIncorrect.textContent = "incorrect";
    timerCount -= 15;
  }
  setTimeout(() => correctOrIncorrect.textContent = "", 1000);
  quizEl.appendChild(correctOrIncorrect);
}

//this is a function that is what happens when the game is over, the timer is cleared and there are elements created showing what your score is and for you to put your initials in
function gameOver() {
  quizEl.textContent = "";
  clearInterval(timer);
  var endGameH2 = document.createElement("h2");
  var endGameA = document.createElement("a");
  var form = document.createElement("form");
  var formP = document.createElement("p");
  var label = document.createElement("label");

  endGameH2.textContent = "All Done!";
  endGameA.textContent = "Your final score is "+timerCount;
  formP.textContent = "Enter your initials";

  label.setAttribute("for", "initials");
  input.setAttribute("type", "text");
  input.setAttribute("id", "initials");
  input.setAttribute("name", "initials");
  submitInitials.setAttribute("id", "submit")
  submitInitials.setAttribute("type", "submit");
  submitInitials.setAttribute("value", "submit");

  endOfGame.appendChild(endGameH2);
  endOfGame.appendChild(endGameA);
  endOfGame.appendChild(form);
  form.appendChild(formP);
  form.appendChild(label);
  form.appendChild(input);
  form.appendChild(submitInitials);
}

//what do I want my data to look like in local storage? 
//Object? initial and score keys. 
// example: {initial: "BG", score: 15};
//create an empty array to hold any saved scores that already exist from local storage. 
var savedScores = JSON.parse(localStorage.getItem('initials'))|| [];
console.log("saved Scores",savedScores);
submitInitials.addEventListener("click", function(event) {
  event.preventDefault();

  var initials = input.value; 
  var score = timerCount;

  var scoreObj = {
    uInitials: initials,
    uScore: score
  };

  savedScores.push(scoreObj);
  //stringify your scores
  //save that to local storage. 
  

  if (initials === "") {
    displayMessage("error", "initials cannot be blank");

  } else {
    localStorage.setItem("initials", JSON.stringify(savedScores));
    window.location.href = "highScores.html";
  }
});

//this button will take you to he high score page
highScoresH3El.addEventListener("click", function() {
  window.location.href = "highScores.html";
});

//this button will start the quiz
startButtonEl.addEventListener("click", startGame);







/*
GIVEN I am taking a code quiz
WHEN I click the start button
- create a start button that has functionality of starting the timer and going to the first question of the quiz
THEN a timer starts and I am presented with a question
WHEN I answer a question
THEN I am presented with another question
WHEN I answer a question incorrectly
THEN time is subtracted from the clock
WHEN all questions are answered or the timer reaches 0
THEN the game is over
WHEN the game is over
THEN I can save my initials and my score
*/