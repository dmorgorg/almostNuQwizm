"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF06a = function (qNumber) {
  var qId = 1000183; // question ID number, unique to this question    

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

  var CEy = sd(stringify(lcrng.getNext(300, 600, 5))),
      mult = sd(stringify(lcrng.getNext(1.35, 1.55, 0.05))),
      BEy = sd(stringify(Math.round(CEy * mult / 5) * 5)),
      BDy = BEy,
      mult2 = sd(stringify(lcrng.getNext(1.75, 2.25, 0.05))),
      ADx = sd(stringify(Math.round(CEy * mult2 / 5) * 5)),
      AEx = ADx,
      ADy = CEy,
      P = sd(stringify(lcrng.getNext(3, 5, 0.05))); //calcs

  var RC = P,
      CEtheta = sd(atan(CEy / AEx)),
      RCtheta = sd(180 - CEtheta),
      REtheta = sd(RCtheta / 2 - 45),
      RE = sd(P * cos(180 - RCtheta) / cos(REtheta)),
      lenBD = sd(Math.sqrt(Math.pow(ADx, 2) + Math.pow(BDy, 2))),
      BDtheta = sd(atan(BDy / ADx)),
      RB = sd(P * ((1 - sin(CEtheta)) * (ADx + AEx) - cos(CEtheta) * (BDy + BEy)) / lenBD),
      RBtheta = sd(RB >= 0 ? 90 + BDtheta : BDtheta - 90),
      RDx = sd(RB * cos(BDtheta - 90) + P * cos(CEtheta)),
      RDy = sd(P * (1 - sin(CEtheta)) - RB * cos(BDtheta)),
      RD = sd(Math.sqrt(Math.pow(RDx, 2) + Math.pow(RDy, 2))),
      RDtheta = sd(atan(RDy / RDx)),
      RAy = sd(P * sin(CEtheta) - RB * cos(BDtheta)),
      RAx = sd(RB * sin(BDtheta) + P * cos(CEtheta)),
      RA = sd(Math.sqrt(Math.pow(RAy, 2) + Math.pow(RAx, 2))),
      RAtheta = sd(atan(RAy / RAx)),
      MA = sd(((ADy + BDy + BEy + CEy) * P * cos(CEtheta) - (ADy + BDy) * RB * sin(BDtheta)) / 1000);
  RB = Math.abs(RB); //stringify - defaults to sigDigs

  RC = stringify(RC);
  RCtheta = stringify(RCtheta);
  REtheta = stringify(REtheta);
  RE = stringify(RE);
  lenBD = stringify(lenBD);
  RB = stringify(RB);
  RBtheta = stringify(RBtheta);
  RD = stringify(RD);
  RDtheta = stringify(RDtheta);
  RA = stringify(RA);
  RAtheta = stringify(RAtheta);
  MA = stringify(MA);
  P = stringify(P);
  var statement = "!$A!$ is a fixed connection with a reaction and reacting moment, !$B!$ is a pin in a frictionless  slot, !$D!$ is a pinned connection and there is a small, smooth pulley at !$E!$. Determine the reactions (both magnitude and direction !$\\theta!$, measured relative to the positive !$x!$-axis and where !$-180^\\circ\\!<\\theta\\le \\!180^\\circ!$) at !$A, B, C, D!$ and !$E!$ due to the applied force of ".concat(P, " kN. Then determine !$M_A!$, the reacting moment at !$A!$."),
      img = "../../images/09CF/09CF06a.png",
      inputs = QWIZM.getInputOverlays([{
    input: CEy + ' mm',
    left: 83,
    top: 23
  }, {
    input: BEy + ' mm',
    left: 83,
    top: 36
  }, {
    input: BDy + ' mm',
    left: 83,
    top: 51
  }, {
    input: ADx + ' mm',
    left: 32.25,
    top: 88.5
  }, {
    input: AEx + ' mm',
    left: 54,
    top: 88.5
  }, {
    input: ADy + ' mm',
    left: 83,
    top: 64
  }, {
    input: P + ' kN',
    left: 65.5,
    top: 52,
    color: '#a00',
    fontSize: 110,
    fontWeight: 'bold'
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_C !$",
      units: 'kN',
      marks: 1,
      correctSoln: RC
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_C\\theta !$",
      units: '&deg;',
      marks: 1,
      correctSoln: RCtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_E !$",
      units: 'kN',
      marks: 3,
      correctSoln: RE
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_E\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: REtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_B !$",
      units: RB < 1 ? 'N' : 'kN',
      marks: 5,
      correctSoln: RB < 1 ? RB * 1000 : RB
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_B\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RBtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_D !$",
      units: 'kN',
      marks: 5,
      correctSoln: RD
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_D\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RDtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_A !$",
      units: 'kN',
      marks: 5,
      correctSoln: RA
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_A\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RAtheta
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ M_A !$",
      units: 'kN!$\\cdot!$m',
      marks: 4,
      correctSoln: MA
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement'><h3>Q".concat(qNumber, "</h3> (").concat(thisQuiz[qNumber][0], " marks): <p>\n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image'>\n        <img src= ").concat(img, ">\n        ").concat(inputs, "\n    </div>\n    <form autocomplete=\"off\"><div class='parts'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};