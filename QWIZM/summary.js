"use strict";

var QWIZM = QWIZM || {};

QWIZM.summary = function () {}; //constructor, not sure why is need this


QWIZM.summary.display = function () {
  // console.log('in summary');
  // console.log(QWIZM.state);
  // console.log(QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY));
  var state = QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY);
  var quizScore = 0,
      quizPossible = 0,
      qNumber,
      qPart = 0,
      qPartCount = 0,
      questionScore = 0,
      questionPossible = 0,
      questionCount = state.thisQuiz.length - 1,
      html = "<summary class=\"statement width95\">"; // get quizScore and quizPossible for header

  for (var _qNumber = 1; _qNumber < questionCount; _qNumber++) {
    var _qPartCount = state.thisQuiz[_qNumber].length - 1;

    questionScore = 0;
    questionPossible = 0;

    for (var _qPart = 1; _qPart <= _qPartCount; _qPart++) {
      var part = state.thisQuiz[_qNumber][_qPart];
      questionScore += part.score || 0;
      questionPossible += part.marks;
    }

    quizScore += questionScore;
    quizPossible += questionPossible;
  }

  html += "<h3 class='width100'>Quiz Summary Table for <span class=\"uname\">".concat(state.uname, "</span>\n        <span class = \"fright total\" > Total Score: &nbsp; ").concat(quizScore, "&thinsp;/&thinsp;").concat(quizPossible, "</span></h3>");
  html += "<div class=\"table\">";

  for (qNumber = 1; qNumber < questionCount; qNumber++) {
    qPartCount = state.thisQuiz[qNumber].length - 1;
    questionScore = 0;
    questionPossible = 0; // get questionScore and questionPossible

    for (qPart = 1; qPart <= qPartCount; qPart++) {
      var _part = state.thisQuiz[qNumber][qPart];
      questionScore += _part.score || 0;
      questionPossible += _part.marks;
    }

    html += "<section class='row'><div class='qNumber'>Q".concat(qNumber);
    html += "<span class=\"questionMarks\"> (".concat(questionScore, "/").concat(questionPossible, ")</span></div>");
    html += "<div class='items'>";

    for (qPart = 1; qPart <= qPartCount; qPart++) {
      var _part2 = state.thisQuiz[qNumber][qPart],
          check = '<div class="symb"><span class="check" /></div>',
          cross = '<div class="symb"><span class="cross" /></div>',
          qm = '<div class="symb"><span class="qm" /></div>',
          empty = '<div class="symb"></div>';
      html += "<div class='item'><span class='ps'>".concat(_part2.partStatement, ":</span>");
      html += "<span class=\"ui\"> ".concat(_part2.userInput || '', "</span>");

      if (_part2.isAnswered) {
        if (_part2.isCorrect) {
          html += check;
        } else if (_part2.half) {
          html += qm;
        } else {
          html += cross;
        }
      } else {
        html += empty;
      }

      html += "<div class=\"marked\"> (".concat(_part2.score || 0, "/").concat(_part2.marks, ") </div>");
      html += "</div>";
    }

    html += "</div></section>";
  }

  html += "</summary>";
  return html;
};