"use strict";

// since everything within <body> is created dynamically, we need to use event delegation
$('body').on("keyup", "#uname", function (e) {
  return e.target.value = utils.makeInputAlpha(e.target.value);
});
$('body').on("keyup", "#uId", function (e) {
  return e.target.value = utils.makeInputInteger(e.target.value);
});
$('body').on("click", "#login-button", QWIZM.handlers.validateLogin);
$('body').on("click", "li.nav-item", QWIZM.handlers.updateView);
$('body').on("click", "#clear-button", QWIZM.handlers.reset);