"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF12a = function (qNumber) {
  var qId = 1000253; // question ID number, unique to this question    

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
      debug = false; //inputs - dFGaults to sigDigs

  var FG = lcrng.getNext(600, 900, 10),
      mult = lcrng.getNext(1.9, 2.1, 0.05),
      EF = Math.round(FG * mult / 10) * 10,
      mult2 = lcrng.getNext(.9, 1.1, 0.05),
      CCE = Math.round(FG * mult2 / 10) * 10,
      mult3 = lcrng.getNext(1.9, 1.1, 0.05),
      CCD = CCE,
      vert = Math.round(FG * mult3 / 10) * 10,
      M = lcrng.getNext(200, 400, 10); //calcs

  var CDtheta = sd(atan(vert / CCE)),
      BFtheta = sd(atan(vert / EF)),
      W = M * 9.81 / 1000,
      AB = FG + EF,
      AC = AB + CCE,
      EG = FG + EF,
      DG = AC + CCD,
      det = utils.twoByTwoSolver(AB * sin(BFtheta), AC * sin(CDtheta), FG * sin(BFtheta), DG * sin(CDtheta), 0, EG * W),
      FBF = sd(det[0]),
      FCD = sd(det[1]),
      Ax = sd(FBF * cos(BFtheta) - FCD * cos(CDtheta)),
      Ay = sd(FBF * sin(BFtheta) + FCD * sin(CDtheta)),
      RA = stringify(Math.pow(Math.pow(Ax, 2) + Math.pow(Ay, 2), 0.5)),
      RAtheta = stringify(180 + atan(Ay / Ax)),
      Gx = sd(FCD * cos(CDtheta) - FBF * cos(BFtheta)),
      Gy = sd(W - FBF * sin(BFtheta) - FCD * sin(CDtheta)),
      RG = stringify(Math.pow(Math.pow(Gx, 2) + Math.pow(Gy, 2), 0.5)),
      RGtheta = stringify(atan(Gy / Gx)); //stringify - dFGaults to sigDigs
  // P = stringify(P);

  FG = stringify(FG);
  EF = stringify(EF / 1000);
  vert = stringify(vert / 1000);
  M = stringify(M);
  FBF = stringify(FBF);
  FCD = stringify(FCD);
  var statement = "The frame !$ABCDFG!$ supports a triangular sign with mass of ".concat(M, " kg. Determine the internal forces in two-force members !$BF!$ and !$CD!$ due to the weight of the sign. Then determine the magnitude and direction (!$0^\\circ\\le\\theta<360^\\circ!$) of the reactions at !$A!$ and !$G!$."),
      img = "../../images/09CF/09CF12a.png",
      inputs = QWIZM.getInputOverlays([{
    input: FG + ' mm',
    left: 24.75,
    top: 91,
    rot: 45
  }, {
    input: EF + ' m',
    left: 42,
    top: 91.5
  }, {
    input: CCE + ' mm',
    left: 60,
    top: 91,
    rot: 45
  }, {
    input: CCD + ' mm',
    left: 71,
    top: 91,
    rot: 45
  }, {
    input: vert + ' m',
    left: 86,
    top: 32
  }, {
    input: M + ' kg',
    left: 42,
    top: 65,
    fontSize: 110,
    fontWeight: 500
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ F_{BF} !$",
      units: 'kN',
      marks: 4,
      correctSoln: FBF
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ F_{CD} !$",
      units: 'kN',
      marks: 4,
      correctSoln: FCD
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_{A} !$",
      units: 'kN',
      marks: 2,
      correctSoln: RA
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_{A}\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RAtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_{G} !$",
      units: 'kN',
      marks: 2,
      correctSoln: RG
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_{G}\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RGtheta
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement'><h3>Q".concat(qNumber, "</h3>(").concat(thisQuiz[qNumber][0], " marks): <p>\n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image'>\n        <img src= ").concat(img, ">\n        ").concat(inputs, "  \n    </div>\n    <div class='parts'>").concat(QWIZM.methods.questionParts(qNumber), "</div>");
};