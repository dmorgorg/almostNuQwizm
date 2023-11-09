"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF12b = function (qNumber) {
  var qId = 1000367; // question ID number, unique to this question    

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

  var APy = lcrng.getNext(1.05, 1.35, 0.025),
      mult = lcrng.getNext(0.4, 0.6, 0.01),
      BPy = sd(stringify(Math.round(APy * mult * 20) / 20)),
      mult2 = lcrng.getNext(2, 2.5, 0.05),
      BCy = sd(stringify(Math.round(APy * mult2 * 20) / 20)),
      mult3 = lcrng.getNext(1.4, 1.6, 0.05),
      AFx = sd(stringify(Math.round(APy * mult3 * 20) / 20)),
      UDL = lcrng.getNext(3, 4.5, 0.1); //calcs

  var ABy = APy + BPy,
      ACy = ABy + BCy,
      CPy = BCy + BPy,
      W = UDL * CPy,
      AWy = APy + CPy / 2,
      BDtheta = sd(atan(BCy / AFx)),
      a11 = ABy * cos(BDtheta),
      a12 = ACy * cos(BDtheta),
      b1 = -W * AWy,
      a21 = ACy * cos(BDtheta),
      a22 = ABy * cos(BDtheta),
      b2 = 0,
      det = utils.twoByTwoSolver(a11, a12, a21, a22, b1, b2),
      BD = det[0],
      CE = det[1],
      Ax = -sd(BD * cos(BDtheta) + W + CE * cos(BDtheta)),
      Ay = sd(CE * sin(BDtheta) - BD * sin(BDtheta)),
      RA = sd(Math.pow(Math.pow(Ax, 2) + Math.pow(Ay, 2), 0.5)),
      RAtheta = sd(180 + atan(Ay / Ax)),
      Fx = sd(CE * cos(BDtheta) + BD * cos(BDtheta)),
      Fy = sd(BD * sin(BDtheta) - CE * sin(BDtheta)),
      RF = sd(Math.pow(Math.pow(Fx, 2) + Math.pow(Fy, 2), 0.5)),
      RFtheta = sd(180 + atan(Fy / Fx)); //stringify - defaults to sigDigs

  APy = stringify(APy);
  BPy = stringify(BPy * 1000);
  BCy = stringify(BCy);
  AFx = stringify(AFx);
  UDL = stringify(UDL);
  BD = stringify(BD);
  CE = stringify(CE);
  RA = stringify(RA);
  RAtheta = stringify(RAtheta);
  RF = stringify(RF);
  RFtheta = stringify(RFtheta);
  var statement = "Frame !$ABCDF!$ is subjected to a distributed load of ".concat(UDL, " kN/m, as shown. Frame members !$CE!$ and !$DB!$ are not connected to each other. Determine the internal forces in members !$CE!$ and !$BD!$ due to the load. Then determine the magnitude and direction <br>(!$0^\\circ\\le\\theta<360^\\circ!$) of the reactions at pinned connections !$A!$ and !$F!$."),
      img = "../../images/09CF/09CF12b.png";
  var inputs = QWIZM.getInputOverlays([{
    input: APy + ' m',
    left: 79,
    top: 68
  }, {
    input: BPy + ' mm',
    left: 78.75,
    top: 55.25
  }, {
    input: BCy + ' m',
    left: 79,
    top: 34.5
  }, {
    input: AFx + ' m',
    left: 46,
    top: 91.25
  }, {
    input: UDL + ' kN/m',
    left: 14,
    top: 11,
    fontWeight: 600
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ F_{BD} !$",
      units: 'kN',
      marks: 6,
      correctSoln: BD
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ F_{CE} !$",
      units: 'kN',
      marks: 6,
      correctSoln: CE
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_A !$",
      units: 'kN',
      marks: 2,
      correctSoln: RA
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_A\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RAtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_F !$",
      units: 'kN',
      marks: 2,
      correctSoln: RF
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_F\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RFtheta
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement'><h3>Q".concat(qNumber, "</h3>(").concat(thisQuiz[qNumber][0], " marks):<p>\n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image'>\n        <img src= ").concat(img, ">\n       ").concat(inputs, "          \n    </div>\n    <div class='parts'>").concat(QWIZM.methods.questionParts(qNumber), "</div>");
};