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

// section element indexes
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
const wrongAnswerPenalty = 10;

var currentQuestion = 0;
var correctTally = 0;
var timeLeft = initTimeLeft;
var timeInterval;
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
            { answer: "answer #3.2 f", correct: false },
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

var renderTimeLeft = function()
{
    document.querySelector("#time-left").textContent = "Time: " + timeLeft;
}

var showSections = function(sectionToShow1, sectionToShow2, sectionToShow3)
{
    for (var i = 0; i < sectionEls.length; i++)
    {
        sectionEls[i].style.display = "none";
    }
    sectionEls[sectionToShow1].style.display = "block";
    if (sectionToShow2 != null)
    {
        sectionEls[sectionToShow2].style.display = "block";
    }
    if (sectionToShow3 != null)
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

    // Get the list of high scores from localStorage into an array
    highScores = localStorage.getItem("high-scores");
    if (highScores === null)
    {
        highScores = [];
    }
    else
    {
        highScores = JSON.parse(highScores);
    }
}

var showNextQuestion = function()
{
    if (currentQuestion < qAndAs.length)
    {
        var currQandA = qAndAs[currentQuestion];
        quizQuestionEl.textContent = currQandA.q;
        // set the buttons
        for (var j = 0; j < currQandA.answers.length; j++)
        {
            // Sample: document.querySelector("#answer1").textContent = currQandA.answers[0].answer;
            document.querySelector("#answer" + (j+1)).textContent = (j+1) + ". " + currQandA.answers[j].answer;
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
        answerStatusH3El.textContent = "Your previous answer was CORRECT!";
        correctTally++;
    }
    else
    {
        // answered incorrectly
        timeLeft -= wrongAnswerPenalty;
        renderTimeLeft();
        answerStatusH3El.textContent = "Your previous answer was WRONG!";
    }
    currentQuestion++;
    if (!showNextQuestion())
    {
        // no more questions to show - go to the final tally
        // You had 7 seconds left and answered 12 out of 22 questions correctly.
        clearInterval(timeInterval);
        document.querySelector("#tally-string").textContent = "You had "
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
    renderTimeLeft();
    // set answer-status h3 text to blank
    answerStatusH3El.textContent = "";

    showNextQuestion();
    countdown();
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

    // get the user input
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
    timeLeft = initTimeLeft;
    renderTimeLeft();

    document.querySelector("#initial-greeting-msg").textContent = "Try to answer the following code-related questions within the time limit. Keep in mind that incorrect answers will penalize your score/time by " + wrongAnswerPenalty + " seconds!";
    showSections(headerIndex, initialGreetingIndex);
}

function countdown()
{
    // Use the `setInterval()` method to call a function to be executed every 1000 milliseconds (1 second)
    timeInterval = setInterval(function()
    {
        // As long as the `timeLeft` is greater than 1
        if (timeLeft > 0)
        {
            renderTimeLeft();
            timeLeft--;
        }
        else
        {
            //stop the quiz - need more than just this alert, but let's make sure the logic to get here is
            // working before proceeding
            clearInterval(timeInterval);
            window.alert("You've run out of time!");
            // Use `clearInterval()` to stop the timer
        }
    }, 1000);
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

startOver();