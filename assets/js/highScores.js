//making specific elements of the html page variables
var highScorePageEl = document.querySelector(".high-score-page");
var goBackEl = document.getElementById("go-back");
var clearHighScoresEl = document.getElementById("clear-highscores");

// created savedScores to get the values of the initials and scores
var savedScores = JSON.parse(localStorage.getItem('initials')) || [];
//created these elements to make the initials and score show on the page
var initialsEl = document.createElement("h4");
var scoreEl = document.createElement("h4");


//this iterates through the array of scores and initials to append the values to the page
for (var i = 0; i < savedScores.length; i++) {
    console.log(savedScores[i].uInitials, savedScores[i].uScore);
    initialsEl.textContent = [i+1] + ". " + savedScores[i].uInitials;
    scoreEl.textContent = "- " + savedScores[i].uScore;
    highScorePageEl.appendChild(initialsEl);
    highScorePageEl.appendChild(scoreEl);
}


//this button makes the page go back to the main page where the quiz takes place
goBackEl.addEventListener("click", function() {
    window.location.href = "index.html";
});


//this button clears the high scores on the page and in the local storage
clearHighScoresEl.addEventListener("click", function() {
    savedScores = "";
    localStorage.setItem("initials", JSON.stringify(savedScores));
    initialsEl.textContent = "";
    scoreEl.textContent = "";
});