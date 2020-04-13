"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR005 = function (qNumber) {
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
      ov = QWIZM.methods.overlayVariable,
      qp = QWIZM.methods.questionPart;
  var qId = 1000081,
      // question ID number, unique to this question        
  seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed);
  thisQuiz[qNumber] = []; // thisQuiz is created at valid login so may cause errors when building new questions; reset and login should handle those.

  var tQ = thisQuiz[qNumber]; //inputs

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
  BD = stringify(BD); // thisQuiz.push(questionPart)

  tQ.push(qp({
    partStatement: "!$ AB !$",
    units: 'cm',
    marks: 3,
    correctSoln: AB
  }));
  tQ.push(qp({
    partStatement: "!$ BD !$",
    units: 'cm',
    marks: 4,
    correctSoln: BD
  }));
  tQ.push(qp({
    partStatement: "!$ CD !$",
    units: 'cm',
    marks: 3,
    correctSoln: CD
  }));
  var statement = "Using the Pythagorean Theorem and the theory of similar triangles, determine the lengths of  !$AB!$, !$BD!$ and !$CD!$.",
      img = "../../images/math05.png",
      iV1 = ov({
    input: AC + ' cm',
    left: 50,
    top: 90,
    fontSize: 1.6,
    background: 'none'
  }),
      iV2 = ov({
    input: AD + ' cm',
    left: 24,
    top: 57,
    fontSize: 1.6,
    background: 'none',
    rot: 53.5
  });
  return "<div class='statement width55 taLeft'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "</div>\n    <div class='image width35'><img src= ").concat(img, ">\n    ").concat(iV1, "\n    ").concat(iV2, "\n    </div>\n    <form autocomplete=\"off\"><div class='parts width45'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};