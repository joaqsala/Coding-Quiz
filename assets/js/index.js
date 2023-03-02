var timerDisplay = document.querySelector(".show-time");

//add event listener to timer to start timer and quiz
document.querySelector(".begin-quiz").addEventListener('click', countdown);

function countdown(){
    //timer that counts down from 60 seconds
    var timeLeft = 60;
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
            // display Game Over
            timerDisplay.textContent = 'GAME OVER';
            // Use `clearInterval()` to stop the timer
            clearInterval(timeInterval);
            // Call the `displayMessage()` function
            displayMessage();
          }
        }, 1000);
      }

    //   WRITE DISPLAY MessageChannel function


// present the first question and start a timer

//create an iteration to choose questions about JS

//incorrect responses subtract time from the timer

//when all questions are answered or time reaches 0 the game is over

//when the game is over, save initials and my score
