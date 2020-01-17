"use strict";

var QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {}; // some constants

QWIZM.DURATION = 400;
QWIZM.NEGATIVE = -42;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;

QWIZM.methods = function () {}; // function constructor, doesn't need anything in it


QWIZM.state = {}; // an object to hold everything

QWIZM.methods.writeHeader = function (o) {
  return "<header>\n                <h1>".concat(o.subject, "</h1>\n                <div class='rightblock'>\n                    <h3>").concat(o.topic, "</h3>\n                    <h3>").concat(o.subtopic, "</h3>\n                </div>\n            </header>");
};

QWIZM.methods.writeFooter = function () {
  var o = QWIZM.methods.readStorage(QWIZM.QUIZ_KEY),
      len = QWIZM.quiz.questions.length,
      inner = "<footer>\n                <nav class='navbar'>\n                    <ul class='nav-links'>\n                        <li class = \"nav-item active\" id=\"instructionsBtn\" > Instructions </li>\n                        <li class = \"nav-item\" id=\"clearBtn\" > Clear </li>";

  for (var i = 1; i <= len; i++) {
    inner += "<li class=\"nav-item\" id=\"Q".concat(i, "Btn\">Q").concat(i, "</li>");
  }

  return inner + "<li class = \"nav-item\" id=\"summaryBtn\">Summary </li>\n                </ul>                                          \n                <div class='uname'>".concat(o.uname, "</div>                     \n            </nav>                     \n        </footer>");
};

QWIZM.methods.pageLoad = function (o) {
  var quizId = "quiz_".concat(o.id); // check whether there is a quiz item for this quiz in localStorage

  if (localStorage.getItem(quizId) === null) {
    QWIZM.methods.writeLoginForm();
  } // if there is a quiz item, load the state of the quiz
  else {
      QWIZM.state = QWIZM.methods.readStorage(quizId);
      $('body').append(QWIZM.methods.writeFooter());
      $('main').text("text"); // $('main').html(QWIZM.methods.loadQuestions());
    }
};

QWIZM.methods.loadQuestions = function () {
  var len = QWIZM.quiz.questions.length,
      html = '';

  for (var i = 1; i <= len; i++) {
    console.log(QWIZM.quiz.questions[i - 1]);
    html += "<script src = \"./lib/utils.js\" ></script>\n";
  }
};

QWIZM.methods.displayPage = function (e) {
  var id = e.target.id;
  $('#' + id).addClass("active"); // $('"li#' + e.target.id + '"').addClass("active");

  console.log(e.target.id);
};

QWIZM.methods.writeLoginForm = function () {
  $('main').append("<div class = \"login-card\">\n            <h2> Please Log In </h2>\n            <form>\n            <ul class = \"login-list\">\n                <li>\n                    <label for=\"uname\">Username</label>\n                    <input type=\"text\" id=\"uname\" autocomplete=\"off\" placeholder=\"Alphabetical characters only, e.g. JohnSmith\" />\n                </li> \n                <li id=\"unameError\"></li>\n                <li>\n                    <label for=\"uId\">ID number</label>\n                    <input type = \"text\" id = \"uId\" autocomplete=\"off\" placeholder = \"Numerical characters only, e.g. 402235\" />\n                </li> \n                <li id = \"uIdError\"></li>\n                <li><button id=\"login-button\" type=\"submit\">Submit</button></li>\n            </ul>\n            </form>\n        </div>");
}; // event handler for clicking the login submit button


QWIZM.methods.validateLogin = function (e) {
  e.preventDefault();
  var uname = $('#uname')[0].value,
      uId = $('#uId')[0].value,
      valid = false; // convert uId to positive integer, if it exists

  uId = uId.length > 0 ? parseInt(uId) : QWIZM.NEGATIVE; // reset error messages to empty string by default; don't persist messages from a previous submit

  $('#unameError').text("");
  $('#uIdError').text("");

  if (uname.length > 0) {
    if (uId > 0) {
      valid = true;
    } else if (uId === 0) {
      $('#uIdError').text("Please provide a non-zero id");
      $('#uId').val("");
      $('#uId').focus();
    } else {
      $('#uIdError').text("Please provide an ID number");
      $('#uId').focus();
    }
  } else if (uId > 0) {
    $('#unameError').text("Please provide a username");
    $('#uname').focus();
  } else if (uId === 0) {
    $('#unameError').text("Please provide a username");
    $('#uIdError').text("Please provide a non-zero id");
    $('#uId').val("");
    $('#uname').focus();
  } else {
    $('#unameError').text("Please provide a username");
    $('#uIdError').text("Please provide an ID number");
    $('#uname').focus();
  }

  if (valid) {
    QWIZM.state.uname = uname;
    QWIZM.state.uId = uId; // writeStorage early enough that it is complete before pageLoad()

    QWIZM.methods.writeStorage(QWIZM.QUIZ_KEY, QWIZM.state);
    $('.login-card').fadeOut(QWIZM.DURATION);
    QWIZM.methods.pageLoad(QWIZM.quiz);
  }
};

QWIZM.methods.writeStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

QWIZM.methods.readStorage = function (key) {
  return JSON.parse(localStorage.getItem(key));
};