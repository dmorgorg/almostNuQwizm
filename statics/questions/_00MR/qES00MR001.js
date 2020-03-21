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
      ov = QWIZM.methods.overlayVariable,
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
  var statement = "Determine the lengths of truss members !$BF!$ and !$CE!$.",
      //  <br\>
  // Temp: !$x!$ = ${x} m, !$y1!$ = ${y1} m, !$y2!$ = ${y2} m <br\>`;
  img = "../../images/math01.png",
      iV1 = ov({
    input: x + ' m',
    left: 22.75,
    top: 85.75 // background: 'orange'

  }),
      iV2 = ov({
    input: x + ' m',
    left: 44.25,
    top: 86 // background: 'violet'

  }),
      iV3 = ov({
    input: x + ' m',
    left: 65.25,
    top: 86 // background: 'yellow'

  }),
      iV4 = ov({
    input: y1 + ' m',
    left: 84,
    top: 58.5 // background: 'pink'

  }),
      iV5 = ov({
    input: y2 + ' m',
    left: 83.25,
    top: 36.5 // background: 'yellow'

  }),
      iV6 = ov({
    input: y2 + ' m',
    left: 83.25,
    top: 21.25
  });
  return "<div class='statement width50'><h3>Q".concat(qNumber, "</h3>: \n    ").concat(statement, "\n    <!--Ans: !$BF!$ = ").concat(BF, ", !$CE!$ = ").concat(CE, " -->\n    </div>\n    <div id = '").concat(qId, "img' class='image width60'>\n    <img src= ").concat(img, ">\n    ").concat(iV1, "\n    ").concat(iV2, "\n    ").concat(iV3, "\n    ").concat(iV4, "\n    ").concat(iV5, "\n    ").concat(iV6, "\n    </div>\n    ");
};