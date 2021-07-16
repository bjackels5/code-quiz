// Just so I don't have to flip between this file and index.html so much...
//
// IDs of things to "listen" to
// high-scores-link
// start-quiz
// answer1, answer2, answer3, answer4 - is there a way to do this dynamically in case I want more/fewer possible answers?
// save-tally-initials
// listen for hitting enter in the initials box (tally-group, maybe, and this would cover save-tally-initials, too)
// main-page-btn
// clear-high-scores-btn
// 
// OTHER IDs I might need7
// tally-string: You had 7 seconds left and answered 12 out of 22 questions correctly.
// quiz-question
// answers-wrapper
// answers
// tally-group (class, not ID. If I need it, add it as an ID, too)
// tally-name
// tally-btn (class, not ID. If I need it, add it as an ID, too)
// high-scores-list
// high-score-item
//
// SECTION IDs
// header (not an ID - but needs to be hidden when showing the high scores)
// initial-greeting
// quiz-questions
// tally
// answer-status
// high-scores

const headerIndex = 0;
const initialGreetingIndex = 1;
const quizQuestionsIndex = 2;
const tallyIndex = 3;
const answerStatusIndex = 4;
const highScoresIndex = 5;

var sectionEls =    [   document.querySelector("header"), /* no # because it's not an ID */
                        document.querySelector("#initial-greeting"),
                        document.querySelector("#quiz-questions"),
                        document.querySelector("#tally"),
                        document.querySelector("#answer-status"),
                        document.querySelector("#high-scores")
                    ]  

var highScores = []; // name, timeLeft, correctQuestions, aQuestions
//adding some data just to test things...
/*
var highScores = [  {name: "ILM", timeLeft: "20", correctQuestions: "25", totalQuestions: "30"},
                    {name: "SJM", timeLeft: "21", correctQuestions: "26", totalQuestions: "30"},
                    {name: "BJJ", timeLeft: "22", correctQuestions: "27", totalQuestions: "30"}];
*/

const initTimeLeft = 60;

var currentQuestion = 0;
var correctTally = 0;
var timeLeft = initTimeLeft;
var qAndAs = [
    {   q: "Question one needs an answer:", 
        answers: [
            { answer: "answer #1.1 f", correct: false },
            { answer: "answer #1.2 f", correct: false },
            { answer: "answer #1.3 t", correct: true },
            { answer: "answer #1.4 f", correct: false }
        ]
    },
    {   q: "Question two needs an answer:",
        answers: [
            { answer: "answer #2.1 f", correct: false },
            { answer: "answer #2.2 t", correct: true },
            { answer: "answer #2.3 f", correct: false },
            { answer: "answer #2.4 f", correct: false }
        ]
    },
    {   q: "Question three needs an answer:",
        answers: [
            { answer: "answer #3.1 t", correct: true },
            { answer: "answer #3.2 f", correct: true },
            { answer: "answer #3.3 f", correct: false },
            { answer: "answer #3.4 f", correct: false }

        ]
    }
];

var hdrHighScoresEl = document.querySelector("#high-scores-link");
var startQuizBtnEl = document.querySelector("#start-quiz");
var quizQuestionEl = document.querySelector("#quiz-question");
var answerStatusH3El = document.querySelector("#answer-status h3");
var tallyFormEl = document.querySelector("#tally-form");

var showSections = function(sectionToShow1, sectionToShow2, sectionToShow3)
{
    for (var i = 0; i < sectionEls.length; i++)
    {
        sectionEls[i].style.display = "none";
    }
    sectionEls[sectionToShow1].style.display = "block";
    if (sectionToShow2)
    {
        sectionEls[sectionToShow2].style.display = "block";
    }
    if (sectionToShow3)
    {
        sectionEls[sectionToShow3].style.display = "block";
    }
}

var renderHighScores = function()
{
    // hide all sections - including the header - except for the high scores section
    showSections(highScoresIndex);

    // Clear out the #high-scores-list if it's not empty
    var highScoresDisplay = document.querySelector("#high-scores-list");
    while (highScoresDisplay.firstChild)
    {
        highScoresDisplay.removeChild(highScoresDisplay.firstChild);
    }

    // add each high score to #high-scores-list
    for (var i = 0; i < highScores.length; i++)
    {
        var highScore = highScores[i];
        // create the list item and format it
        var listItemEl = document.createElement("li");
        listItemEl.className = "high-score-item";
        var theString =  (i+1) + ". " + highScore.name + " - " + highScore.timeLeft;
        listItemEl.textContent = theString;

        highScoresDisplay.appendChild(listItemEl);
    }
}


var loadHighScores = function()
{
    // Clear out the high scores array
    highScores = [];

    /*
    // Clear out the #high-scores-list if it's not empty
    var highScoresDisplay = document.querySelector("#high-scores-list");
    while (highScoresDisplay.firstChild)
    {
        highScoresDisplay.removeChild(highScoresDisplay.firstChild);
    }
*/
    // Get the list of high scores from localStorage into an array
    highScores = localStorage.getItem("high-scores");
    if (highScores === null)
    {
        highScores = [];
    }
    else
    {
        highScores = JSON.parse(highScores);
        // add each item of that array to #high-scores-list
        // This function assumes that the saved high scores are in the correct order
        /*
        for (var i = 0; i < highScores.length; i++)
        {
            var highScore = highScores[i];
            // create the list item and format it
            var listItemEl = document.createElement("li");
            listItemEl.className = "high-score-item";
            var num=i+1;
            var theString =  num + ". " + highScore.name + " - " + highScore.timeLeft;
            listItemEl.textContent = theString;

            highScoresDisplay.appendChild(listItemEl);
        }*/
    }
}

var showNextQuestion = function()
{
    if (currentQuestion < qAndAs.length)
    {
        var currQandA = qAndAs[currentQuestion];
        quizQuestionEl.innerHTML = currQandA.q;
        // set the buttons
        for (var j = 0; j < currQandA.answers.length; j++)
        {
            // Sample: document.querySelector("#answer1").innerHTML = currQandA.answers[0].answer;
            document.querySelector("#answer" + (j+1)).innerHTML = (j+1) + ". " + currQandA.answers[j].answer;
        }

        return true;
    }
    else
    {
        return false;
    }
}

var answered = function(event)
{
    var theAnswer = event.currentTarget.id[6];
    
    if (qAndAs[currentQuestion].answers[theAnswer-1].correct)
    {
        // answered correctly
        answerStatusH3El.innerHTML = "Your previous answer was CORRECT!";
        correctTally++;
    }
    else
    {
        // answered incorrectly
        // TODO!!! decrease the time remaining
        answerStatusH3El.innerHTML = "Your previous answer was WRONG!";
    }
    currentQuestion++;
    if (!showNextQuestion())
    {
        // no more questions to show - go to the final tally
        // You had 7 seconds left and answered 12 out of 22 questions correctly.
        document.querySelector("#tally-string").innerHTML = "You had "
                                                            + timeLeft
                                                            + " seconds left and answered "
                                                            + correctTally
                                                            + " out of "
                                                            + qAndAs.length
                                                            + " questions correctly";

        showSections(tallyIndex, answerStatusIndex, headerIndex);
    }
}


var startQuiz = function(event) // the Start Quiz button was clicked
{
    showSections(quizQuestionsIndex, headerIndex, answerStatusIndex);

    currentQuestion = 0; // first question in the quiz
    correctTally = 0;
    timeLeft = initTimeLeft;
    // set answer-status h3 text to blank
    answerStatusH3El.innerHTML = "";

    showNextQuestion();
}

var saveHighScores = function()
{
    localStorage.setItem("high-scores", JSON.stringify(highScores));
}


var compareTally = function(a, b)
{
    // timeLeft - reverse order
    return a.timeLeft.toInt < b.timeLeft.toInt;
}

var tallyFormHandler = function(event)
{
    event.preventDefault();

    debugger;

    // get the user input
//    var initials = document.querySelector("#tally-name").value;
    var initials = document.querySelector("input[name='tally-name']").value

    // add the high score to the array
    var highScore = { name: initials, timeLeft: timeLeft, correctQuestions: correctTally, totalQuestions: qAndAs.length } ;
    highScores.push(highScore);
    var tHighScores = highScores.sort(compareTally); // this does not work as desired. Come back to this later
    highScores = tHighScores;
    saveHighScores();
    renderHighScores();
}    


var showHighScores = function(event) // the high scores link in the upper left was clicked
{
    loadHighScores();
    renderHighScores();
}

var saveHighScores = function()
{
    localStorage.setItem("high-scores", JSON.stringify(highScores));
}

var clearHighScores = function()
{
    highScores = [];
    saveHighScores();
    renderHighScores();
}

var startOver = function()
{
    showSections(headerIndex, initialGreetingIndex);
}


// Event Listeners
hdrHighScoresEl.addEventListener("click", showHighScores);
startQuizBtnEl.addEventListener("click", startQuiz);
tallyFormEl.addEventListener("submit", tallyFormHandler);
document.querySelector("#answer1").addEventListener("click", answered);
document.querySelector("#answer2").addEventListener("click", answered);
document.querySelector("#answer3").addEventListener("click", answered);
document.querySelector("#answer4").addEventListener("click", answered);
document.querySelector("#main-page-btn").addEventListener("click", startOver);
document.querySelector("#clear-high-scores-btn").addEventListener("click", clearHighScores);

/*
formEl.addEventListener("submit", taskFormHandler);
pageContentEl.addEventListener("click", taskButtonHandler);
pageContentEl.addEventListener("change", taskStatusChangeHandler);
*/














/* TIMER STUFF
var timerEl = document.getElementById('countdown');
var mainEl = document.getElementById('main');
var startBtn = document.getElementById('start');

var message =
  'Congratulations! Now you are prepared to tackle the Challenge this week! Good luck!';
var words = message.split(' ');

// Timer that counts down from 5
function countdown() {
  var timeLeft = 5;

  // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds
  var timeInterval = setInterval(function() {
    // As long as the `timeLeft` is greater than 1
    if (timeLeft > 1) {
      // Set the `textContent` of `timerEl` to show the remaining seconds
      timerEl.textContent = timeLeft + ' seconds remaining';
      // Decrement `timeLeft` by 1
      timeLeft--;
    } else if (timeLeft === 1) {
      // When `timeLeft` is equal to 1, rename to 'second' instead of 'seconds'
      timerEl.textContent = timeLeft + ' second remaining';
      timeLeft--;
    } else {
      // Once `timeLeft` gets to 0, set `timerEl` to an empty string
      timerEl.textContent = '';
      // Use `clearInterval()` to stop the timer
      clearInterval(timeInterval);
      // Call the `displayMessage()` function
      displayMessage();
    }
  }, 1000);
}

// Displays the message one word at a time
function displayMessage() {
  var wordCount = 0;

  // Uses the `setInterval()` method to call a function to be executed every 300 milliseconds
  var msgInterval = setInterval(function() {
    if (words[wordCount] === undefined) {
      clearInterval(msgInterval);
    } else {
      mainEl.textContent = words[wordCount];
      wordCount++;
    }
  }, 300);
}

startBtn.onclick = countdown;
*/







// Objects and variables needed:
//      answer: contains the text answer and whether or not the answer is correct
//
//      question: contains the question and an array for the answers
//
//      an array of questions
//
//      a variable to contain the number of correct questions 