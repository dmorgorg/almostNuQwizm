"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR008 = function (qNumber) {
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
      ov = QWIZM.methods.overlayVariable,
      qp = QWIZM.methods.questionPart;
  var qId = 1000133,
      // question ID number, unique to this question        
  seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed);
  thisQuiz[qNumber] = []; // thisQuiz is created at valid login so may cause errors when building new questions; reset and login should handle those.

  var tQ = thisQuiz[qNumber]; //inputs

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
  var statement = "Solve this system of equations for !$F_{AC}!$ and !$F_{BC}!$.        \n        $$\n        \\begin{aligned}\n            F_{BC}\\cdot\\sin\\left(".concat(phi, "^\\circ\\right) +F_{AC}\\cdot\\sin\\left(").concat(theta, "^\\circ\\right)  &= ").concat(W, " \\\\\n            F_{BC}\\cdot\\cos\\left(").concat(phi, "^\\circ\\right) - F_{BC}\\cdot\\cos\\left(").concat(theta, "^\\circ\\right) &= 0 \n        \\end{aligned}\n        $$"); // thisQuiz.push(questionPart)

  tQ.push(qp({
    partStatement: "!$ x !$",
    units: '',
    marks: 5,
    correctSoln: x
  }));
  tQ.push(qp({
    partStatement: "!$ y !$",
    units: '',
    marks: 4,
    correctSoln: y
  }));
  return "<div class='statement width50'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "</div>\n    <form autocomplete=\"off\"><div class='parts width45'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};