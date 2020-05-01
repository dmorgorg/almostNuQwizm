"use strict";

var QWIZM = QWIZM || {};

QWIZM.summary = function () {}; //constructor, not sure why is need this


QWIZM.summary.display = function () {
  console.log('in summary');
  console.log(QWIZM.state);
  console.log(QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY));
  var totalScore = 0,
      maxPossible = 0,
      qNumber,
      qPart = 0,
      qPartCount = 0,
      thisQuestionScore = 0,
      thisQuestionMax = 0,
      state = QWIZM.state,
      questionCount = state.thisQuiz.length,
      html = "<summary class=\"statement width95\">";
  html += "<h3 class='width100'>Quiz Summary Table for user: <span class=\"uname\">".concat(state.uname, "</span>\n    <span class=\"fright\">(Total Score ").concat(totalScore, "/").concat(maxPossible, ")</span></h3>");
  html += "<div class=\"table\">";

  for (qNumber = 1; qNumber < questionCount; qNumber++) {
    html += "<section class='row'><div class='qNumber'>Q".concat(qNumber, "</div>");
    html += "<div class='items'>";
    thisQuestionScore = 0;
    thisQuestionMax = 0;
    qPartCount = state.thisQuiz[qNumber].length - 1;

    for (qPart = 1; qPart <= qPartCount; qPart++) {
      var part = state.thisQuiz[qNumber][qPart];
      html += "<div class='item'>".concat(part.partStatement, ": ").concat(part.userInput || '<span class="qm" />');
      html += "</div>";
    }

    html += "</div></section>";
  }

  html += "</summary>";
  return html;
};