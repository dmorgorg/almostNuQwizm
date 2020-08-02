"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF07a = function (qNumber) {
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
  // sd to convert to number equivalents of string inputs to avoid string concatenation

  var AB = sd(stringify(lcrng.getNext(2, 3, 0.05))),
      mult = sd(stringify(lcrng.getNext(0.75, 0.85, 0.01))),
      BC = sd(stringify(Math.round(AB * mult * 5) / 5)),
      DL = sd(stringify(lcrng.getNext(2, 4, 0.05))); //calcs

  var DL2 = sd(DL * BC / (AB + BC)),
      W2 = sd(DL2 * BC / 2),
      RC = sd(W2 / 3),
      RB = sd(2 / 3 * W2),
      W1rect = sd(DL2 * AB),
      W1tri = sd(DL - DL2) * AB / 2,
      RA = sd(W1rect + W1tri + RB),
      MA = sd(AB * (W1tri / 3 + W1rect / 2 + RB)); //stringify - defaults to sigDigs

  AB = stringify(AB);
  BC = stringify(BC);
  DL = stringify(DL);
  RC = stringify(RC * 1000);
  RB = stringify(RB * 1000);
  RA = stringify(RA);
  MA = stringify(MA);
  var statement = "There is a fixed connection at !$A!$, a pinned connection at !$B!$ and a roller at !$C!$. Determine the magnitude of the reactions at !$A, B!$ and !$C!$, and the reacting moment !$M_A!$ at !$A!$, due to the uniformly varying load shown.",
      img = "../../images/09CF/09CF07a.png",
      inputs = QWIZM.getInputOverlays([{
    input: AB + ' m',
    left: 37,
    top: 83
  }, {
    input: BC + ' m',
    left: 74,
    top: 83 //background: 'yellow'

  }, {
    input: DL + ' kN/m',
    left: 23.5,
    top: 16,
    background: 'none'
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber];
    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_C !$",
      units: 'N',
      marks: 6,
      correctSoln: RC
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_B !$",
      units: 'N',
      marks: 2,
      correctSoln: RB
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ R_A !$",
      units: 'kN',
      marks: 6,
      correctSoln: RA
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

  return "<div class='statement width50'><h3>Q".concat(qNumber, "</h3> (").concat(thisQuiz[qNumber][0], " marks): \n        ").concat(statement, "</div>\n        <div id = '").concat(qId, "img' class='image width55'>\n            <img src= ").concat(img, ">\n            ").concat(inputs, "\n            </div>\n        <form autocomplete=\"off\"><div class='parts paddingLeft5 width55'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};