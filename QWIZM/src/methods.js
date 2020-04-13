let QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {};

// some constants
QWIZM.DURATION = 400;
QWIZM.NEGATIVE = -42;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;
QWIZM.DELTA = 1e-9;

// QWIZM.methods = function () {} // function constructor, doesn't need anything in it

QWIZM.methods.questionPart = (o) => {
    return {
        partStatement: o.partStatement,
        units: o.units,
        marks: o.marks,
        correctSoln: o.correctSoln
    };
}

QWIZM.methods.viewsLoad = o => {
    let quizId = `quiz_${o.id}`;

    // check whether there is a quiz item for this quiz in localStorage
    if (localStorage.getItem(quizId) === null) {
        QWIZM.methods.writeLoginForm();
        $('#uname').focus();
    }
    // if there is a quiz item, load the state of the quiz
    else {
        // get state from local storage
        QWIZM.state = QWIZM.methods.readState(quizId);

        $('main').html(loadViews());
        // set handlers for all the question answer inputs
        setHandlers();

        $('body').append(QWIZM.methods.writeFooter());
        // set all views to display:none;. Do that here rather than initializing all views to hidden so that when they are shown, display: flex (or whatever) is maintained
        $('.view').hide();
        $('#' + QWIZM.state.currentView + 'Btn').addClass("active");
        $('#' + QWIZM.state.currentView).fadeIn();
    }

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

            // console.log(QWIZM.quiz.questions[i](i));
        }

        html += `<section id='summary' class='view'>${QWIZM.summary.display()}</section>`;
        return html;
    }

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

    // q is the question number, p is the question part number
    function checkAnswer(q, p) {
        let qp = `q${q}part${p}`,
            inputId = `${qp}input`,
            feedbackId = `${qp}feedback`,
            crosscheckId = `${qp}crosscheck`,
            userInput = $('#' + inputId).val(),
            parsedInput = parseFloat(userInput), // string to float
            part = QWIZM.state.thisQuiz[q][p],
            feedback = '',
            str = QWIZM.methods.stringify;

        part.userInput = userInput;
        part.feedback = '';
        part.score = 0;

        // console.log(userInput + ' ?=? ' + part.correctSoln);

        if (isNaN(parsedInput)) {
            if (userInput.length === 0) {
                feedback = `No input! (0/${part.marks})`;
            } else {
                feedback = `Not numerical input! (0/${part.marks})`;
            }
            $('#' + crosscheckId).html('<span class="cross" />');
        } else if (parsedInput == part.correctSoln) {
            // this checks for trailing zeros for significant digits
            if (userInput === (part.correctSoln).toString()) {
                part.isCorrect = true;
                feedback = `${part.marks}/${part.marks}`;
                $('#' + crosscheckId).html('<span class="check" />');
            } else {
                part.isCorrect = true;
                feedback = `Check significant digits. (${part.marks/2}/${part.marks})`;
                $('#' + crosscheckId).html('');
            }
        } else {
            part.isCorrect = false;
            feedback = `Try again. (0/${part.marks})`;
            $('#' + crosscheckId).html('<span class="cross" />');
        }
        $('#' + feedbackId).text(feedback);

        // console.log(parsedInput);
        console.log(QWIZM.state);
        // console.log(QWIZM.state.thisQuiz[q][p].feedback);
        //  QWIZM.methods.writeState(QWIZM.QUIZ_KEY, QWIZM.state);

    }
};

QWIZM.methods.questionParts = (qN) => {
    let html = ``,
        parts = QWIZM.state.thisQuiz[qN],
        numberOfParts = parts.length;
    parts.unshift('');
    for (let part = 1; part <= numberOfParts; part++) {
        let partId = `q${qN}part${part}btn`
        html += `<div class='partStatement'>${parts[part].partStatement}:</div> `;
        html += `<input type='text' id='q${qN}part${part}input' class='partInput'>`;
        html += `<div class='units'>${parts[part].units}</div> `;
        html += `<button id=${partId} type='button' class='markButton'>Enter</button>`;
        // html += i % 2 === 0 ? "<span class='cross' />" : "<span class='check' />";
        html += `<div id='q${qN}part${part}crosscheck' class='crosscheck'>&nbsp;</div>`;
        html += `<div id='q${qN}part${part}feedback' class='feedback'>(${parts[part].marks} marks)</div>`;
    }
    return html;
}

QWIZM.methods.writeState = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
};

QWIZM.methods.readState = (key) => {
    return JSON.parse(localStorage.getItem(key));
};

QWIZM.methods.overlayVariable = (o) => {
    let input = o.input,
        left = o.left,
        top = o.top,
        rot = o.rot || 0, // degrees, measured counterclockwise from positive x-axis
        fs = o.fontSize || 1.5, // units are in vw (view widths)
        bg = o.background || 'white'; // default value is 'white', use 'inherit' or 'none' for no background

    return `<div class='label' style="        
        top: ${top}%; 
        left: ${left}%;
        background-color:${bg};        
        font-size: ${fs}vw;
        transform: translate(-50%, -50%) rotate(${-rot}deg); ">
        ${input}
        </div>`;
}





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

QWIZM.methods.toSigDigs = (number, workingDigs = QWIZM.quiz.workingDigs) => {
    return Number(QWIZM.methods.stringify(number, workingDigs = QWIZM.quiz.workingDigs));
}

QWIZM.methods.writeHeader = o => {
    return `<header>
                <h1>${o.subject}</h1>
                <div class='rightblock'>
                    <h3>${o.topic}</h3>
                    <h3>${o.subtopic}</h3>
                </div>
            </header>`;
};

QWIZM.methods.writeFooter = () => {
    let state = QWIZM.methods.readState(QWIZM.QUIZ_KEY),
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

QWIZM.methods.writeClearView = () => {
    let html = `<h2>Warning!</h2>
                <p> Clicking the <span class = "highlight"> Clear Quiz </span> button below will reset the quiz, requiring you to log in again.</p >
                <p><span class="highlight"> All your input answers, currently stored in the browser, will be lost!</span></p>
                <p> Only click the <span class = "highlight"> Clear Quiz </span> button below if this is really what you intend.</p >
                <p>(Generally, the only reason to clear the quiz from the browser is if you plan to enter a fictitious ID to practise the quiz with a different set of question values.)</p>
                <button id="clear-button" type="submit">Clear Quiz</button>`;
    return html;
}

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