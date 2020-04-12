"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR001 = function (qNumber) {
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
  var qId = 1000003,
      // question ID number, unique to this question        
  seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed);
  thisQuiz[qNumber] = []; // thisQuiz is created at valid login so may cause errors when building new questions; reset and login should handle those.

  var tQ = thisQuiz[qNumber]; //inputs - defaults to workingDigs

  var x = sd(lcrng.getNext(2, 4, 0.025)),
      y1 = sd(lcrng.getNext(0.7, 0.8, 0.01) * x),
      y2 = sd(lcrng.getNext(0.45, 0.55, 0.01) * y1);
  y2 = Math.round(y2 * 100) / 100; // make last (4th) digit a zero
  //calcs

  var BF = sd(Math.sqrt(x * x + y1 * y1)),
      CE = sd(Math.sqrt(x * x + (y1 + y2) * (y1 + y2))); //stringify - defaults to sigDigs

  x = stringify(x);
  y1 = stringify(y1);
  y2 = stringify(y2);
  BF = stringify(BF);
  CE = stringify(CE);
  var statement = "Determine the lengths of truss members !$BF!$ and !$CE!$.",
      //  <br\>
  // Temp: !$x!$ = ${x} m, !$y1!$ = ${y1} m, !$y2!$ = ${y2} m <br\>`;
  img = "../../images/math01.png",
      iV1 = ov({
    input: x + ' m',
    left: 28,
    top: 89 // background: 'orange'

  }),
      iV2 = ov({
    input: x + ' m',
    left: 49,
    top: 89 // background: 'violet'

  }),
      iV3 = ov({
    input: x + ' m',
    left: 70,
    top: 89 // background: 'yellow'

  }),
      iV4 = ov({
    input: y1 + ' m',
    left: 88,
    top: 60 // background: 'pink'

  }),
      iV5 = ov({
    input: y2 + ' m',
    left: 88,
    top: 39 // background: 'yellow'

  }),
      iV6 = ov({
    input: y2 + ' m',
    left: 88,
    top: 24
  }); // thisQuiz.push(questionPart)

  tQ.push(qp({
    partStatement: "!$ BF !$",
    units: 'm',
    marks: 5,
    correctSoln: BF
  }));
  tQ.push(qp({
    partStatement: "!$ CE !$",
    units: 'm',
    marks: 4,
    correctSoln: CE
  }));
  return "<div class='statement width50'><h3>Q".concat(qNumber, "</h3>: \n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image width60'>\n    <img src= ").concat(img, ">\n    ").concat(iV1, "\n    ").concat(iV2, "\n    ").concat(iV3, "\n    ").concat(iV4, "\n    ").concat(iV5, "\n    ").concat(iV6, "\n    </div>\n    <form autocomplete=\"off\"><div class='parts width45'>").concat(QWIZM.methods.questionParts(qNumber), "</div></form>");
};