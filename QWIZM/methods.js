"use strict";

var QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {}; // some constants

QWIZM.DURATION = 400;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;
QWIZM.DELTA = 1e-9; // QWIZM.methods = function () {} // function constructor, doesn't need anything in it

QWIZM.methods.questionPart = function (o) {
  return {
    partStatement: o.partStatement,
    units: o.units,
    marks: o.marks,
    correctSoln: o.correctSoln
  };
};

QWIZM.methods.viewsLoad = function (o) {
  var quizId = "quiz_".concat(o.id); // check whether there is a quiz item for this quiz in localStorage

  if (localStorage.getItem(quizId) === null) {
    QWIZM.methods.writeLoginForm();
    $('#uname').focus();
  } // if there is a quiz item, load the state of the quiz
  else {
      QWIZM.state = QWIZM.methods.readFromLocalStorage(quizId);
      console.log('top of else');
      console.log(QWIZM.state);
      $('main').html(loadViews()); // set handlers for all the question answer inputs

      setHandlers();
      $('body').append(QWIZM.methods.writeFooter()); // set all views to display:none;. Do that here rather than initializing all views to hidden so that when they are shown, display: flex (or whatever) is maintained

      $('.view').hide();
      $('#' + QWIZM.state.currentView + 'Btn').addClass("active");
      $('#' + QWIZM.state.currentView).fadeIn();
      QWIZM.methods.writeToLocalStorage(QWIZM.QUIZ_KEY, QWIZM.state);
    }

  function loadViews() {
    var len = QWIZM.quiz.questions.length,
        html = ''; // console.log('top of loadViews');
    // console.log(QWIZM.state);

    html += "<section id='instructions' class='view'>\n                ".concat(QWIZM.quiz.instructions, "</section>\n                <section id='clear' class='card view' > ").concat(QWIZM.methods.writeClearView(), "</section>");

    for (var i = 1; i < len; i++) {
      // QWIZM.quiz.questions[i] is a function where i is the question number
      // We need to pass the question number into this function
      html += "<section id='Q".concat(i, "' class='view'>            \n            ").concat(QWIZM.quiz.questions[i](i));
      html += "</section>";
    }

    html += "<section id='summary' class='view'>".concat(QWIZM.summary.display(), "</section>");
    return html;
  }

  function setHandlers() {
    var numberOfQuestions = QWIZM.quiz.questions.length - 1;

    var _loop = function _loop(qNumber) {
      var numberOfParts = QWIZM.state.thisQuiz[qNumber].length - 1;

      var _loop2 = function _loop2(partNumber) {
        var partId = "q".concat(qNumber, "part").concat(partNumber, "btn"); // get the question part that has been clicked on and check input for that part

        $('#' + partId).on('click', function (e) {
          checkAnswer(qNumber, partNumber);
        });
      };

      for (var partNumber = 1; partNumber <= numberOfParts; partNumber++) {
        _loop2(partNumber);
      }
    };

    for (var qNumber = 1; qNumber <= numberOfQuestions; qNumber++) {
      _loop(qNumber);
    }
  } // q is the question number, p is the question part number


  function checkAnswer(q, p) {
    var qp = "q".concat(q, "part").concat(p),
        inputId = "".concat(qp, "input"),
        feedbackId = "".concat(qp, "feedback"),
        crosscheckId = "".concat(qp, "crosscheck"),
        userInput = $('#' + inputId).val(),
        parsedInput = parseFloat(userInput),
        // string to float
    part = QWIZM.state.thisQuiz[q][p],
        feedback = '';
    part.userInput = userInput;
    part.feedback = '';
    part.score = 0;
    part.isAnswered = false;
    part.isCorrect = false;
    part.half = false;

    if (isNaN(parsedInput)) {
      if (userInput.length === 0) {
        feedback = "No input! (0/".concat(part.marks, ")");
      } else {
        feedback = "Not numerical input! (0/".concat(part.marks, ")");
      }

      $('#' + crosscheckId).html('<span class="cross" />');
    } else {
      part.isAnswered = true;

      if (parsedInput == part.correctSoln) {
        // this checks for trailing zeros for significant digits
        if (userInput === part.correctSoln.toString()) {
          part.isCorrect = true;
          feedback = "".concat(part.marks, "/").concat(part.marks);
          $('#' + crosscheckId).html('<span class="check" />');
          part.score = part.marks;
        } else {
          part.half = true;
          feedback = "SigDigs! (".concat(part.marks / 2, "/").concat(part.marks, ")");
          $('#' + crosscheckId).html('');
          part.score = part.marks / 2;
        }
      } else {
        part.isCorrect = false;
        feedback = "Try again. (0/".concat(part.marks, ")");
        $('#' + crosscheckId).html('<span class="cross" />');
      }
    }

    $('#' + feedbackId).text(feedback);
    part.feedback = feedback;
    QWIZM.state.thisQuiz[q][p] = part;
    QWIZM.methods.writeToLocalStorage(QWIZM.QUIZ_KEY, QWIZM.state); //changes made to state so save it
    // $('#summary').html(QWIZM.summary.display());

    console.log('bottom of check answer');
    console.log(QWIZM.state);
    console.log(QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY));
  }
};

QWIZM.methods.questionParts = function (qN) {
  var html = "",
      parts = QWIZM.state.thisQuiz[qN],
      numberOfParts = parts.length;
  parts.unshift('');

  for (var part = 1; part <= numberOfParts; part++) {
    var partId = "q".concat(qN, "part").concat(part, "btn");
    html += "<div class='partStatement'>".concat(parts[part].partStatement, ":</div> ");
    html += "<input type='text' id='q".concat(qN, "part").concat(part, "input' class='partInput'>");
    html += "<div class='units'>".concat(parts[part].units, "</div> ");
    html += "<button id=".concat(partId, " type='button' class='markButton'>Enter</button>");
    html += "<div id='q".concat(qN, "part").concat(part, "crosscheck' class='crosscheck'>&nbsp;</div>");
    html += "<div id='q".concat(qN, "part").concat(part, "feedback' class='feedback'>(").concat(parts[part].marks, " marks)</div>");
  }

  return html;
};

QWIZM.methods.writeToLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};

QWIZM.methods.readFromLocalStorage = function (key) {
  var value = localStorage.getItem(key);
  return value && JSON.parse(value);
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

QWIZM.methods.writeHeader = function (o) {
  return "<header>\n                <h1>".concat(o.subject, "</h1>\n                <div class='rightblock'>\n                    <h3>").concat(o.topic, "</h3>\n                    <h3>").concat(o.subtopic, "</h3>\n                </div>\n            </header>");
};

QWIZM.methods.writeFooter = function () {
  var state = QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY),
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