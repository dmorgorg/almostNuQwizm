"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES01MR008 = function (qNumber) {
  var qId = 1000133; // question ID number, unique to this question  
  // common for import?

  var uId = QWIZM.state.uId,
      sd = QWIZM.methods.toSigDigs,
      stringify = QWIZM.methods.stringify,
      sin = utils.sin,
      cos = utils.cos,
      asin = utils.asin,
      acos = utils.acos,
      tan = utils.tan,
      atan = utils.atan,
      thisQuiz = QWIZM.state.thisQuiz,
      thisQuestion,
      ov = QWIZM.methods.overlayVariable,
      arrayCount = 0,
      seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed),
      partMarks = 0,
      debug = false; //inputs

  var theta = lcrng.getNext(21, 24, 0.1),
      phi = lcrng.getNext(52, 60, 0.1),
      W = stringify(lcrng.getNext(100, 200, 5) * 9.81),
      b1 = W,
      b2 = 0; //calcs

  var a11 = sin(theta),
      a12 = sin(phi),
      a21 = cos(theta),
      a22 = -cos(phi),
      D = a11 * a22 - a12 * a21,
      Dx = b1 * a22 - b2 * a12,
      Dy = a11 * b2 - a21 * b1,
      x = stringify(Dx / D),
      y = stringify(Dy / D);
  var statement = "Solve this system of equations for !$F_{AC}!$ and !$F_{BC}!$. <br/><br/>       \n        $$\n        \\begin{aligned}\n            F_{BC}\\cdot\\sin\\left(".concat(phi, "^\\circ\\right) +F_{AC}\\cdot\\sin\\left(").concat(theta, "^\\circ\\right)  &= ").concat(W, " \\\\\n            F_{BC}\\cdot\\cos\\left(").concat(phi, "^\\circ\\right) - F_{AC}\\cdot\\cos\\left(").concat(theta, "^\\circ\\right) &= 0 \n        \\end{aligned}\n        $$");

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ F_{BC} !$",
      units: '',
      marks: 5,
      correctSoln: x
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ F_{AC} !$",
      units: '',
      marks: 4,
      correctSoln: y
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement width60'><h3>Q".concat(qNumber, "</h3>(").concat(thisQuiz[qNumber][0], " marks):<p>\n    ").concat(statement, "</div><br/>\n    <div class='parts width90'>").concat(QWIZM.methods.questionParts(qNumber), "</div>");
};