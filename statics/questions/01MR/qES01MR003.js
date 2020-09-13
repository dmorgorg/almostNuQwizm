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
      lcrng = new utils.LCRNG(seed),
      partMarks = 0,
      debug = true; //inputs

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
      inputs = QWIZM.getInputOverlays([{
    input: x + ' m',
    left: 27,
    top: 86
  }, {
    input: x + ' m',
    left: 51.5,
    top: 86
  }, {
    input: x + ' m',
    left: 75.5,
    top: 86
  }, {
    input: y + ' m',
    left: 7,
    top: 38
  }]);

  if (!thisQuiz[qNumber] || debug) {
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

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement width60'><h3>Q".concat(qNumber, "</h3>(").concat(thisQuiz[qNumber][0], " marks):\n     ").concat(statement, "    \n    </div>\n    <div id = '").concat(qId, "img' class='image'><img src= ").concat(img, ">\n     ").concat(inputs, "\n    </div>\n    <form autocomplete=\"off\"><div class='parts'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};