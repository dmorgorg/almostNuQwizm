"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF002a = function (qNumber) {
  var qId = 1000187; // question ID number, unique to this question    

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
      debug = false; //inputs - defaults to sigDigs
  // sd to convert to number equivalents of string inputs to avoid string concatenation

  var ABx = sd(stringify(lcrng.getNext(1, 2, 0.05))),
      mult1 = sd(stringify(lcrng.getNext(1.1, 1.3, 0.025))),
      ABy = sd(stringify(Math.round(ABx * mult1 / 0.05) * 0.05)),
      mult2 = sd(stringify(lcrng.getNext(1.5, 1.7, 0.025))),
      BCx = sd(stringify(Math.round(ABx * mult2 / 0.05) * 0.05)),
      ABDL = sd(stringify(lcrng.getNext(3, 4, 0.1))),
      BCDL = sd(stringify(lcrng.getNext(2, 3, 0.1))); //calcs

  var Wtri = sd(ABDL * ABy / 2),
      BC = sd(Math.pow(Math.pow(BCx, 2) + Math.pow(ABy, 2), 0.5)),
      Wrect = sd(BC * BCDL),
      a11 = ABy,
      a12 = ABx,
      a21 = ABy,
      a22 = -BCx,
      b1 = sd(2 / 3 * ABy * Wtri),
      b2 = sd(Wrect * BC / 2),
      D = sd(a11 * a22 - a12 * a21),
      Dx = sd(b1 * a22 - b2 * a12),
      Dy = sd(a11 * b2 - a21 * b1),
      Bx = sd(Dx / D),
      By = sd(Dy / D),
      RB = sd(Math.pow(Math.pow(Bx, 2) + Math.pow(By, 2), 0.5)),
      RBtheta = sd(atan(-By / Bx)),
      Ax = sd(Bx - Wtri),
      Ay = -By,
      RA = sd(Math.pow(Math.pow(Ax, 2) + Math.pow(Ay, 2), 0.5)),
      RAtheta = sd(atan(Ay / Ax)),
      BCtheta = sd(atan(ABy / BCx)),
      Cx = sd(Wrect * sin(BCtheta) - Bx),
      Cy = sd(Wrect * cos(BCtheta) + By),
      RC = sd(Math.pow(Math.pow(Cx, 2) + Math.pow(Cy, 2), 0.5)),
      RCtheta = sd(atan(Cy / Cx)); //stringify - defaults to sigDigs

  ABx = stringify(ABx);
  BCx = stringify(BCx);
  ABy = stringify(ABy);
  ABDL = stringify(ABDL);
  BCDL = stringify(BCDL);
  RB = stringify(RB);
  RBtheta = stringify(RBtheta);
  RA = stringify(RA);
  RAtheta = stringify(RAtheta);
  RC = stringify(RC);
  RCtheta = stringify(RCtheta);
  var statement = "!$ABC!$ is a frame comprised of two structural members !$AB!$ and !$BC!$, pinned at !$B!$ and loaded as shown. Determine the force !$R_B!$ (magnitude and direction !$\\theta!$, where <br> !$0\\!\\le\\!\\theta\\!<360!$, measured counterclockwise from the positive !$x!$-axis) that frame member !$AB!$ exerts on frame member !$BC!$. Then determine the reactions at the pinned connections !$A!$ and !$C!$.",
      img = "../../images/09CF/09CF02a.png",
      iV1 = ov({
    input: ABx + ' m',
    left: 40,
    top: 90
  }),
      iV2 = ov({
    input: BCx + ' m',
    left: 68,
    top: 90 //background: 'yellow'

  }),
      iV3 = ov({
    input: ABy + ' m',
    left: 10,
    top: 50 // background: 'none'

  }),
      iV4 = ov({
    input: ABDL + ' kN/m',
    left: 15,
    top: 22.5,
    background: 'none'
  }),
      iV5 = ov({
    input: BCDL + ' kN/m',
    left: 78.5,
    top: 25.5,
    rot: -36,
    background: 'none'
  });

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_B !$",
      units: 'kN',
      marks: 10,
      correctSoln: RB
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_B\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RBtheta
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
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_C !$",
      units: 'kN',
      marks: 6,
      correctSoln: RC
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_C\\theta !$",
      units: '&deg;',
      marks: 2,
      correctSoln: RCtheta
    };
  }

  return "<div class='statement width60'><h3>Q".concat(qNumber, "</h3>: \n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image width55'>\n        <img src= ").concat(img, ">\n        ").concat(iV1, "\n        ").concat(iV2, "\n        ").concat(iV3, "\n        ").concat(iV4, "\n        ").concat(iV5, "\n    </div>\n    <form autocomplete=\"off\"><div class='parts paddingLeft5 width55'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};