"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF05a = function (qNumber) {
  var qId = 1000199; // question ID number, unique to this question    

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
  // sd to convert to number equivalents of string inputs to avoid string concatenation

  var diam = lcrng.getNext(275, 600, 25),
      mult = lcrng.getNext(0.4, 0.5, 0.01),
      mass = sd(stringify(Math.round(diam * mult * 0.5) / 0.5)),
      mult2 = lcrng.getNext(0.8, 0.9, 0.01),
      ABx = sd(stringify(Math.round(diam * mult2 * .1) / .1)),
      mult3 = lcrng.getNext(1.4, 1.6, 0.1),
      ABy = sd(stringify(Math.round(ABx * mult3 * .1) / .1)),
      mult4 = lcrng.getNext(2.6, 2.95, 0.05),
      BDx = sd(stringify(Math.round(ABx * mult4 * .1) / .1)); //calcs

  var theta = sd(atan(ABy / ABx)),
      phi = sd(atan(ABy / BDx)),
      w = sd(mass * 9.81 / 1000),
      R = utils.twoByTwoSolver(-sin(theta), sin(phi), cos(theta), cos(phi), 0, w),
      RF = sd(R[0]),
      RG = sd(R[1]),
      RFtheta = 90 + theta,
      RGtheta = 90 - phi,
      alpha = sd((theta + phi) / 2),
      BF = sd(diam / 2 * tan(alpha)),
      AB = sd(Math.pow(Math.pow(ABx, 2) + Math.pow(ABy, 2), 0.5)),
      AF = AB + BF,
      BD = sd(Math.pow(Math.pow(BDx, 2) + Math.pow(ABy, 2), 0.5)),
      DG = BD + BF,
      B = utils.twoByTwoSolver(-ABy, ABx, ABy, BDx, AF * RF, -DG * RG),
      Bx = sd(B[0]),
      By = sd(B[1]),
      RB = sd(Math.pow(Math.pow(Bx, 2) + Math.pow(By, 2), 0.5)),
      Ax = sd(-Bx - RF * sin(theta)),
      Ay = sd(-By + RF * cos(theta)),
      RA = sd(Math.pow(Math.pow(Ax, 2) + Math.pow(Ay, 2), 0.5)),
      Dx = sd(Bx + RG * sin(phi)),
      Dy = sd(By + RG * cos(phi)),
      RD = sd(Math.pow(Math.pow(Dx, 2) + Math.pow(Dy, 2), 0.5)); //stringify - defaults to sigDigs

  diam = stringify(diam);
  mass = stringify(mass);
  ABx = stringify(ABx);
  ABy = stringify(ABy);
  BDx = stringify(BDx);
  RF = stringify(RF);
  RG = stringify(RG);
  BF = stringify(BF);
  RB = stringify(RB);
  RA = stringify(RA);
  RD = stringify(RD);
  RFtheta = stringify(RFtheta);
  RGtheta = stringify(RGtheta);
  var statement = "!$ABCDE!$ is a frame comprised of two structural members !$ABC!$ and !$DBE!$, pinned at !$B!$. The frame supports a ".concat(mass, " kg section of smooth pipe with diameter ").concat(diam, "&nbsp;mm. Determine the magnitude and direction of each reaction at !$F!$ and !$G!$, due to the pipe. Then, using the lengths !$BF!$ and !$BG!$ (which are the same), determine the magnitudes of the reactions at the pinned connections !$A, B!$ and !$D!$."),
      img = "../../images/09CF/09CF05a.png",
      inputs = QWIZM.getInputOverlays([{
    input: diam + ' mm',
    left: 31.5,
    top: 20.5
  }, {
    input: mass + ' kg',
    left: 34,
    top: 3.5,
    fontWeight: 'bold',
    background: 'none'
  }, {
    input: ABx + ' mm',
    left: 27.5,
    top: 91
  }, {
    input: ABy + ' mm',
    left: 9,
    top: 57
  }, {
    input: BDx + ' mm',
    left: 60,
    top: 91
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_F !$",
      units: 'kN',
      marks: 5,
      correctSoln: RF
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_F\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RFtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_G !$",
      units: 'kN',
      marks: 5,
      correctSoln: RG
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_G\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RGtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ BF !$",
      units: 'mm',
      marks: 2,
      correctSoln: BF
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ RB !$",
      units: 'kN',
      marks: 10,
      correctSoln: RB
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ RA !$",
      units: 'kN',
      marks: 5,
      correctSoln: RA
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ RD !$",
      units: 'kN',
      marks: 5,
      correctSoln: RD
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement width60'><h3>Q".concat(qNumber, "</h3> (").concat(thisQuiz[qNumber][0], " marks): \n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image width55'>\n        <img src= ").concat(img, ">\n        ").concat(inputs, "\n    </div>\n    <form autocomplete=\"off\"><div class='parts paddingLeft5 width55'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};