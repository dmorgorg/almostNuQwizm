"use strict";

/** Summary. 
 *  
 *  Functions used by Qwizm and specific to Qwizm
 * 
 *  @author Dave Morgan
 * 
 *  @since 1.0.0
 */
var QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {}; // some constants

QWIZM.DURATION = 400;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;
QWIZM.DELTA = 1e-9;
/** Checks whether user has visited the site previously by looking for a quiz id 
 *      in localStorage. If no id exists, user goes to a log in view. If id exists, 
 *      question views are loaded and hidden. The last view from previous visit is visible   
 *  @param {obj} o A state object containing quizId, userId, currentView, and an
 *      array containing questions and submitted answers 
 *  @returns {void}
 */

QWIZM.methods.viewsLoad = function (o) {
  var quizId = "quiz_".concat(o.id); // check whether there is a quiz item for this quiz in localStorage

  if (localStorage.getItem(quizId) === null) {
    QWIZM.methods.writeLoginForm();
    $('#uname').focus();
  } // if there is a quiz item, load the state of the quiz
  else {
      // User has a login and site is reloading. Get state from localStorage.
      QWIZM.state = QWIZM.methods.readFromLocalStorage(quizId);
      $('main').html(loadViews()); // set handlers for all the question answer inputs

      setHandlers();
      $('body').append(QWIZM.methods.writeFooter()); // set all views to display:none;. Do that here rather than initializing all views to hidden so that when they are shown, display: flex (or whatever) is maintained

      $('article').hide();
      $('#' + QWIZM.state.currentView + 'Btn').addClass("active");
      $('#' + QWIZM.state.currentView).fadeIn();
      QWIZM.methods.writeToLocalStorage(QWIZM.QUIZ_KEY, QWIZM.state);
    }
  /** Nested function inside viewsLoad. Writes the html for page views:
   *  Instructions, Clear, Q1, Q2, ..., Summary
   *  @returns {string} - the html for page views
   */


  function loadViews() {
    var len = QWIZM.quiz.questions.length,
        html = '';
    html += "<article id='instructions' >\n                ".concat(QWIZM.quiz.instructions, "</article>\n                <article id='clear' class='card view' > ").concat(QWIZM.methods.writeClearView(), "</article>");

    for (var i = 1; i < len; i++) {
      // QWIZM.quiz.questions[i] is a function where i is the question number
      // We need to pass the question number into this function
      html += "<article id='Q".concat(i, "' >            \n            ").concat(QWIZM.quiz.questions[i](i));
      html += "</article>";
    }

    html += "<article id='summary' >".concat(QWIZM.summary.display(), "</article>");
    return html;
  }
  /** Nested function inside viewsLoad. Sets event handlers for button clicks
   *  for each and every question part
   *  @returns {void}
   */


  function setHandlers() {
    var numberOfQuestions = QWIZM.quiz.questions.length - 1;

    var _loop = function _loop(qNumber) {
      var numberOfParts = QWIZM.state.thisQuiz[qNumber].length - 1;

      var _loop2 = function _loop2(partNumber) {
        var partId = "q".concat(qNumber, "part").concat(partNumber, "btn"); // get the question part that has been clicked on and check input for that part

        $('#' + partId).on('click', function (e) {
          e.preventDefault();
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
  }
  /** Nested function inside viewsLoad. Marks the specified question part for correctness.
   *  Writes result to QWIZM.state, to the summary view and to localStorage
   *  @param {number} q - The question number in the quiz
   *  @param {number} p - The part number for the question
   *  @returns {void}
   */


  function checkAnswer(q, p) {
    var qp = "q".concat(q, "part").concat(p),
        inputId = "".concat(qp, "input"),
        feedbackId = "".concat(qp, "feedback"),
        crosscheckId = "".concat(qp, "crosscheck"),
        userInput = $('#' + inputId).val().trim(),
        parsedInput = parseFloat(userInput),
        // string to float
    part = QWIZM.state.thisQuiz[q][p],
        feedback = '';
    part.score = 0;
    part.isAnswered = false;
    part.isCorrect = false;

    if (isNaN(parsedInput)) {
      if (userInput.length === 0) {
        feedback = "No input! 0/".concat(part.marks);
      } else {
        feedback = "Not numerical input! 0/".concat(part.marks);
      }

      $('#' + crosscheckId).html('<span class="cross" />');
      part.isAnswered = false;
      part.isCorrect = false;
      part.half = false;
      part.score = 0;
      userInput = '';
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
          part.isCorrect = false;
          feedback = "Check digits! ".concat(part.marks / 2, "/").concat(part.marks);
          $('#' + crosscheckId).html("<span class='qm' />");
          part.score = part.marks / 2;
        }
      } else {
        part.isCorrect = false;
        feedback = "Try again. 0/".concat(part.marks);
        $('#' + crosscheckId).html('<span class="cross" />');
        part.score = 0;
        part.half = false;
      }
    }

    $('#' + feedbackId).text(feedback);
    part.feedback = feedback;
    part.userInput = userInput;
    QWIZM.state.thisQuiz[q][p] = part;
    QWIZM.methods.writeToLocalStorage(QWIZM.QUIZ_KEY, QWIZM.state); //changes made to state so save it

    $('#summary').html(QWIZM.summary.display());
  }
};
/** Writes the html for the question parts
 *  @param {number} qN - The question number
 *  @returns {string} the html for page views
 */


QWIZM.methods.questionParts = function (qN) {
  var html = "",
      numberOfParts = QWIZM.state.thisQuiz[qN].length,
      // includes the empty first element
  icon,
      score = 0;

  for (var part = 1; part < numberOfParts; part++) {
    var partId = "q".concat(qN, "part").concat(part, "btn"),
        pt = QWIZM.state.thisQuiz[qN][part],
        feedback = ''; // part statement

    html += "<form autocomplete=\"off\"><div class='partStatement'>".concat(pt.partStatement, ":</div> "); // user input

    html += "<input type='text' id='q".concat(qN, "part").concat(part, "input' class='partInput' value=").concat(pt.userInput || '', ">"); // units

    html += "<div class='units'>".concat(pt.units, "</div> "); // 'Enter' button

    html += "<button id=".concat(partId, " type='submit' class='markButton'>Enter</button>"); // feedback icon

    if (pt.isAnswered) {
      if (pt.isCorrect) {
        icon = "<span class='check' />";
        feedback = "".concat(pt.score, "/").concat(pt.marks);
      } else if (pt.half) {
        icon = "<span class='qm' />";
        feedback = "Check Digits! ".concat(pt.score, "/").concat(pt.marks);
      } else {
        icon = "<span class='cross' />";
        feedback = "".concat(pt.score, "/").concat(pt.marks);
      }
    } else {
      icon = '';
      feedback = pt.marks > 1 ? "".concat(pt.marks, " marks") : "".concat(pt.marks, " mark"); // feedback = `${pt.marks} marks`;
    }

    html += "<div id='q".concat(qN, "part").concat(part, "crosscheck' class='crosscheck'>").concat(icon, "</div>"); // feedback

    html += "<div id='q".concat(qN, "part").concat(part, "feedback' class='feedback'>").concat(feedback, "</div></form>");
  }

  return html;
};
/** Encodes a number (or numerical string) to a string of lower case alphabetical characters
 *  @param {number} number The number to be encoded
 *  @param {number} number The seed for the random number generator that 'predictably'
 *      generates the offset from the numerical character to the encoded alphabetical character.
 *  @returns {string} An encoded alphabetical string
 */


QWIZM.methods.encode = function (number, seed) {
  var strArray = number.toString(10).split(''),
      length = strArray.length,
      lcrng = new utils.LCRNG(seed),
      encodedStr = '';

  for (var i = 0; i < length; i++) {
    encodedStr += String.fromCharCode(strArray[i].charCodeAt(0) + lcrng.getNext(52, 65));
  }

  return encodedStr;
};
/** Decodes a previously encoded string of alphabetical characters to a string 
 *      representing the initial number that was encoded
 *  @param {string} str - The alphabetical string to be decoded
 *  @param {number} number The seed for the random number generator that 'predictably'
 *      generates the offset to reverse the operations performed by encode previously.
 *  @returns {string} A decoded string of numerical character (including - and .)
 */


QWIZM.methods.decode = function (str, seed) {
  var strArray = str.split(''),
      length = strArray.length,
      lcrng = new utils.LCRNG(seed),
      decodedStr = '';

  for (var i = 0; i < length; i++) {
    decodedStr += String.fromCharCode(strArray[i].charCodeAt(0) - lcrng.getNext(52, 65));
  }

  return codedStr;
};
/** Writes a value to local storage
 *  @param {string} key - The identifier for storage location
 *  @param {string} value - The value to be stored
 *  @returns {void}
 */


QWIZM.methods.writeToLocalStorage = function (key, value) {
  localStorage.setItem(key, JSON.stringify(value));
};
/** Retrieves a value from local storage
 *  @param {string} key The identifier for storage location
 *  @returns {string} The value retrieved
 */


QWIZM.methods.readFromLocalStorage = function (key) {
  var value = localStorage.getItem(key);
  return value && JSON.parse(value);
};
/** Writes a string to a specified position and rotation in an image div
 *  @param {object} o - Object containing fields for the string, its position and 
 *      rotation, its fontsize (in vw units) and its background color
 *  @returns {string} A string of html including CSS styling for position, etc.
 */


QWIZM.methods.overlayVariable = function (o) {
  var input = o.input,
      left = o.left,
      top = o.top,
      rot = o.rot || o.rotate || 0,
      // degrees, measured counterclockwise from positive x-axis
  fs = o.fs || o.fontSize || '100%',
      // units are in % of rem, default is no change from surrounding text
  fw = o.fontWeight || o.fw || 'normal',
      pad = o.pad == 0 ? 0.001 : o.pad || o.padding == 0 ? 0.001 : o.padding || 0.15,
      //because if 0 is passed, it is falsy and the default of 0.15 is returned.
  color = o.color || 'black',
      bg = o.background || o.bg || 'white'; // default value is 'white', use 'inherit' or 'transparent' or 'none' for no background

  return "<div class='label' style=\" \n        top: ".concat(top, "%; \n        left: ").concat(left, "%;\n        color: ").concat(color, ";\n        padding: ").concat(pad, "vw;\n        background-color:").concat(bg, ";        \n        font-size: ").concat(fs, "%;\n        font-weight: ").concat(fw, ";\n        line-height: 1;\n        transform: translate(-50%, -50%) rotate(").concat(-rot, "deg); \">\n        ").concat(input, "\n        </div>");
};

QWIZM.getInputOverlays = function (arr) {
  var output = "",
      len = arr.length;

  for (var index = 0; index < len; index++) {
    output += QWIZM.methods.overlayVariable(arr[index]);
  } //console.log(output);


  return output;
};
/** Writes a number to a string with the specified number of significant digits. 
 *      If specified in the quiz, the significant digits will be incremented by 1 if
 *      the leading non-zero digit is a 1
 *  @param {number} number The number to be stringified
 *  @param {number}[sigDigs] Specified number of significant digits
 *  @returns {string} Stringified version of number
 */


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
/** Writes a number to a string with the specified number of significant digits. 
 *      If specified in the quiz, the significant digits will be incremented by 1 if
 *      the leading non-zero digit is a 1
 *  @param {number} number The number to be modified
 *  @param {number}[workingDigs] Specified number of significant digits
 *  @returns {number} Number adjusted to the specified number of significant digits
 */


QWIZM.methods.toSigDigs = function (number) {
  var workingDigs = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : QWIZM.quiz.workingDigs;
  return Number(QWIZM.methods.stringify(number, workingDigs = QWIZM.quiz.workingDigs));
};
/** Writes page header
 *  @param {object} o - The object containing name name, topic and sub-topic
 *  @returns {string} html string for page header
 */


QWIZM.methods.writeHeader = function (o) {
  return "<header>\n                <h1>".concat(o.subject, "</h1>\n                <div class='rightblock'>\n                    <h3>").concat(o.topic, "</h3>\n                    <h3>").concat(o.subtopic, "</h3>\n                </div>\n            </header>");
};
/** Writes page footer, retrieving state from localStorage
 *  @returns {string} html string for page header
 */


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
/** Writes clear view which provides the option to clear localStorage and 
 *      return to the login view
 *  @returns {string} html string for clear view
 */


QWIZM.methods.writeClearView = function () {
  var html = "<h2>Warning!</h2>\n                <p> Clicking the <span class = \"highlight\"> Clear Quiz </span> button below will reset the quiz, requiring you to log in again.</p >\n                <p><span class=\"highlight\"> All your input answers, currently stored in the browser, will be lost!</span></p>\n                <p> Only click the <span class = \"highlight\"> Clear Quiz </span> button below if this is really what you intend.</p >\n                <p>(Generally, the only reason to clear the quiz from the browser is if you plan to enter a fictitious ID to practise the quiz with a different set of question values.)</p>\n                <button id=\"clear-button\" type=\"submit\">Clear Quiz</button>";
  return html;
};
/** Writes login page
 *  @returns {string} html string for login page
 */


QWIZM.methods.writeLoginForm = function () {
  $('main').append("<div id=\"login\" class=\"card view\">\n            <h2> Please Log In </h2>\n            <form>\n            <ul class = \"login-list\">\n                <li>\n                    <label for=\"uname\">Username:</label>\n                    <input type=\"text\" id=\"uname\" autocomplete=\"off\" placeholder=\"Alphabetical characters only, e.g. johnSmith\" />\n                </li> \n                <li id=\"unameError\"></li>\n                <li>\n                    <label for=\"uId\">ID number:</label>\n                    <input type = \"text\" id = \"uId\" autocomplete=\"off\" placeholder = \"Numerical characters only, e.g. 402235\" />\n                </li> \n                <li id = \"uIdError\"></li>\n                <li><button id=\"login-button\" type=\"submit\">Submit</button></li>\n            </ul>\n            </form>\n        </div>");
};