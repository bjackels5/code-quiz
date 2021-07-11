// the mock-up shows some behavior with which I disagree. 
// 
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
// The "Go Back" button on the high scores screen in the mock up is ambiguous - does it "go back" to the last question?
// Or does it go back to the start of the quiz? Or does it go back to the initial greeting? I'm going to make it go back
// to the initial greeting, and I'm going to change the name of the button to something that reflects that.
//

// Objects and variables needed:
//      answer: contains the text answer and whether or not the answer is correct
//
//      question: contains the question and an array for the answers
//
//      an array of questions
//
//      a variable to contain the number of correct questions 