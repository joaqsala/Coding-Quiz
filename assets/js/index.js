var timerDisplay = document.querySelector(".show-time");
var startQuiz = document.querySelector(".begin-quiz");
var newSection = document.querySelector('.console');
var displayResult = document.querySelector(".rightWrong");
var questionCount = 0;


var questionObj = [
  {
    question: "What is JavaScript?",
    choices: [
      "JavaScript is a scripting language used to make websites interactive", "JavaScript is an assembly language used to make the website interactive", "JavaScript is a compliled language used to make the website interactive", "None of the above"
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
];



var timeLeft = 60;

//on click, start timer that counts down from 60 seconds
function countdown() {
  //`setInterval()` to call a function that executes every 1000 milliseconds
  var timeInterval = setInterval(function () {
    if (timeLeft > 1) {
      // show the remaining seconds and decrease timer
      timerDisplay.textContent = timeLeft + ' seconds';
      timeLeft--;
    } else if (timeLeft === 1) {
      timerDisplay.textContent = timeLeft + ' seconds';
      timeLeft--;
    } else {
      timerDisplay.textContent = 'GAME OVER';
      // `clearInterval()` stops timer
      clearInterval(timeInterval);
      // TODO Call a function to display the score/time and highscore
      // displayScore();
    }
  }, 1000);
}

function penalty(){
  if(timeLeft >= 11){
    timeLeft = timeLeft - 10;
  }else{
    timeLeft = 1;
  }}

// TODO - remove previous content and display questions
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
        questionCount++;
      } else{
        displayResult.textContent = "Sorry, that is not correct!";
        questionCount++;
        penalty();
        
        }
          
      }
    );

}
}


//adds event listener to start button to start timer and quiz
startQuiz.addEventListener('click', function() {
  countdown();
  displayNewArea();
}
)

//when all questions are answered or time reaches 0 the game is over

//when the game is over, save initials and my score

