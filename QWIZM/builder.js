"use strict";

var QWIZM = QWIZM || {};
$(document).ready(function () {
  QWIZM.builder = function (Qq) {
    QWIZM.quiz.questions.unshift(''); // make arrays indices line up with question numbers
    // let currentView = 'instructions';

    $('body').append(QWIZM.methods.writeHeader(Qq));
    $('body').append("<main></main>");
    QWIZM.methods.viewsLoad(Qq);
  }(QWIZM.quiz);
});