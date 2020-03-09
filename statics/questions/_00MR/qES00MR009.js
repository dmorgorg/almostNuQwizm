"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR009 = function (qNumber) {
  var qId = 1000151,
      // question ID number, unique to this question
  uId = QWIZM.state.uId,
      sd = utils.toSigDigs,
      sigDigs = QWIZM.quiz.sigDigs,
      seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
      lcrng = new utils.LCRNG(seed);
  return "<div class='statement'><h3>Q".concat(qNumber, "</h3></div>");
};