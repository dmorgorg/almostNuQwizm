"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES01MR004 = function (qNumber) {
  var qId = 1000039; // question ID number, unique to this question 
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
      debug = false; //inputs

  var ABinit = sd(lcrng.getNext(400, 600, 5)),
      BCmult = sd(lcrng.getNext(1.35, 1.65, 0.025)),
      CDmult = sd(lcrng.getNext(1.6, 1.9, 0.025)),
      DEmult = sd(lcrng.getNext(0.775, 0.975, 0.025)),
      BFmult = sd(lcrng.getNext(1.35, 1.65, 0.025)),
      AB = Math.round(ABinit / 5) * 5,
      BC = Math.round(AB * BCmult / 5) * 5,
      CD = Math.round(AB * CDmult / 5) * 5,
      DE = Math.round(AB * DEmult / 5) * 5,
      BF = Math.round(AB * BFmult / 5) * 5,
      strain = lcrng.getNext(1.5, 2.0, 0.05),
      deltaDE1 = DE * strain / 1000,
      dA = stringify(deltaDE1 * (+AB + BC) / CD); //calcs

  var deltaBF = dA * BC / (+AB + BC),
      deltaDE = -dA * CD / (+AB + BC); //stringify

  dA = stringify(dA);
  deltaBF = stringify(deltaBF);
  deltaDE = stringify(deltaDE);
  var statement = "!$ABCD!$ is a rigid plate, able to rotate about a pinned connection at !$C!$. !$ABCD!$ is held in position by linkages !$BF!$ and !$DE!$. When force !$P!$ is applied at !$A!$, !$A!$ moves rightwards a distance of ".concat(dA, " mm as plate !$ABCD!$ rotates about !$C!$. !$BF!$ increases in length (deforms) but can be assumed to remain horizontal. !$DE!$ decreases in length (its deformation is negative) but remains vertical. <p>\n        Determine the deformation !$\\delta_{BF}!$ in !$BF!$ and the deformation !$\\delta_{DE}!$ in !$DE!$."),
      img = "../../images/01MR/01MR04.png",
      inputs = QWIZM.getInputOverlays([{
    input: AB + ' mm',
    left: 34,
    top: 19
  }, {
    input: BC + ' mm',
    left: 34,
    top: 48
  }, {
    input: CD + ' mm',
    left: 67,
    top: 80.25
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = ''; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = {
      partStatement: "!$ \\delta_{BF} !$",
      units: 'mm',
      marks: 5,
      correctSoln: deltaBF
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ \\delta_{DE} !$",
      units: 'mm',
      marks: 5,
      correctSoln: deltaDE
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement'><h3>Q".concat(qNumber, "</h3>(").concat(thisQuiz[qNumber][0], " marks):<p>\n     ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image width70'><img src= ").concat(img, ">\n    ").concat(inputs, "\n    </div>\n    <div class='parts'>").concat(QWIZM.methods.questionParts(qNumber), "</div>");
};