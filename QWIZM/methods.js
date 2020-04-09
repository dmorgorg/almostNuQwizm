"use strict";

var QWIZM = QWIZM || {}; // QWIZM.state = QWIZM.state || {}; // an object to hold everything that goes in localStorage

QWIZM.methods = QWIZM.methods || {}; // some constants

QWIZM.DURATION = 400;
QWIZM.NEGATIVE = -42;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;
QWIZM.DELTA = 1e-9; // QWIZM.methods = function () {} // function constructor, doesn't need anything in it

QWIZM.methods.questionPart = function (o) {
  return {
    partStatement: o.partStatement,
    units: o.units,
    marks: o.marks,
    // long: o.long,
    correctSoln: o.correctSoln,
    // userSoln: o.userSoln,
    isAnswered: false,
    isCorrect: false
  };
};

QWIZM.methods.writeHeader = function (o) {
  return "<header>\n                <h1>".concat(o.subject, "</h1>\n                <div class='rightblock'>\n                    <h3>").concat(o.topic, "</h3>\n                    <h3>").concat(o.subtopic, "</h3>\n                </div>\n            </header>");
};

QWIZM.methods.viewsLoad = function (o) {
  var quizId = "quiz_".concat(o.id); // check whether there is a quiz item for this quiz in localStorage

  if (localStorage.getItem(quizId) === null) {
    QWIZM.methods.writeLoginForm();
    $('#uname').focus();
  } // if there is a quiz item, load the state of the quiz
  else {
      QWIZM.state = QWIZM.methods.readState(quizId);
      $('main').html(loadViews());
      $('body').append(QWIZM.methods.writeFooter()); // set all views to display:none;. Do that here rather than initializing all views to hidden so that when they are shown, display: flex (or whatever) is maintained

      $('.view').hide();
      $('#' + QWIZM.state.currentView + 'Btn').addClass("active");
      $('#' + QWIZM.state.currentView).fadeIn();
    }

  function loadViews() {
    var len = QWIZM.quiz.questions.length,
        html = '';
    html += "<div id='instructions' class='view'>\n                <div class=\"statement width70 taleft\">".concat(QWIZM.quiz.instructions, "</div></div>\n                <div id='clear' class='card view' > ").concat(QWIZM.methods.writeClearView(), "</div>");

    for (var i = 1; i < len; i++) {
      html += "<div id='Q".concat(i, "' class='view'>\n            ").concat(QWIZM.quiz.questions[i](i)); // html += questionParts(i);

      html += "</div>";
    }

    html += "<div id='summary' class='view'>Summary</div>";
    return html;
  }
};

QWIZM.methods.questionParts = function (qNumber) {
  var html = "";

  if (QWIZM.state.thisQuiz[qNumber]) {
    var parts = QWIZM.state.thisQuiz[qNumber],
        numberOfParts = parts.length;
    console.log('number of parts ' + parts.length);

    for (var i = 0; i < numberOfParts; i++) {
      html += "<div class='partStatement'>".concat(parts[i].partStatement, ":</div> ");
      html += "<input type='text' id='question".concat(qNumber, "part").concat(i + 1, "' class='partInput'>");
      html += "<span class='units'>".concat(parts[i].units, "</span> ");
      html += "<button id='".concat(qNumber, "part").concat(i + 1, "btn type='button' class='markButton'>Enter</button>");
      html += i % 2 === 0 ? "<span class='cross' />" : "<span class='check' />";
      html += "<span class='marks'>(".concat(parts[i].marks, " marks)</span>"); //html += `<span class='feedback'> ${parts[i].correctSoln}</span>`;
    }
  }

  return html;
};

QWIZM.methods.writeState = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

QWIZM.methods.readState = function (key) {
  return JSON.parse(localStorage.getItem(key));
};

QWIZM.methods.overlayVariable = function (o) {
  var input = o.input,
      left = o.left,
      top = o.top,
      rot = o.rot || 0,
      // degrees, measured counterclockwise from positive x-axis
  fs = o.fontSize || 1.5,
      // units are in vw (view widths)
  bg = o.background || 'white'; // default value is 'white', use 'inherit' or 'none' for no background

  return "<div class='label' style=\"        \n        top: ".concat(top, "%; \n        left: ").concat(left, "%;\n        background-color:").concat(bg, ";        \n        font-size: ").concat(fs, "vw;\n        transform: translate(-50%, -50%) rotate(").concat(-rot, "deg); \">\n        ").concat(input, "\n        </div>");
};

QWIZM.methods.stringify = function (number) {
  var sigDigs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : QWIZM.quiz.sigDigs;
  var delta = QWIZM.DELTA,
      pre = '',
      temp = number + ''; //stringify

  if (QWIZM.quiz.extraDigitForLeadingOne) {
    //save 0, . and - from the front of the string before checking for leading 1 and extra sigDig
    while (temp.charAt(0) === '0' || temp.charAt(0) === '.' || temp.charAt(0) === '-' || temp.charAt(0) === '+') {
      pre += temp.charAt(0);
      temp = temp.slice(1);
    }

    if (temp.charAt(0) === '1') {
      //if number begins with 1, increase the number of sig digs (generally from 3 to 4)
      sigDigs += 1;
    }
  }

  if (number < 0) {
    delta *= -1;
  }

  number = Number((Math.round(number / delta) * delta).toPrecision(sigDigs));
  return number.toPrecision(sigDigs);
};

QWIZM.methods.toSigDigs = function (number) {
  var workingDigs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : QWIZM.quiz.workingDigs;
  return Number(QWIZM.methods.stringify(number, workingDigs = QWIZM.quiz.workingDigs));
};

QWIZM.methods.writeFooter = function () {
  var state = QWIZM.methods.readState(QWIZM.QUIZ_KEY),
      // number of questions in this quiz
  len = QWIZM.quiz.questions.length,
      html = "<footer>\n                <nav class='navbar'>\n                    <ul class='nav-links'>\n                        <li class = \"nav-item\" id=\"instructionsBtn\" > Instructions </li>\n                        <li class = \"nav-item\" id=\"clearBtn\" > Clear </li>";

  for (var i = 1; i < len; i++) {
    html += "<li class=\"nav-item\" id=\"Q".concat(i, "Btn\">Q").concat(i, "</li>");
  }

  return html + "<li class = \"nav-item\" id=\"summaryBtn\">Summary </li>\n                </ul>                                          \n                <div class='uname'>".concat(state.uname, "</div>                     \n            </nav>                     \n        </footer>");
};

QWIZM.methods.writeClearView = function () {
  var html = "<h2>Warning!</h2>\n                <p> Clicking the <span class = \"highlight\"> Clear Quiz </span> button below will reset the quiz, requiring you to log in again.</p >\n                <p><span class=\"highlight\"> All your input answers, currently stored in the browser, will be lost!</span></p>\n                <p> Only click the <span class = \"highlight\"> Clear Quiz </span> button below if this is really what you intend.</p >\n                <p>(Generally, the only reason to clear the quiz from the browser is if you plan to enter a fictitious ID to practise the quiz with a different set of question values.)</p>\n                <button id=\"clear-button\" type=\"submit\">Clear Quiz</button>";
  return html;
};

QWIZM.methods.writeLoginForm = function () {
  $('main').append("<div id=\"login\" class=\"card view\">\n            <h2> Please Log In </h2>\n            <form>\n            <ul class = \"login-list\">\n                <li>\n                    <label for=\"uname\">Username:</label>\n                    <input type=\"text\" id=\"uname\" autocomplete=\"off\" placeholder=\"Alphabetical characters only, e.g. johnSmith\" />\n                </li> \n                <li id=\"unameError\"></li>\n                <li>\n                    <label for=\"uId\">ID number:</label>\n                    <input type = \"text\" id = \"uId\" autocomplete=\"off\" placeholder = \"Numerical characters only, e.g. 402235\" />\n                </li> \n                <li id = \"uIdError\"></li>\n                <li><button id=\"login-button\" type=\"submit\">Submit</button></li>\n            </ul>\n            </form>\n        </div>");
};