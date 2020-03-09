"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR003 = function (qNumber) {
  var qId = 1000037,
      // question ID number, unique to this question
  uId = QWIZM.state.uId,
      sd = utils.toSigDigs,
      sin = utils.sin,
      cos = utils.cos,
      asin = utils.asin,
      acos = utils.acos,
      tan = utils.tan,
      atan = utils.atan,
      stringify = utils.stringify,
      sigDigs = QWIZM.quiz.sigDigs,
      seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed); //inputs

  var topChord = sd(lcrng.getNext(30, 40, 0.5), sigDigs),
      multiplier = tan(topChord),
      x1 = sd(lcrng.getNext(2, 3.5, 0.1), sigDigs); //calcs

  var y = Math.round(sd(x1 * multiplier, sigDigs) * 5) / 5,
      x = Math.round(sd(x1 * 2 / 3, sigDigs) * 5) / 5,
      phi = sd(atan(y / (x / 2)), sigDigs),
      theta = 90 - sd(atan(y / (1.5 * x)), sigDigs); //stringify

  x = stringify(x, sigDigs);
  y = stringify(y, sigDigs);
  phi = stringify(phi, sigDigs);
  theta = stringify(theta, sigDigs);
  var statement = "Determine angles !$\\theta!$ and !$\\phi!$. <br>\n    Temp: topChordAngle = ".concat(topChord, "!$^\\circ!$, mult = ").concat(multiplier, ", !$x_{AB} = ").concat(x, "!$ m, !$y!$&nbsp;=&nbsp;").concat(y, " m<br>\n   ");
  var img = "../../images/math03.png";
  return "<div class='statement width40'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "<br>\n    Ans: <i>&theta;</i> = ").concat(theta, "&deg;, <i>&phi;</i> = ").concat(phi, "&deg;\n    </div>\n    <div class='image width60'><img src= ").concat(img, "></div>");
};