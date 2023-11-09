"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES01MR001 = function (qNumber) {
  var qId = 1000003; // question ID number, unique to this question    

  var uId = QWIZM.state.uId,
      sd = QWIZM.methods.toSigDigs,
      stringify = QWIZM.methods.stringify,
      wd = QWIZM.quiz.workingDigs,
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
      debug = false; //inputs - defaults to sigDigs

  var x = stringify(lcrng.getNext(2, 4, 0.025)),
      y1 = stringify(lcrng.getNext(0.7, 0.8, 0.01) * x),
      y2 = stringify(lcrng.getNext(0.45, 0.55, 0.01) * y1); // convert to number equivalents of string inputs to avoid string concatenation
  // instead of addition!!

  x = sd(x);
  y1 = sd(y1);
  y2 = sd(y2);
  y2 = Math.round(y2 * 100) / 100; // make last (4th) digit a zero

  console.log(QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY)); //calcs

  var BF = sd(Math.sqrt(x * x + y1 * y1)),
      CE = sd(Math.sqrt(x * x + (y1 + y2) * (y1 + y2))); //stringify - defaults to sigDigs

  x = stringify(x);
  y1 = stringify(y1);
  y2 = stringify(y2);
  BF = stringify(BF);
  CE = stringify(CE);
  var statement = "Determine the lengths of truss members !$BF!$ and !$CE!$.",
      img = "../../images/01MR/01MR01.png",
      inputs = QWIZM.getInputOverlays([{
    input: x + ' m',
    left: 28,
    top: 89
  }, {
    input: x + ' m',
    left: 49,
    top: 89
  }, {
    input: x + ' m',
    left: 70,
    top: 89
  }, {
    input: y1 + ' m',
    left: 88,
    top: 60
  }, {
    input: y2 + ' m',
    left: 88,
    top: 39
  }, {
    input: y2 + ' m',
    left: 88,
    top: 24
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ BF !$",
      units: 'm',
      marks: 5,
      correctSoln: BF
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ CE !$",
      units: 'm',
      marks: 4,
      correctSoln: CE
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement width80'><h3>Q".concat(qNumber, "</h3> (").concat(thisQuiz[qNumber][0], " marks):\n        ").concat(statement, "</div>\n        <div id = '").concat(qId, "img' class='image width90'>\n            <img src= ").concat(img, ">\n            ").concat(inputs, "\n        </div>\n        <div class='parts'>").concat(QWIZM.methods.questionParts(qNumber), "</div>");
};