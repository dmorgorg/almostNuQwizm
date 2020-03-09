"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR005 = function (qNumber) {
  var qId = 1000081,
      // question ID number, unique to this question
  uId = QWIZM.state.uId,
      sd = utils.toSigDigs,
      sin = utils.sin,
      cos = utils.cos,
      asin = utils.asin,
      acos = utils.acos,
      tan = utils.tan,
      atan = utils.atan,
      stringify = utils.stringify,
      sigDigs = QWIZM.quiz.sigDigs,
      seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed); //inputs

  var AC = sd(lcrng.getNext(5, 15, 0.5), sigDigs),
      multiplier = lcrng.getNext(0.55, 0.75, 0.05),
      AD = sd(AC * multiplier, sigDigs); //calcs

  var CD = Math.sqrt(Math.pow(AC, 2) - Math.pow(AD, 2)),
      AB = AD * AC / CD,
      BC = AB * AD / AC; //stringify

  AC = stringify(AC, sigDigs);
  AD = stringify(AD, sigDigs);
  CD = stringify(CD, sigDigs);
  AB = stringify(AB, sigDigs);
  BC = stringify(BC, sigDigs);
  var statement = "Using the Pythagorean Theorem and the theory of similar triangles, determine the lengths of  !$AB!$, !$BD!$ and !$CD!$.<p>\n    Inputs: AC = ".concat(AC, " cm, AD = ").concat(AD, " cm<p>    \n    <p>\n    \n   ");
  var img = "../../images/math05.png";
  return "<div class='statement width60'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "<br>\n    Ans: <i>CD</i> = ").concat(CD, " cm, <i>AB</i> = ").concat(AB, " cm, <i>BC</i> = ").concat(BC, " cm;\n    </div>\n    <div class='image width35'><img src= ").concat(img, "></div>");
};