"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR007 = function (qNumber) {
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
  var qId = 1000121,
      // question ID number, unique to this question        
  seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed);
  thisQuiz[qNumber] = []; // thisQuiz is created at valid login so may cause errors when building new questions; reset and login should handle those.

  var tQ = thisQuiz[qNumber]; //inputs - don't stringify these, use 6y instead of 6.00y

  var a11 = sd(lcrng.getNext(1, 8, 1)),
      a12 = sd(lcrng.getNext(1, 8, 1)),
      b1 = sd(lcrng.getNext(1, 8, 1)),
      a21 = sd(lcrng.getNext(1, 8, 1)),
      a22 = sd(lcrng.getNext(1, 8, 1)),
      b2 = sd(lcrng.getNext(1, 8, 1)); //calcs - dont want to write 1x for x

  var a11b = a11 === 1 ? '' : a11,
      a12b = a12 === 1 ? '' : a12,
      a22b = a22 === 1 ? '' : a22,
      a21b = a21 === 1 ? '' : a21;
  a22 *= -1;
  var D = a11 * a22 - a12 * a21,
      Dx = b1 * a22 - b2 * a12,
      Dy = a11 * b2 - a21 * b1,
      x = stringify(Dx / D),
      y = stringify(Dy / D);
  var statement = "Solve this system of equations for !$x!$ and !$y!$.        \n        $$\n        \\begin{aligned}\n            ".concat(a11b, "x + ").concat(a12b, "y &= ").concat(b1, " \\\\\n            ").concat(a21b, "x - ").concat(a22b, "y &= ").concat(b2, " \n        \\end{aligned}\n        $$"); // thisQuiz.push(questionPart)

  tQ.push(qp({
    partStatement: "!$ x !$",
    units: '',
    marks: 3,
    correctSoln: x
  }));
  tQ.push(qp({
    partStatement: "!$ y !$",
    units: '',
    marks: 3,
    correctSoln: y
  }));
  return "<div class='statement width50'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "</div>\n    <form autocomplete=\"off\"><div class='parts width50'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};