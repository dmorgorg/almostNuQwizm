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
      BC = AB * AD / AC; //stringify

  AC = stringify(AC);
  AD = stringify(AD);
  CD = stringify(CD);
  AB = stringify(AB);
  BC = stringify(BC); // thisQuiz.push(questionPart)

  tQ.push(qp({
    partStatement: "!$ AB !$",
    units: '',
    marks: 3,
    correctSoln: AB
  }));
  tQ.push(qp({
    partStatement: "length: !$ BD !$",
    units: '',
    marks: 4,
    correctSoln: AD
  }));
  tQ.push(qp({
    partStatement: "length: !$ CD !$",
    units: '',
    marks: 3,
    correctSoln: CD
  }));
  var statement = "Using the Pythagorean Theorem and the theory of similar triangles, determine the lengths of  !$AB!$, !$BD!$ and !$CD!$.\n    <!-- Inputs: AC = ".concat(AC, " cm, AD = ").concat(AD, " cm<p> -->"),
      img = "../../images/math05.png",
      iV1 = ov({
    input: AC,
    left: 50,
    top: 90,
    fontSize: 1.6,
    background: 'none'
  }),
      iV2 = ov({
    input: AD,
    left: 24,
    top: 57,
    fontSize: 1.6,
    background: 'none',
    rot: 53.5
  });
  return "<div class='statement width45 taleft'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "\n    <!-- Ans: <i>CD</i> = ").concat(CD, " cm, <i>AB</i> = ").concat(AB, " cm, <i>BC</i> = ").concat(BC, " cm; -->\n    </div>\n    <div class='image width35'><img src= ").concat(img, ">\n    ").concat(iV1, "\n    ").concat(iV2, "\n    </div>");
};