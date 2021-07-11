// the mock-up shows some behavior with which I disagree. After the user makes a selection,
// the screen change to the next question and the "correct" or "wrong" shows up on that
// next screen. It looks like they're getting feedback on the question that's currently
// shown, but in reality they haven't even made a selection yet.
//
// At a minimum, I'm going to change the wording to "your previous answer was correct/wrong"
// More appropriate would be to disable responses to the current question, add the Feedback on the same screen as the
// question and add a "Next" button. But that would likely mess with the timed aspect.