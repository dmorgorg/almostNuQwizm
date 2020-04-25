let QWIZM = QWIZM || {};
QWIZM.quiz = {
  id: "ES00MR01",
  subject: "Engineering Statics",
  topic: "Mathematics Review",
  subtopic: "Exercise Set 01",
  sigDigs: 3,
  extraDigitForLeadingOne: true,
  workingDigs: 8,
  questions: [
    // QWIZM.question.qES00MR001,
    // QWIZM.question.qES00MR002,
    QWIZM.question.qES00MR003,
    QWIZM.question.qES00MR004,
    QWIZM.question.qES00MR005,
    QWIZM.question.qES00MR006,
    QWIZM.question.qES00MR007,
    QWIZM.question.qES00MR008
  ],
  // Instructions can be modified on a per quiz basis here. Not usually necessary.
  instructions: `<div class="statement width70 ">
      <h3>Instructions:</h3>
      <ul>
        <li>All intermediate calculations should be accurate to at least five (5) significant digits to prevent the accumulation of rounding errors. (If you prefer, you may store intermediate results in your calculator and use the full precision that your calculator allows.)</li>

        <li>Final solutions (those entered into the quiz) should be accurate to exactly three (3) significant digits (unless the leading digit is a 1, in which case you should use four (4) significant digits).</li>

        <li>After you have entered a solution into an input box, press the <strong>Enter</strong> button to check your solution. If not correct, you may attempt the question part again.

        <li>Enter only numeric values in the input box for each question. <br>E.g., If the question asks for the solution in metres, enter the numeric answer for metres without an 'm.'</li>

      <!-- <li>Unless temperature is specified, use the value of !$\\gamma = 9.81 \\mathsf{kN/m^3}!$ for the specific weight of water.</li> -->
      </ul>

      <h3>If this quiz is to be submitted for marks, read the following carefully:</h3>
      <ul>
        <li>When you have finished the assignment, print out the <strong>Summary</strong> sheet showing all your results.</li>

        <li>Attach your work to the printout and hand the assignment in to your instructor when or before it is due.</li>

        <li>Your written solutions should show professionalism: the solution should be clear, neat and show a logical progression towards the solution;<!-- the solution should include a free body diagram if the question involves statics;--> marks are not awarded for correct answers without an accompanying written solution.</li>
      </ul>
  </div>`
};