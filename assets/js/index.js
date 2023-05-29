var timerDisplay = document.querySelector(".show-time");
var startQuiz = document.querySelector(".begin-quiz");
var newSection = document.querySelector(".console");
var displayResult = document.querySelector(".right-wrong");
var scoreList = document.createElement("ol");
var restartButton = document.createElement("button");
restartButton.classList.add("restart");
restartButton.innerHTML = "New Quiz";
var clearScores = document.createElement("button");
clearScores.classList.add("clear");
clearScores.innerHTML = "Clear scores";
var hScore = document.getElementById("high-score");
var questionCount = 0;
var answeredCorrect = 0;

//stores the questions, answerchoices, and answers in an object
var questionObj = [
  {
    question: "What is JavaScript?",
    choices: [
      "JavaScript is a scripting language used to make websites interactive",
      "JavaScript is an assembly language used to make the website interactive",
      "JavaScript is a compiled language used to make the website interactive",
      "None of the above",
    ],
    correctAnswer:
      "JavaScript is a scripting language used to make websites interactive",
  },

  {
    question: "Which of the following is correct about JavaScript?",
    choices: [
      "JavaScript is an Object-Based language",
      "JavaScript is Assembly-language",
      "JavaScript is an Object-Oriented language",
      "JavaScript is a High-level language",
    ],
    correctAnswer: "JavaScript is an Object-Based language",
  },

  {
    question: "Which of the following is NOT a JavaScript data type?",
    choices: ["Null type", "Number type", "Undefined type", "Array type"],
    correctAnswer: "Array type",
  },

  {
    question:
      "Arrays in JavaScript are defined by which of the following statements?",
    choices: [
      "It is an ordered list of objects",
      "It is an ordered list of strings",
      "It is an ordered list of values",
      "It is an ordered list of functions",
    ],
    correctAnswer: "It is an ordered list of values",
  },

  {
    question:
      "Where is Client-side JavaScript code is embedded within HTML documents?",
    choices: [
      "A URL that uses the special javascript:code",
      "A URL that uses the special javascript:protocol",
      "A URL that uses the special javascript:encoding",
      "A URL that uses the special javascript:stack",
    ],
    correctAnswer: "A URL that uses the special javascript:protocol",
  },

  {
    question:
      "Which of the following objects is the main entry point to all client-side JavaScript features and APIs?",
    choices: ["Position", "Window", "Standard", "Location"],
    correctAnswer: "Window",
  },

  {
    question:
      "Which of the following can be used to call a JavaScript Code Snippet?",
    choices: ["Function/Method", "Preprocessor", "Triggering Event", "RMI"],
    correctAnswer: "Function/Method",
  },

  {
    question: "Which of the following scoping type does JavaScript use?",
    choices: ["Sequential", "Segmental", "Lexical", "Literal"],
    correctAnswer: "Lexical",
  },

  {
    question: "Why is JavaScript Engine needed?",
    choices: [
      "Both Compiling & Interpreting the JavaScript",
      "Parsing the JavaScript",
      "Interpreting the JavaScript",
      "Compiling the JavaScript",
    ],
    correctAnswer: "Interpreting the JavaScript",
  },

  {
    question:
      "What will be the result or type of error if p is not defined in the following JavaScript code snippet : console.log(p)?",
    choices: ["NaN", "Reference Error", "Null", "Zero"],
    correctAnswer: "Reference Error",
  },

  {
    question: "Why are event handlers needed in JS",
    choices: [
      "Allow JavaScript code to alter the behaviour of windows",
      "Adds innerHTML page to the code",
      "Change the server location",
      "Performs handling of exceptions and occurrences",
    ],
    correctAnswer: "Allow JavaScript code to alter the behaviour of windows",
  },
];

var timeLeft = 45;

//on click, starts timer that counts down from 45 seconds
function countdown() {
  //`setInterval()` to call a function that executes every 1000 milliseconds
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      // show the remaining seconds and decrease timer
      timerDisplay.textContent = timeLeft + " seconds";
      timeLeft--;
    } else if (timeLeft === 1) {
      timerDisplay.textContent = timeLeft + " second";
      timeLeft--;
    } else {
      timerDisplay.textContent = "GAME OVER";
      // `clearInterval()` stops timer
      clearInterval(timeInterval);
      // Call a function to display the score/time and highscore
      displayScore();
    }
  }, 1000);
}

//removes 10 seconds for every incorrect answer
function penalty() {
  if (timeLeft >= 11) {
    timeLeft = timeLeft - 10;
  } else {
    timeLeft = 0;
  }
}

// remove previous content and displays questions
function displayNewArea() {
  newSection.innerHTML = "";

  //creates new divs, an h2, gives them attributes, and appends them to the newSection/console div
  var newQuesDiv = document.createElement("div");
  var newAnsChoiceDiv = document.createElement("div");
  var newH2 = document.createElement("h2");

  newAnsChoiceDiv.setAttribute("class", "answer-choices");

  newSection.appendChild(newQuesDiv);
  newQuesDiv.appendChild(newH2);
  newSection.appendChild(newAnsChoiceDiv);

  //adds question from questionObj into newH2
  newH2.textContent = questionObj[questionCount].question;

  //creates 4 buttons that are appended to the newAnsChoiceDiv
  var buttonArray = [];
  for (var i = 0; i <= 3; i++) {
    buttonArray[i] = document.createElement("button");
    buttonArray[i].setAttribute("class", "answer-btn");
    newAnsChoiceDiv.appendChild(buttonArray[i]);
    //adds the answer choices from question Obj to button text
    buttonArray[i].textContent = questionObj[questionCount].choices[i];

    //adds event listener to check response and changes counters
    buttonArray[i].addEventListener("click", function (event) {
      if (event.target.innerHTML === questionObj[questionCount].correctAnswer) {
        displayResult.textContent = "Correct!";
        answeredCorrect++;
        questionCount++;
      } else {
        displayResult.textContent = "Sorry, that is not correct!";
        questionCount++;
        penalty();
      }
      //changes from one question to the next if questions are avaiable or displays score if none
      if (questionCount < questionObj.length) {
        displayNewArea();
      } else {
        displayScore();
        timeLeft = 0;
        clearInterval(timeInterval);
      }
    });
  }
}

//creates the divs, h3, and p for end of quiz graphics
var newHighScoreDiv = document.createElement("div");
var directionDiv = document.createElement("div");
var entryDiv = document.createElement("div");
var finalH3 = document.createElement("h3");
var scoreP = document.createElement("p");
scoreP.setAttribute("class", "add-space");

//creates the form to enter initials
var initialsForm = document.createElement("form");
var labelForm = document.createElement("label");
var formInput = document.createElement("input");
formInput.setAttribute("type", "text");
formInput.setAttribute("placeholder", "initials");
formInput.setAttribute("maxlength", "2");

//clears the .console, displays users score, asks them to input their initials
function displayScore() {
  newSection.innerHTML = "";
  displayResult.textContent = " ";

  //appends divs, h3, and p to their divs
  newSection.appendChild(newHighScoreDiv);
  newSection.appendChild(directionDiv);
  newSection.appendChild(entryDiv);
  newHighScoreDiv.appendChild(finalH3);
  directionDiv.appendChild(scoreP);

  //adds text to end of quiz graphics
  finalH3.textContent = "Time's up! Lets see how you did!";
  scoreP.textContent = "Your score is " + answeredCorrect + ".";

  //creates submit button in the form and appends appropriate inputs to form
  var subInitials = document.createElement("input");
  subInitials.setAttribute("type", "submit");
  subInitials.setAttribute("value", "submit");
  entryDiv.appendChild(initialsForm);
  initialsForm.appendChild(labelForm);
  initialsForm.appendChild(formInput);
  initialsForm.appendChild(subInitials);

  //set the text content of the label and button
  labelForm.textContent = "Add your initials.";
  subInitials.innerHTML = "Submit";
}

//adds an event listener to the form to submit
initialsForm.addEventListener("submit", function (event) {
  event.preventDefault();
  entryDiv.innerHTML = "";

  //converts initials and score to strings to save onto localStorage (probably not needed)
  var myInitials = formInput.value.toString();
  var myScore = answeredCorrect.toString();
  //display users initials and score
  finalH3.textContent = "Highscore";
  scoreP.textContent = myInitials + " has scored " + myScore + " points!";

  //retrieves localStorage by the key "player", if non-existent, will return an empty array
  var getScores = JSON.parse(localStorage.getItem("player")) || [];
  //creats object with two properties
  var player = {
    user: myInitials,
    score: myScore,
  };
  //if less than 5 scores are in localStorage, scores are pushed to getStorage array
  if (getScores.length < 5) {
    getScores.push(player);
  } else {
    //if more than 5 scores, new scores are compared to lowest. Low score gets popped out. New score is pushed into array.
    if (myScore > getScores[4].score) {
      getScores.pop();
      getScores.push(player);
    }
  }
  //sorts the array so that the objects are listed in descending order
  getScores.sort(function (a, b) {
    return b.score - a.score;
  });
  //strinfies array and sets it to localStorage
  localStorage.setItem("player", JSON.stringify(getScores));
  //adds restart button to page
  entryDiv.setAttribute("class", "center-restart");
  entryDiv.appendChild(restartButton);
});

// displays top 5 scores
var renderScore = function () {
  timerDisplay.textcontent = "TIMER";
  displayResult.innerHTML = "";
  newSection.innerHTML = "";
  scoreP.textContent = "";

  //creates and appends divs and list to newSection/console div
  var listContainer = document.createElement("div");
  listContainer.setAttribute("class", "list-container");
  newSection.appendChild(newHighScoreDiv);
  newSection.appendChild(listContainer);
  newHighScoreDiv.appendChild(finalH3);
  listContainer.appendChild(scoreList);
  //creates button div to append buttons to
  var buttonDiv = document.createElement("div");
  newSection.appendChild(buttonDiv);
  buttonDiv.setAttribute("class", "fit-buttons");
  buttonDiv.appendChild(restartButton);
  buttonDiv.appendChild(clearScores);

  finalH3.textContent = "Highscores";
  //retrieves localStorage by the key "player, if non-existent, will return an empty array
  var getScores = JSON.parse(localStorage.getItem("player")) || [];
  
  //creates list items elements, gives attributes, and appends to div
  for (var i = 0; i < getScores.length; i++) {
    listItem = document.createElement("li");
    listItem.setAttribute("class", "list-item");
    //gets info from localStorage to display in list
    listItem.textContent =
    getScores[i].user + " .............. " + getScores[i].score;
    scoreList.appendChild(listItem);
  }
};

//adds event listener to HighScore in nav
hScore.addEventListener("click", function(){
  renderScore()
});

//adds event listener to start, restart, and clear storage buttons
startQuiz.addEventListener("click", function () {
  countdown();
  displayNewArea();
});

restartButton.addEventListener("click", () => {
  location.reload();
});

clearScores.addEventListener("click", function () {
  localStorage.clear();
  location.reload();
});
