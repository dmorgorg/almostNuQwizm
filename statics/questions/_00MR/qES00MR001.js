"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR001 = function (qNumber) {
  var qId = 1000003,
      // question ID number, unique to this question
  uId = QWIZM.state.uId,
      sd = utils.toSigDigs,
      stringify = utils.stringify,
      sigDigs = QWIZM.quiz.sigDigs,
      seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed); //inputs

  var x = sd(lcrng.getNext(2, 4, 0.025), sigDigs),
      y1 = sd(lcrng.getNext(0.7, 0.8, 0.01) * x, sigDigs),
      y2 = sd(lcrng.getNext(0.45, 0.55, 0.01) * y1, sigDigs);
  y2 = Math.round(y2 * 100) / 100; // make last (4th) digit a zero
  //calcs

  var BF = sd(Math.sqrt(x * x + y1 * y1), sigDigs),
      CE = sd(Math.sqrt(x * x + (y1 + y2) * (y1 + y2)), sigDigs); //stringify

  x = stringify(x, sigDigs);
  y1 = stringify(y1, sigDigs);
  y2 = stringify(y2, sigDigs);
  BF = stringify(BF, sigDigs);
  CE = stringify(CE, sigDigs);
  var statement = "Determine the lengths of truss members !$BF!$ and !$CE!$. <br>\n    Temp: !$x!$ = ".concat(x, " cm, !$y1!$ = ").concat(y1, " cm, !$y2!$ = ").concat(y2, " cm <br>");
  var img = "../../images/math01.png";
  return "<div class='statement width50'><h3>Q".concat(qNumber, "</h3>: \n    ").concat(statement, "\n    Ans: !$BF!$ = ").concat(BF, ", !$CE!$ = ").concat(CE, "\n    </div>\n    <div class='image width60'>\n    <img src= ").concat(img, ">\n    </div>\n    ");
};