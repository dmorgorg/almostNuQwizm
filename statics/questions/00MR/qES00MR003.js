"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR003 = function (qNumber) {
  var qId = 1000037; // question ID number, unique to this question 
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
      lcrng = new utils.LCRNG(seed); //inputs

  var topChordAngle = lcrng.getNext(30, 40, 0.5),
      multiplier = tan(topChordAngle),
      x1 = stringify(lcrng.getNext(2, 3.5, 0.1)); // convert to number equivalents of string inputs to avoid string concatenation
  // instead of addition!!

  x1 = sd(x1); //calcs

  var y = stringify(Math.round(x1 * multiplier * 5) / 5),
      x = stringify(Math.round(x1 * 2 / 3 * 5) / 5),
      phi = stringify(atan(y / (x / 2))),
      theta = 90 - stringify(atan(y / (1.5 * x)));
  var statement = "Determine angles !$\\theta!$ and !$\\phi!$.",
      img = "../../images/00MR/00MR03.png",
      iV1 = ov({
    input: x + ' m',
    left: 27,
    top: 86
  }),
      iV2 = ov({
    input: x + ' m',
    left: 51.5,
    top: 86
  }),
      iV3 = ov({
    input: x + ' m',
    left: 75.5,
    top: 86
  }),
      iV4 = ov({
    input: y + ' m',
    left: 7,
    top: 38
  });

  if (!thisQuiz[qNumber]) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ \\theta !$",
      units: '!$^\\circ!$',
      marks: 5,
      correctSoln: theta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ \\phi !$",
      units: '!$^\\circ!$',
      marks: 5,
      correctSoln: phi
    };
  }

  return "<div class='statement width40'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "    \n    </div>\n    <div class='image width60'><img src= ").concat(img, ">\n    ").concat(iV1, "\n    ").concat(iV2, "\n    ").concat(iV3, "\n    ").concat(iV4, "\n    </div>\n    <form autocomplete=\"off\"><div class='parts width40'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};