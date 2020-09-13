"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR005 = function (qNumber) {
  var qId = 1000081; // question ID number, unique to this question 
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

  var AC = sd(lcrng.getNext(5, 15, 0.5)),
      multiplier = lcrng.getNext(0.55, 0.75, 0.05),
      AD = sd(AC * multiplier); //calcs

  var CD = Math.sqrt(Math.pow(AC, 2) - Math.pow(AD, 2)),
      AB = AD * AC / CD,
      BD = Math.sqrt(Math.pow(AB, 2) - Math.pow(AD, 2)); //stringify

  AC = stringify(AC);
  AD = stringify(AD);
  CD = stringify(CD);
  AB = stringify(AB);
  BD = stringify(BD);
  var statement = "Using the Pythagorean Theorem and the theory of similar triangles, determine the lengths of  !$AB!$, !$BD!$ and !$CD!$.",
      img = "../../images/00MR/00MR05.png",
      inputs = QWIZM.getInputOverlays([{
    input: AC + ' cm',
    left: 50,
    top: 90,
    fontSize: 1.6,
    background: 'none'
  }, {
    input: AD + ' cm',
    left: 24,
    top: 57,
    fontSize: 1.6,
    background: 'none',
    rot: 53.5
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ AB !$",
      units: 'cm',
      marks: 3,
      correctSoln: AB
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ BD !$",
      units: 'cm',
      marks: 4,
      correctSoln: BD
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ CD !$",
      units: 'cm',
      marks: 3,
      correctSoln: CD
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement'><h3>Q".concat(qNumber, "</h3>(").concat(thisQuiz[qNumber][0], " marks):<p>\n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image width60'><img src= ").concat(img, ">\n    ").concat(inputs, "\n    </div>\n    <form autocomplete=\"off\"><div class='parts'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};