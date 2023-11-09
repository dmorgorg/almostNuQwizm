"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qWR08HW002 = function (qNumber) {
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
      partMarks = 0,
      debug = false; //inputs - defaults to sigDigs
  // sd to convert to number equivalents of string inputs to avoid string concatenation
  // input variables EDIT THE FOLLOWING ON A PER-QUESTION BASIS

  var len2 = sd(lcrng.getNext(1200, 2000, 50)),
      mult = sd(lcrng.getNext(1.1, 1.4, 0.05)),
      len1 = Math.round(len2 * mult / 25) * 25;
  mult = sd(lcrng.getNext(1.4, 1.8, 0.05));
  var len3 = Math.round(len2 * mult / 25) * 25,
      d1 = sd(lcrng.getNext(300, 400, 10)),
      d2 = sd(lcrng.getNext(150, 250, 5)),
      d3 = sd(lcrng.getNext(450, 600, 10)),
      c1 = sd(lcrng.getNext(90, 150, 10)),
      c2 = sd(lcrng.getNext(90, 150, 10)),
      c3 = sd(lcrng.getNext(90, 150, 10)),
      // assume hLBC = 10m and get flows and velocities
  hL10 = 10,
      Q1temp = utils.fluids.getQ(len1, c1, d1, hL10),
      Q2temp = utils.fluids.getQ(len2, c2, d2, hL10),
      Q3temp = utils.fluids.getQ(len3, c3, d3, hL10),
      v1temp = Q1temp / 1000 / Math.PI / Math.pow(d1 / 1000, 2) * 4,
      v2temp = Q2temp / 1000 / Math.PI / Math.pow(d2 / 1000, 2) * 4,
      v3temp = Q3temp / 1000 / Math.PI / Math.pow(d3 / 1000, 2) * 4,
      vtempMax = Math.max(v1temp, v2temp, v3temp),
      // but this is the max velocity we want
  maxVel = sd(lcrng.getNext(2, 2.8, 0.05)),
      // so we should scale the flows accordingly (n.b, vel propto Q)
  scale = sd(maxVel / vtempMax),
      Q1temp2 = sd(scale * Q1temp),
      Q2temp2 = sd(scale * Q2temp),
      Q3temp2 = sd(scale * Q3temp),
      Q = stringify(Math.round(Q1temp2 + Q2temp2 + Q3temp2)),
      // now that Q is determined, recalculate required flows and velocities based on this flow
  // total flow based on a hLBC = 10m previously calculated
  Qtotal2 = sd(Q1temp + Q2temp + Q3temp),
      scale2 = Q / Qtotal2,
      Q1 = Q1temp * scale2,
      Q2 = Q2temp * scale2,
      Q3 = Q3temp * scale2,
      vel1 = Q1 / 1000 / Math.PI / Math.pow(d1 / 1000, 2) * 4,
      vel2 = Q2 / 1000 / Math.PI / Math.pow(d2 / 1000, 2) * 4,
      vel3 = Q3 / 1000 / Math.PI / Math.pow(d3 / 1000, 2) * 4,
      hLBC = utils.fluids.getHeadLoss(len1, Q1, c1, d1); // round for correct solution

  Q1 = stringify(Q1);
  Q2 = stringify(Q2);
  Q3 = stringify(Q3);
  vel1 = stringify(vel1);
  vel2 = stringify(vel2);
  vel3 = stringify(vel3);
  hLBC = stringify(hLBC);
  var statement = "Water flows from !$A!$ to !$D!$, the flow splitting into three parallel pipes !$1, 2!$ and !$3!$ between !$B!$ and !$C!$. Flow through the system is !$".concat(Q, "!$ L/s. <p>Determine the flow and the average velocity through each of the pipes !$1!$, !$2!$ and !$3!$. <p>Also, determine the head loss between !$B!$ and !$C!$.<p>Disregard all minor losses.");
  var img = "../../images/08HW/qwizmHWQ02.png";
  var inputs = QWIZM.getInputOverlays([{
    input: "!$               \n                    L_1 = ".concat(len1, " \\textsf{ m, } D_1 = ").concat(d1, " \\textsf{ mm, }C_1 = ").concat(c1, "                    \n                    !$"),
    left: 56,
    top: 13,
    // fs: 80  // percentage
    bg: "none"
  }, {
    input: "!$               \n                    L_2 = ".concat(len2, " \\textsf{ m, } D_2 = ").concat(d2, " \\textsf{ mm, }C_2 = ").concat(c2, "                    \n                    !$"),
    left: 54,
    top: 30,
    // fs: 80  // percentage
    bg: "none"
  }, {
    input: "!$               \n                    L_3 = ".concat(len3, " \\textsf{ m, } D_3 = ").concat(d3, " \\textsf{ mm, }C_3 = ").concat(c3, "                    \n                    !$"),
    left: 54,
    top: 90,
    // fs: 80  // percentage
    bg: "none"
  }]);

  if (!thisQuiz[qNumber] || debug) {
    thisQuiz[qNumber] = [];
    thisQuestion = thisQuiz[qNumber]; // thisQuiz.push(questionPart)

    thisQuestion[arrayCount++] = '';
    thisQuestion[arrayCount++] = {
      partStatement: "!$ Q_1 !$",
      units: 'L/s',
      marks: 2,
      correctSoln: Q1
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ v_1 !$",
      units: 'm/s',
      marks: 2,
      correctSoln: vel1
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ Q_2 !$",
      units: 'L/s',
      marks: 2,
      correctSoln: Q2
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ v_2 !$",
      units: 'm/s',
      marks: 2,
      correctSoln: vel2
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ Q_3 !$",
      units: 'L/s',
      marks: 2,
      correctSoln: Q3
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ v_3 !$",
      units: 'm/s',
      marks: 2,
      correctSoln: vel3
    };
    thisQuestion[arrayCount++] = {
      partStatement: "!$ hL_{BC} !$",
      units: 'm/s',
      marks: 2,
      correctSoln: hLBC
    };

    for (var i = 1; i < thisQuestion.length; i++) {
      partMarks += thisQuestion[i].marks;
    } // store question total marks in the empty first element of the array


    thisQuestion[0] = partMarks;
  }

  return "<div class='statement'><h3>Q".concat(qNumber, "</h3> (").concat(thisQuiz[qNumber][0], " marks):<p> \n    ").concat(statement, "</div>\n    <div id = '").concat(qId, "img' class='image width120'>\n        <img src= ").concat(img, ">        \n        ").concat(inputs, "\n        </div>\n    <div class='parts width100'>").concat(QWIZM.methods.questionParts(qNumber), "</div>");
};