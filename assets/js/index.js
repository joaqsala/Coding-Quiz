var timerDisplay = document.querySelector(".show-time");
var startQuiz = document.querySelector(".begin-quiz");
var newSection = document.querySelector('.console');
var displayResult = document.querySelector(".right-wrong");
var questionCount = 0;
var answeredCorrect = 0;


var questionObj = [
  { question: "What is JavaScript?",
    choices: [
      "JavaScript is a scripting language used to make websites interactive", "JavaScript is an assembly language used to make the website interactive", "JavaScript is a compiled language used to make the website interactive", "None of the above"
    ],
    correctAnswer: "JavaScript is a scripting language used to make websites interactive"
  },

  { question: "Which of the following is correct about JavaScript?",
    choices: [
      "JavaScript is an Object-Based language",'JavaScript is Assembly-language', 'JavaScript is an Object-Oriented language', 'JavaScript is a High-level language',
    ],
    correctAnswer: "JavaScript is an Object-Based language"
  },

  { question: "Which of the following is NOT a JavaScript data type?",
  choices: [
    "Null type",'Number type', 'Undefined type', 'Array type',
  ],
  correctAnswer: "Array type"
  },

  { question: "Arrays in JavaScript are defined by which of the following statements?",
  choices: [
   "It is an ordered list of objects",'It is an ordered list of strings', 'It is an ordered list of values', 'It is an ordered list of functions',
  ],
  correctAnswer: "It is an ordered list of values"
  },

  { question: "Where is Client-side JavaScript code is embedded within HTML documents?",
  choices: [
    "A URL that uses the special javascript:code",'A URL that uses the special javascript:protocol', 'A URL that uses the special javascript:encoding', 'A URL that uses the special javascript:stack',
  ],
  correctAnswer: "A URL that uses the special javascript:protocol"
  },

  { question: "Which of the following objects is the main entry point to all client-side JavaScript features and APIs?",
  choices: [
    'Position', 'Window', 'Standard', 'Location',
  ],
  correctAnswer: "Window"
  },

  { question: "Which of the following can be used to call a JavaScript Code Snippet?",
  choices: [
   'Function/Method','Preprocessor', 'Triggering Event', 'RMI',
  ],
  correctAnswer: "Function/Method"
  },

  { question: "Which of the following scoping type does JavaScript use?",
  choices: [
    'Sequential', 'Segmental', 'Lexical', 'Literal',
  ],
  correctAnswer: "Lexical"
  },

  { question: "Why is JavaScript Engine needed?",
  choices: [
    'Both Compiling & Interpreting the JavaScript', 'Parsing the JavaScript', 'Interpreting the JavaScript', 'Compiling the JavaScript',
  ],
  correctAnswer: "Interpreting the JavaScript"
  },

  { question: "What will be the result or type of error if p is not defined in the following JavaScript code snippet : console.log(p)?",
  choices: [
    'NaN', 'Reference Error', 'Null', 'Zero',
  ],
  correctAnswer: "Reference Error"
  },

  { question: "Why are event handlers needed in JS",
  choices: [
    'Allow JavaScript code to alter the behaviour of windows', 'Adds innerHTML page to the code', 'Change the server location', 'Performs handling of exceptions and occurrences',
  ],
  correctAnswer: "Allow JavaScript code to alter the behaviour of windows"
  },
];



var timeLeft = 45;

//on click, start timer that counts down from 60 seconds
function countdown() {
  //`setInterval()` to call a function that executes every 1000 milliseconds
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      // show the remaining seconds and decrease timer
      timerDisplay.textContent = timeLeft + ' seconds';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerDisplay.textContent = timeLeft + ' second';
      timeLeft--;
    } else {
      timerDisplay.textContent = 'GAME OVER';
      // `clearInterval()` stops timer
      clearInterval(timeInterval);
      // Call a function to display the score/time and highscore
      displayScore();
    }
  }, 1000);
}

function penalty(){
  if(timeLeft >= 11){
    timeLeft = timeLeft - 10;
  }else{
    timeLeft = 0;
    clearInterval(timeInterval);
  }}

  
// remove previous content and display questions
function displayNewArea() {
  newSection.innerHTML = ''

  //create new divs, an h2, and , gives them attributes, and appends them to the .console div  
  var newQuesDiv = document.createElement('div');
  var newAnsChoiceDiv = document.createElement('div');
  var newH2 = document.createElement('h2');

  newQuesDiv.setAttribute('class', 'questions-asked');
  newAnsChoiceDiv.setAttribute('class', 'answer-choices');

  newSection.appendChild(newQuesDiv)
  newQuesDiv.appendChild(newH2);
  newSection.appendChild(newAnsChoiceDiv);


  //adds question from questionObj into newH2
  newH2.textContent = questionObj[questionCount].question;
  
  //creates 4 buttons that are appended to the newAnsChoiceDiv 
  var buttonArray = [];
  for (var i = 0; i <= 3; i++) {
    buttonArray[i] = document.createElement('button');
    buttonArray[i].setAttribute('class', 'answer-btn');
    newAnsChoiceDiv.appendChild(buttonArray[i]);
    //adds the answer choices from question Obj to button text
    buttonArray[i].textContent = questionObj[questionCount].choices[i];
   
    //adds event listener to check response
    buttonArray[i].addEventListener('click', function (event){
      if(event.target.innerHTML === questionObj[questionCount].correctAnswer){
        displayResult.textContent = "Correct!";
        answeredCorrect++;
        questionCount++;
      } else{
        displayResult.textContent = "Sorry, that is not correct!";
        questionCount++;
        penalty();
        }

    if (questionCount < questionObj.length){
      displayNewArea();
    } else {
      displayScore();
      timeLeft = 0;
      clearInterval(timeInterval);
    }
  }
);}
}

var renderScore = function(){
  newSection.innerHTML = '';
  displayResult.textContent = " ";

  //creates the divs, h3, and p for end of quiz graphics
  var newHighScoreDiv = document.createElement('div');
  var directionDiv = document.createElement('div');
  var finalH3 = document.createElement('h3');
  var scoreP = document.createElement('p');
  scoreP.setAttribute("class", "add-space")
  
  //appends divs, h3, and p to their divs  
  newSection.appendChild(newHighScoreDiv)
  newHighScoreDiv.appendChild(finalH3);
  

  finalH3.textContent = "Highscore";

  var getUser = JSON.parse(localStorage.getItem("player1"));
  scoreP.textContent = getUser.user +" has a score of "+ getUser.score + ".";
}

//clears the .console and displays the score with input for initials
function displayScore(){
  newSection.innerHTML = '';
  displayResult.textContent = " ";

  //creates the divs, h3, and p for end of quiz graphics
  var newHighScoreDiv = document.createElement('div');
  var directionDiv = document.createElement('div');
  var entryDiv = document.createElement('div');
  var finalH3 = document.createElement('h3');
  var scoreP = document.createElement('p');
  scoreP.setAttribute("class", "add-space")
  
  //appends divs, h3, and p to their divs  
  newSection.appendChild(newHighScoreDiv)
  newSection.appendChild(directionDiv)
  newSection.appendChild(entryDiv)
  newHighScoreDiv.appendChild(finalH3);
  directionDiv.appendChild(scoreP);
  
  //adds text to end of quiz graphics
  finalH3.textContent = "Time's up! Lets see how you did!"
  scoreP.textContent = "Your score is " + answeredCorrect +"."

  //creates the form to enter initials
  var initialsForm = document.createElement('form');  
  var labelForm = document.createElement('label');
  var formInput = document.createElement("input");
  formInput.setAttribute("type", "text");
  formInput.setAttribute("placeholder", "initials");
  formInput.setAttribute("maxlength", "2");

  //creates submit button in the form and appends appropriate inputs to form
  var subInitials = document.createElement("input");
  subInitials.setAttribute("type", 'submit')
  subInitials.setAttribute("value", 'submit')
  entryDiv.appendChild(initialsForm);
  initialsForm.appendChild(labelForm);
  initialsForm.appendChild(formInput);
  initialsForm.appendChild(subInitials);

  //set the text content of the label and button
  labelForm.textContent = "Add your initials."
  subInitials.innerHTML = "Submit";

  //add an event listener to the form submit 
  initialsForm.addEventListener("submit", function (event) {
    event.preventDefault();

    entryDiv.innerHTML = ""

  //  if(myInitials === null){
  //   alert("Add your initials in the box.")
  //  } else { }

      //get and save user's initials
      var myInitials = formInput.value;
      var myScore = answeredCorrect.toString();

      var player1 = {
        user: myInitials,
        score: myScore
      } 
      // var storedPlayers = localStorage.getItem("players");
      // if(storedPlayers){
      //   localStorage.setItem("players", JSON.stringify({...player1, ...storedPlayers}))
      // } else {
        localStorage.setItem("player1", JSON.stringify(player1));
      // }
      
      finalH3.textContent = "Highscore";

      var getUser = JSON.parse(localStorage.getItem("player1"));
      scoreP.textContent = getUser.user +" has a score of "+ getUser.score + ".";
      }
  )
}

var hScore = document.getElementById("high-score");
hScore.addEventListener("click", function(){
  //  newSection.setAttribute("style", "{display: none");
renderScore();
})

//TODO add link from view highscores to local storage 


//adds event listener to start button to start timer and quiz
startQuiz.addEventListener('click', function() {
  countdown();
  displayNewArea();
}
)

//when the game is over, save initials and my score

