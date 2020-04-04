"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR007 = function (qNumber) {
  var qId = 1000121,
      // question ID number, unique to this question
  uId = QWIZM.state.uId,
      sd = QWIZM.methods.toSigDigs,
      stringify = QWIZM.methods.stringify,
      sin = utils.sin,
      cos = utils.cos,
      asin = utils.asin,
      acos = utils.acos,
      tan = utils.tan,
      atan = utils.atan,
      sigDigs = QWIZM.quiz.sigDigs,
      workingDigs = QWIZM.quiz.workingDigs,
      seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed); //inputs - don't stringify these, use 6y instead of 6.00y

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
  var statement = "Solve this system of equations for !$x!$ and !$y!$.        \n        $$\n        \\begin{aligned}\n            ".concat(a11b, "x + ").concat(a12b, "y &= ").concat(b1, " \\\\\n            ").concat(a21b, "x - ").concat(a22b, "y &= ").concat(b2, " \n        \\end{aligned}\n        $$");
  return "<div class='statement width50'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "<p>\n    Temp: a11=").concat(a11, ", a12=").concat(a12, ", a21=").concat(a21, ", a22=").concat(a22, ", !$D!$=").concat(D, ", !$Dx=").concat(Dx, "!$, !$Dy!$=").concat(Dy, ";<p>\n    Ans: !$x!$ = ").concat(x, ", !$y!$ = ").concat(y, ".\n    </div>");
};