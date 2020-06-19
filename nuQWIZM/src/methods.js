/** Summary. 
 *  
 *  Functions used by Qwizm and specific to Qwizm
 * 
 *  @author Dave Morgan
 * 
 *  @since 1.0.0
 */

let QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {};

// some constants
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
QWIZM.methods.viewsLoad = o => {
    let quizId = `quiz_${o.id}`;

    // check whether there is a quiz item for this quiz in localStorage
    if (localStorage.getItem(quizId) === null) {
        QWIZM.methods.writeLoginForm();
        $('#uname').focus();
    }
    // if there is a quiz item, load the state of the quiz
    else {
        // User has a login and site is reloading. Get state from localStorage.
        QWIZM.state = QWIZM.methods.readFromLocalStorage(quizId);

        $('main').html(loadViews());
        // set handlers for all the question answer inputs
        setHandlers();

        $('body').append(QWIZM.methods.writeFooter());
        // set all views to display:none;. Do that here rather than initializing all views to hidden so that when they are shown, display: flex (or whatever) is maintained
        $('.view').hide();
        $('#' + QWIZM.state.currentView + 'Btn').addClass("active");
        $('#' + QWIZM.state.currentView).fadeIn();

        QWIZM.methods.writeToLocalStorage(QWIZM.QUIZ_KEY, QWIZM.state);
    }

    /** Nested function inside viewsLoad. Writes the html for page views:
     *  Instructions, Clear, Q1, Q2, ..., Summary
     *  @returns {string} - the html for page views
     */
    function loadViews() {
        let len = QWIZM.quiz.questions.length,
            html = '';

        html += `<section id='instructions' class='view'>
                ${QWIZM.quiz.instructions}</section>
                <section id='clear' class='card view' > ${QWIZM.methods.writeClearView()}</section>`;

        for (let i = 1; i < len; i++) {
            // QWIZM.quiz.questions[i] is a function where i is the question number
            // We need to pass the question number into this function
            html += `<section id='Q${i}' class='view'>            
            ${QWIZM.quiz.questions[i](i)}`;
            html += `</section>`;
        }

        html += `<section id='summary' class='view'>${QWIZM.summary.display()}</section>`;

        return html;
    }

    /** Nested function inside viewsLoad. Sets event handlers for button clicks
     *  for each and every question part
     *  @returns {void}
     */
    function setHandlers() {
        let numberOfQuestions = QWIZM.quiz.questions.length - 1;
        for (let qNumber = 1; qNumber <= numberOfQuestions; qNumber++) {
            let numberOfParts = QWIZM.state.thisQuiz[qNumber].length - 1;
            for (let partNumber = 1; partNumber <= numberOfParts; partNumber++) {
                let partId = `q${qNumber}part${partNumber}btn`;
                // get the question part that has been clicked on and check input for that part
                $('#' + partId).on('click', function (e) {
                    checkAnswer(qNumber, partNumber);
                })
            }

        }
    }

    /** Nested function inside viewsLoad. Marks the specified question part for correctness.
     *  Writes result to QWIZM.state, to the summary view and to localStorage
     *  @param {number} q - The question number in the quiz
     *  @param {number} p - The part number for the question
     *  @returns {void}
     */
    function checkAnswer(q, p) {
        let qp = `q${q}part${p}`,
            inputId = `${qp}input`,
            feedbackId = `${qp}feedback`,
            crosscheckId = `${qp}crosscheck`,
            userInput = $('#' + inputId).val().trim(),
            parsedInput = parseFloat(userInput), // string to float
            part = QWIZM.state.thisQuiz[q][p],
            feedback = '';
        part.score = 0;
        part.isAnswered = false;
        part.isCorrect = false;

        if (isNaN(parsedInput)) {
            if (userInput.length === 0) {
                feedback = `No input! 0/${part.marks}`;
            } else {
                feedback = `Not numerical input! 0/${part.marks}`;
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
                if (userInput === (part.correctSoln).toString()) {
                    part.isCorrect = true;
                    feedback = `${part.marks}/${part.marks}`;
                    $('#' + crosscheckId).html('<span class="check" />');
                    part.score = part.marks;
                } else {
                    part.half = true;
                    part.isCorrect = false;
                    feedback = `Check digits! ${part.marks/2}/${part.marks}`;
                    $('#' + crosscheckId).html(`<span class='qm' />`);
                    part.score = part.marks / 2;
                }
            } else {
                part.isCorrect = false;
                feedback = `Try again. 0/${part.marks}`;
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
QWIZM.methods.questionParts = (qN) => {
    let html = ``,
        numberOfParts = QWIZM.state.thisQuiz[qN].length, // includes the empty first element
        icon,
        score = 0;

    for (let part = 1; part < numberOfParts; part++) {
        let partId = `q${qN}part${part}btn`,
            pt = QWIZM.state.thisQuiz[qN][part],
            feedback = '';

        // part statement
        html += `<div class='partStatement'>${pt.partStatement}:</div> `;
        // user input
        html += `<input type='text' id='q${qN}part${part}input' class='partInput' value=${pt.userInput || ''}>`;
        // units
        html += `<div class='units'>${pt.units}</div> `;
        // 'Enter' button
        html += `<button id=${partId} type='button' class='markButton'>Enter</button>`;
        // feedback icon
        if (pt.isAnswered) {
            if (pt.isCorrect) {
                icon = `<span class='check' />`;
                feedback = `${pt.score}/${pt.marks}`;
            } else if (pt.half) {
                icon = `<span class='qm' />`;
                feedback = `Check Digits! ${pt.score}/${pt.marks}`;
            } else {
                icon = `<span class='cross' />`;
                feedback = `${pt.score}/${pt.marks}`;
            }
        } else {
            icon = '';
            feedback = pt.marks > 1 ? `${pt.marks} marks` : `${pt.marks} mark`
            // feedback = `${pt.marks} marks`;
        }
        html += `<div id='q${qN}part${part}crosscheck' class='crosscheck'>${icon}</div>`;
        // feedback
        html += `<div id='q${qN}part${part}feedback' class='feedback'>${feedback}</div>`;
    }
    return html;
}

/** Encodes a number (or numerical string) to a string of lower case 
 *      alphabetical characters
 *  @param {number} number The number to be encoded
 *  @param {number} number The seed for the random number generator that 'predictably'
 *      generates the offset from the numerical character to the encoded alphabetical character.
 *  @returns {string} An encoded alphabetical string
 */
QWIZM.methods.encode = (number, seed) => {
    let strArray = number.toString(10).split(''),
        length = strArray.length,
        lcrng = new utils.LCRNG(seed),
        encodedStr = '';

    for (let i = 0; i < length; i++) {
        encodedStr += String.fromCharCode(strArray[i].charCodeAt(0) + lcrng.getNext(52, 65));
    }

    return encodedStr;
}

/** Decodes a previously encoded string of alphabetical characters to a string 
 *      representing the initial number that was encoded
 *  @param {string} str - The alphabetical string to be decoded
 *  @param {number} number The seed for the random number generator that 'predictably'
 *      generates the offset to reverse the operations performed by encode previously.
 *  @returns {string} A decoded string of numerical character (including - and .)
 */
QWIZM.methods.decode = (str, seed) => {
    let strArray = str.split(''),
        length = strArray.length,
        lcrng = new utils.LCRNG(seed),
        decodedStr = '';

    for (let i = 0; i < length; i++) {
        decodedStr += String.fromCharCode(strArray[i].charCodeAt(0) - lcrng.getNext(52, 65));
    }

    return codedStr;
}

/** Writes a value to local storage
 *  @param {string} key - The identifier for storage location
 *  @param {string} value - The value to be stored
 *  @returns {void}
 */
QWIZM.methods.writeToLocalStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

/** Retrieves a value from local storage
 *  @param {string} key The identifier for storage location
 *  @returns {string} The value retrieved
 */
QWIZM.methods.readFromLocalStorage = (key) => {
    let value = localStorage.getItem(key);
    return value && JSON.parse(value);
};

/** Writes a string to a specified position and rotation in an image div
 *  @param {object} o - Object containing fields for the string, its position and 
 *      rotation, its fontsize (in vw units) and its background color
 *  @returns {string} A string of html including CSS styling for position, etc.
 */
QWIZM.methods.overlayVariable = (o) => {
    let input = o.input,
        left = o.left,
        pad = o.padding || 0.15,
        top = o.top,
        rot = o.rot || 0, // degrees, measured counterclockwise from positive x-axis
        fs = o.fontSize || 1.4, // units are in vw (view widths)
        fw = o.fontWeight || 'normal',
        color = o.color || 'black',
        bg = o.background || 'white'; // default value is 'white', use 'inherit' or 'transparent' or 'none' for no background

    return `<div class='label' style="  
        top: ${top}%; 
        left: ${left}%;
        color: ${color};
        padding: ${pad}vw;
        background-color:${bg};        
        font-size: ${fs}vw;
        font-weight: ${fw};
        transform: translate(-50%, -50%) rotate(${-rot}deg); ">
        ${input}
        </div>`;
}

/** Writes a number to a string with the specified number of significant digits. 
 *      If specified in the quiz, the significant digits will be incremented by 1 if
 *      the leading non-zero digit is a 1
 *  @param {number} number The number to be stringified
 *  @param {number}[sigDigs] Specified number of significant digits
 *  @returns {string} Stringified version of number
 */
QWIZM.methods.stringify = (number, sigDigs = QWIZM.quiz.sigDigs) => {

    let delta = QWIZM.DELTA,
        pre = '',
        temp = number + ''; //stringify

    if (QWIZM.quiz.extraDigitForLeadingOne) {
        //save 0, . and - from the front of the string before checking for leading 1 and extra sigDig
        while (temp.charAt(0) === '0' || temp.charAt(0) === '.' || temp.charAt(0) === '-' || temp.charAt(0) === '+') {
            pre += temp.charAt(0);
            temp = temp.slice(1);
        }

        if (temp.charAt(0) === '1') { //if number begins with 1, increase the number of sig digs (generally from 3 to 4)
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
QWIZM.methods.toSigDigs = (number, workingDigs = QWIZM.quiz.workingDigs) => {
    return Number(QWIZM.methods.stringify(number, workingDigs = QWIZM.quiz.workingDigs));
}

/** Writes page header
 *  @param {object} o - The object containing name name, topic and sub-topic
 *  @returns {string} html string for page header
 */
QWIZM.methods.writeHeader = o => {
    return `<header>
                <h1>${o.subject}</h1>
                <div class='rightblock'>
                    <h3>${o.topic}</h3>
                    <h3>${o.subtopic}</h3>
                </div>
            </header>`;
};

/** Writes page footer, retrieving state from localStorage
 *  @returns {string} html string for page header
 */
QWIZM.methods.writeFooter = () => {
    let state = QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY),
        // number of questions in this quiz
        len = QWIZM.quiz.questions.length,
        html = `<footer>
                <nav class='navbar'>
                    <ul class='nav-links'>
                        <li class = "nav-item" id="instructionsBtn" > Instructions </li>
                        <li class = "nav-item" id="clearBtn" > Clear </li>`;

    for (let i = 1; i < len; i++) {
        html += `<li class="nav-item" id="Q${i}Btn">Q${i}</li>`;
    }

    return html + `<li class = "nav-item" id="summaryBtn">Summary </li>
                </ul>                                          
                <div class='uname'>${state.uname}</div>                     
            </nav>                     
        </footer>`;
};

/** Writes clear view which provides the option to clear localStorage and 
 *      return to the login view
 *  @returns {string} html string for clear view
 */
QWIZM.methods.writeClearView = () => {
    let html = `<h2>Warning!</h2>
                <p> Clicking the <span class = "highlight"> Clear Quiz </span> button below will reset the quiz, requiring you to log in again.</p >
                <p><span class="highlight"> All your input answers, currently stored in the browser, will be lost!</span></p>
                <p> Only click the <span class = "highlight"> Clear Quiz </span> button below if this is really what you intend.</p >
                <p>(Generally, the only reason to clear the quiz from the browser is if you plan to enter a fictitious ID to practise the quiz with a different set of question values.)</p>
                <button id="clear-button" type="submit">Clear Quiz</button>`;
    return html;
}
/** Writes login page
 *  @returns {string} html string for login page
 */
QWIZM.methods.writeLoginForm = () => {
    $('main').append(`<div id="login" class="card view">
            <h2> Please Log In </h2>
            <form>
            <ul class = "login-list">
                <li>
                    <label for="uname">Username:</label>
                    <input type="text" id="uname" autocomplete="off" placeholder="Alphabetical characters only, e.g. johnSmith" />
                </li> 
                <li id="unameError"></li>
                <li>
                    <label for="uId">ID number:</label>
                    <input type = "text" id = "uId" autocomplete="off" placeholder = "Numerical characters only, e.g. 402235" />
                </li> 
                <li id = "uIdError"></li>
                <li><button id="login-button" type="submit">Submit</button></li>
            </ul>
            </form>
        </div>`);
};