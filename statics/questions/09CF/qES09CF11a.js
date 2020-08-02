"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF11a = function (qNumber) {
  var qId = 1000249; // question ID number, unique to this question    

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

  var CFy = lcrng.getNext(600, 750, 10),
      mult = lcrng.getNext(1.9, 2.1, 0.05),
      BCy = Math.round(CFy * mult / 10) * 10,
      mult2 = lcrng.getNext(1.9, 2.1, 0.05),
      DFy = Math.round(CFy * mult2 / 10) * 10,
      mult3 = lcrng.getNext(2.85, 3.15, 0.05),
      ABx = Math.round(CFy * mult3 / 10) * 10,
      mult4 = lcrng.getNext(1.15, 1.3, 0.05),
      BCx = Math.round(ABx * mult4 / 10) * 10,
      P = lcrng.getNext(2.5, 5, 0.1); //calcs

  var BCtheta = sd(atan(BCy / BCx)),
      FBC = -P * DFy / cos(BCtheta) / (DFy + CFy),
      Dx = sd(P + FBC * cos(BCtheta)),
      Dy = -sd(FBC * sin(BCtheta)),
      RD = sd(Math.pow(Math.pow(Dx, 2) + Math.pow(Dy, 2), 0.5)),
      RDtheta = stringify(atan(Dy / Dx)),
      CDy = CFy + DFy,
      BDy = BCy + CDy,
      AEy = CDy,
      ABy = BDy,
      AEx = sd(AEy / ABy * ABx),
      ABtheta = sd(atan(ABy / ABx)),
      REtheta = stringify(270 + ABtheta),
      AB = sd(Math.pow(Math.pow(BDy, 2) + Math.pow(ABx, 2), 0.5)),
      AE = sd(AB * CDy / BDy),
      RE = -sd(FBC * AB * sin(BCtheta + ABtheta) / AE),
      Ax = -sd(RE * sin(ABtheta) + FBC * cos(BCtheta)),
      Ay = sd(RE * cos(ABtheta) + FBC * sin(BCtheta)),
      RA = stringify(Math.pow(Math.pow(Ax, 2) + Math.pow(Ay, 2), 0.5)),
      RAtheta = stringify(180 + atan(Ay / Ax)); //stringify - defaults to sigDigs

  P = stringify(P);
  BCy = stringify(BCy / 1000);
  DFy = stringify(DFy / 1000);
  ABx = stringify(ABx / 1000);
  BCx = stringify(BCx / 1000);
  FBC = stringify(FBC);
  RD = stringify(RD);
  RE = stringify(RE);
  var statement = "There is a frictionless rocker at !$E!$. All other connections are pinned.  Determine the internal force in !$BC!$ and the reactions (both direction, measured counter-clockwise from the positive !$x!$-axis, and magnitude) at connections !$A,D!$ and !$E!$, when a ".concat(P, "&nbsp;kN force is applied to member !$CD!$ (as indicated). Do not assume that !$\\angle ABC!$ is a right angle!"),
      img = "../../images/09CF/09CF11a.png",
      inputs = QWIZM.getInputOverlays([{
    input: DFy + ' m',
    left: 81,
    top: 57
  }, {
    input: ABx + ' m',
    left: 28,
    top: 88.75
  }, {
    input: BCx + ' m',
    left: 55,
    top: 88.75
  }, {
    input: P + ' kN',
    left: 90,
    top: 44.5,
    color: '#AC1F2C',
    fontWeight: 'bold',
    fontSize: 1.5,
    background: 'none'
  }, {
    input: BCy + ' m',
    left: 81,
    top: 19.5
  }, {
    input: CFy + ' mm',
    left: 81,
    top: 38.25
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ F_{BC} !$",
      units: 'kN',
      marks: 4,
      correctSoln: FBC
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_D !$",
      units: 'kN',
      marks: 2,
      correctSoln: RD
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_D\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RDtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_E !$",
      units: 'kN',
      marks: 6,
      correctSoln: RE
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_E\\theta !$",
      units: '&deg',
      marks: 2,
      correctSoln: REtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_A !$",
      units: 'kN',
      marks: 4,
      correctSoln: RA
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_A\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RAtheta
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement width65'><h3>Q".concat(qNumber, "</h3>(").concat(thisQuiz[qNumber][0], " marks): \n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image width65'>\n        <img src= ").concat(img, ">\n       ").concat(inputs, "     \n    </div>\n    <form autocomplete=\"off\"><div class='parts paddingLeft5 width55'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};