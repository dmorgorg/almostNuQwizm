"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF16a = function (qNumber) {
  var qId = 1000291; // question ID number, unique to this question    

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

  var ABx = lcrng.getNext(2, 4, 0.1),
      mult = lcrng.getNext(0.6, 0.7, 0.01),
      AMy = Math.round(ABx * mult * 200) / 200,
      mult2 = lcrng.getNext(0.95, 1.05, 0.01),
      BMx = Math.round(AMy * mult2 * 20) / 20,
      CDy = Math.round((ABx / 2 + BMx / 2) * 20) / 20,
      P1 = lcrng.getNext(3, 4.5, 0.1),
      P2 = lcrng.getNext(2.5, 3.5, 0.05),
      P3 = lcrng.getNext(2, 3.5, 0.1); //calcs

  var BCy = sd(2 * AMy - CDy),
      ABy = AMy * 2,
      AM = sd(Math.pow(Math.pow(ABx, 2) + Math.pow(ABy, 2), 0.5)) / 2,
      det = utils.twoByTwoSolver(BCy, 3 * BMx, ABy, -ABx, -2 * BMx * P2 - BMx * P3, -P1 * AM),
      Bx = sd(det[0]),
      By = sd(det[1]),
      RB = sd(Math.pow(Math.pow(Bx, 2) + Math.pow(By, 2), 0.5)),
      ABtheta = sd(atan(2 * AMy / ABx)),
      Ax = sd(-Bx - P1 * sin(ABtheta)),
      Ay = sd(-By + P1 * cos(ABtheta)),
      RA = sd(Math.pow(Math.pow(Ax, 2) + Math.pow(Ay, 2), 0.5)),
      Cx = -Bx,
      Cy = P2 + P3 + By,
      RC = sd(Math.pow(Math.pow(Cx, 2) + Math.pow(Cy, 2), 0.5)),
      RD = RC,
      MD = Cx * CDy; //stringify - defaults to sigDigs

  ABx = stringify(ABx);
  AMy = stringify(AMy);
  BMx = stringify(BMx);
  P1 = stringify(P1);
  P2 = stringify(P2);
  P3 = stringify(P3);
  RB = stringify(RB);
  RA = stringify(RA);
  RC = stringify(RC);
  RD = stringify(RD);
  MD = stringify(MD);
  CDy = stringify(CDy);
  var statement = "!$A, B!$ and !$C!$ are pinned connections. !$D!$ is a fixed connection. Determine the magnitude of the reactions at each connection. What is the reacting moment, !$M_D!$, at !$D!$?",
      img = "../../images/09CF/09CF16a.png";

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_B !$",
      units: 'kN',
      marks: 6,
      correctSoln: RB
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_A !$",
      units: 'kN',
      marks: 2,
      correctSoln: RA
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_C !$",
      units: 'kN',
      marks: 2,
      correctSoln: RC
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_D !$",
      units: 'kN',
      marks: 2,
      correctSoln: RD
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ M_D !$",
      units: 'kN!$\\cdot!$m',
      marks: 2,
      correctSoln: MD
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  var inputs = QWIZM.getInputOverlays([{
    input: ABx + ' m',
    left: 28,
    top: 13.5
  }, {
    input: AMy + ' m',
    left: 9,
    top: 64
  }, {
    input: AMy + ' m',
    left: 9,
    top: 37
  }, {
    input: BMx + ' m',
    left: 44.5,
    top: 13.5
  }, {
    input: BMx + ' m',
    left: 58.125,
    top: 13.5
  }, {
    input: BMx + ' m',
    left: 71.5,
    top: 13.5
  }, {
    input: CDy + ' m',
    left: 89,
    top: 60
  }, {
    input: P1 + ' kN',
    left: 37,
    top: 65
  }, {
    input: P2 + ' kN',
    left: 51,
    top: 53
  }, {
    input: P3 + ' kN',
    left: 65,
    top: 59
  }]);
  return "<div class='statement width65'><h3>Q".concat(qNumber, "</h3>(").concat(thisQuiz[qNumber][0], " marks):\n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image width75'>\n        <img src= ").concat(img, ">\n       ").concat(inputs, "          \n    </div>\n    <form autocomplete=\"off\"><div class='parts paddingLeft5 width55'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};