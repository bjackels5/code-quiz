# code-quiz

Module 4 goals:
Explain and identify the document object and its relationship to HTML

Use the window object for local and session storage

Use DOM API methods to select and dynamically generate HTML elements and content

Use DOM API methods to handle events such as key presses and mouse clicks

Set time-based events using time functions

Write event-driven functions

Research Web API documentation to implement new and unfamiliar interfaces



// the mock-up shows some behavior with which I disagree. 
// 
// ANSWER STATUS
// After the user makes a selection, the screen change to the next question and the "correct"
// or "wrong" shows up on that next screen. It looks like they're getting feedback on the question that's currently
// shown, but in reality they haven't even made a selection yet.
//
// At a minimum, I'm going to change the wording to "your previous answer was correct/wrong"
// More appropriate would be to disable responses to the current question, add the Feedback on the same screen as the
// question and add a "Next" button. But that would likely mess with the timed aspect.
//
// Another possibility would be to add the "correct/wrong" below the current question, disable the current question buttons
// (or just hide them?), add the new question/answers and scroll down to them. That wouldn't change the timer aspect,
// although if I do this I need make sure to make the header sticky so that the timer is always visible.
//
// GO BACK button
// The "Go Back" button on the high scores screen in the mock up is ambiguous - does it "go back" to the last question?
// Or does it go back to the start of the quiz? Or does it go back to the initial greeting? I'm going to make it go back
// to the initial greeting, and I'm going to change the name of the button to something that reflects that.
//
