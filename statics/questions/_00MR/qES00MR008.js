"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR008 = function (qNumber) {
  var qId = 1000133,
      // question ID number, unique to this question
  uId = QWIZM.state.uId,
      sd = utils.toSigDigs,
      stringify = utils.stringify,
      sin = utils.sin,
      cos = utils.cos,
      asin = utils.asin,
      acos = utils.acos,
      tan = utils.tan,
      atan = utils.atan,
      sigDigs = QWIZM.quiz.sigDigs,
      seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed); //inputs

  var theta = sd(lcrng.getNext(21, 24, 0.1), sigDigs),
      phi = sd(lcrng.getNext(52, 60, 0.1), sigDigs),
      W = sd(lcrng.getNext(100, 200, 5), sigDigs) * 9.81,
      b1 = W,
      b2 = 0; //calcs

  var a11 = sin(theta),
      a12 = sin(phi),
      a21 = cos(theta),
      a22 = -cos(phi),
      D = a11 * a22 - a12 * a21,
      Dx = b1 * a22 - b2 * a12,
      Dy = a11 * b2 - a21 * b1,
      x = stringify(Dx / D, sigDigs),
      y = stringify(Dy / D, sigDigs);
  var statement = "Solve this system of equations for !$F_{AC}!$ and !$F_{BC}!$.\n        \n        $$\n        \\begin{aligned}\n            F_{BC}\\cdot\\sin\\left(".concat(phi, "^\\circ\\right) +F_{AC}\\cdot\\sin\\left(").concat(theta, "^\\circ\\right)  &= ").concat(W, " \\\\\n            F_{BC}\\cdot\\cos\\left(").concat(phi, "^\\circ\\right) - F_{BC}\\cdot\\cos\\left(").concat(theta, "^\\circ\\right) &= 0 \n        \\end{aligned}\n        $$"); //stringify
  // a2 = stringify(a, sigDigs);
  // B = stringify(B, sigDigs);

  return "<div class='statement width50'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "<p>\n    Temp: a11=").concat(a11, ", a12=").concat(a12, ", a21=").concat(a21, ", a22=").concat(a22, ", !$D!$=").concat(D, ", !$Dx=").concat(Dx, "!$, !$Dy!$=").concat(Dy, ";<p>\n    Ans: !$FBC!$ = ").concat(x, ", !$FAC!$ = ").concat(y, ".\n    \n\n    </div>");
};