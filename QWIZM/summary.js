"use strict";

var QWIZM = QWIZM || {};

QWIZM.summary = function () {}; //constructor, not sure why is need this


QWIZM.summary.display = function () {
  QWIZM.state = QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY);
  var totalScore = 0,
      maxPossible = 0,
      qNumber,
      qPart = 0,
      qPartCount = 0,
      thisQuestionScore = 0,
      thisQuestionMax = 0,
      questionCount = QWIZM.state.thisQuiz.length,
      html = "<summary class=\"statement width95\">";
  html += "<h3 class='width100'>Quiz Summary Table for user <span class=\"uname\">".concat(QWIZM.state.uname, "</span>\n    <span class=\"fright\">(Total Score 0/42)</span></h3>");
  html += "<div class=\"table\">";

  for (qNumber = 1; qNumber < questionCount; qNumber++) {
    html += "<section class='row'><div class='qNumber'>Q".concat(qNumber, "</div>");
    html += "<div class='items'>";
    thisQuestionScore = 0;
    thisQuestionMax = 0;
    qPartCount = QWIZM.state.thisQuiz[qNumber].length - 1;

    for (qPart = 1; qPart <= qPartCount; qPart++) {
      var part = QWIZM.state.thisQuiz[qNumber][qPart];
      html += "<div class='item'>".concat(part.partStatement, ": ").concat(part.userInput || 'a');
      html += "</div>"; // console.log('in for: ' + QWIZM.state.thisQuiz[qNumber][qPart].userInput);
    }

    html += "</div></section>";
  } // html += `</div>`;


  html += "</summary>"; // console.log("in summary");
  // console.log(QWIZM.state);

  return html;
};