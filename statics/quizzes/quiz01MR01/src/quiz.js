let QWIZM = QWIZM || {};
QWIZM.quiz = {
  id: "ES01MR01",
  subject: "Engineering Statics",
  topic: "Module 01: Math Review",
  subtopic: "Exercise Set 01",
  sigDigs: 3,
  extraDigitForLeadingOne: true,
  workingDigs: 8,
  questions: [
      QWIZM.question.qES01MR001,
        QWIZM.question.qES01MR002,
        QWIZM.question.qES01MR003,
        QWIZM.question.qES01MR004,
        QWIZM.question.qES01MR005,
        QWIZM.question.qES01MR006,
        QWIZM.question.qES01MR007,
        QWIZM.question.qES01MR008
  ],
  // Instructions can be modified on a per quiz basis here. Not usually necessary.
  instructions: `<div class="statement">
      <h3>Instructions:</h3>
      <ul>
        <li>All intermediate calculations should be accurate to at least five (5) significant digits to prevent the accumulation of rounding errors. (If you prefer, you may store intermediate results in your calculator and use the full precision that your calculator allows.)</li>

        <li>Unless otherwise specified:
          <ul>
            <li> !$x !$-components are positive in the rightward direction, negative in the leftward direction. </li>
            <li> !$y !$-components are positive in the upward direction, negative in the downward direction. </li>
            <li> Force directions are specified in degrees, counter-clockwise from the positive !$x!$-axis. </li>
            <li> Clockwise moments are negative, counter-clockwise are positive. </li>
            <li> Frame members in tension are positive, in compression are negative. </li>
             <li> Free body diagrams (FBDs), where appropriate, must be included in the submission of your written work for full marks to be awarded. </li>
            <li> To convert mass to force, use !$g=9.81\\thinspace\\mathsf{m/s^2}!$.</li>
          </ul>
        </li>

        <li>Final answers (those entered into the quiz) should be accurate to exactly three (3) significant digits (unless the leading digit is a 1, in which case you should use four (4) significant digits). Answers between -1 and 1 should have a 0 before the decimal point. E.g., 0.1234, not .1234.</li>

        <li>After you have entered a solution into an input box, press the <strong>Enter</strong> button to check your solution. If not correct, you may attempt the question part again.

        <li>Enter only numeric values in the input box for each question according to the specified units. Units should not be entered with your answer. 
      </ul>

     <!-- <h3>If this quiz is to be submitted for marks, read the following carefully:</h3>
      <ul>
        <li>When you have finished the assignment, print out the <strong>Summary</strong> sheet showing all your results.</li>

        <li>Attach your work to the printout and hand the assignment in to your instructor when or before it is due.</li>

        <li>Your written solutions should show professionalism: the solution should be clear, neat and show a logical progression towards the solution;<!-- the solution should include a free body diagram if the question involves statics; marks are not awarded for correct answers without an accompanying written solution.</li>
      </ul> -->
  </div>`
};