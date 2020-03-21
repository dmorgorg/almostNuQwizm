"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR003 = function (qNumber) {
  var qId = 1000037,
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
      ov = QWIZM.methods.overlayVariable,
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
  var statement = "Determine angles !$\\theta!$ and !$\\phi!$.",
      //  <br\>
  // Temp: topChordAngle = ${topChord}!$^\\circ!$, mult = ${multiplier}, !$x_{AB} = ${x}!$ m, !$y!$&nbsp;=&nbsp;${y} m<br\>
  //    `,
  img = "../../images/math03.png",
      iV1 = ov({
    input: x + ' m',
    left: 21.75,
    top: 82.25
  }),
      iV2 = ov({
    input: x + ' m',
    left: 46.75,
    top: 82.25
  }),
      iV3 = ov({
    input: x + ' m',
    left: 70.75,
    top: 82.25
  }),
      iV4 = ov({
    input: y + ' m',
    left: 2,
    top: 33.5
  });
  return "<div class='statement width40'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "<br>\n    <!--  Ans: <i>&theta;</i> = ").concat(theta, "&deg;, <i>&phi;</i> = ").concat(phi, "&deg; -->\n    </div>\n    <div class='image width60'><img src= ").concat(img, ">\n    ").concat(iV1, "\n    ").concat(iV2, "\n    ").concat(iV3, "\n    ").concat(iV4, "\n    </div>");
};