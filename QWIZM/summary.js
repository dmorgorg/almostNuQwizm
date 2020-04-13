"use strict";

var QWIZM = QWIZM || {};

QWIZM.summary = function () {}; //constructor, not sure why is need this


QWIZM.summary.display = function () {
  var totalScore = 0,
      maxPossibe = 0,
      qNumber,
      qPart,
      thisQuestionScore = 0,
      thisQuestionMax = 0,
      questionCount = QWIZM.quiz.questions.length,
      html = "<article class='statement width95'>";
  html += "<h3>Quiz Summary Table for user <span class='uname'>".concat(QWIZM.state.uname, "</span>\n    <span class='taRight'>(Total Score 0/42)</span></h3>");

  for (qNumber = 1; qNumber < questionCount; qNumber++) {
    html += "Q".concat(qNumber);
  }

  html += "</article>";
  return html;
};