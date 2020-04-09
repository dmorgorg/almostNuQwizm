let QWIZM = QWIZM || {};
// QWIZM.state = QWIZM.state || {}; // an object to hold everything that goes in localStorage
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
        // long: o.long,
        correctSoln: o.correctSoln,
        // userSoln: o.userSoln,
        isAnswered: false,
        isCorrect: false
    };
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



QWIZM.methods.viewsLoad = o => {
    let quizId = `quiz_${o.id}`;

    // check whether there is a quiz item for this quiz in localStorage
    if (localStorage.getItem(quizId) === null) {
        QWIZM.methods.writeLoginForm();
        $('#uname').focus();
    }
    // if there is a quiz item, load the state of the quiz
    else {

        QWIZM.state = QWIZM.methods.readState(quizId);

        $('main').html(loadViews());

        $('body').append(QWIZM.methods.writeFooter());
        // set all views to display:none;. Do that here rather than initializing all views to hidden so that when they are shown, display: flex (or whatever) is maintained
        $('.view').hide();
        $('#' + QWIZM.state.currentView + 'Btn').addClass("active");
        $('#' + QWIZM.state.currentView).fadeIn();
    }

    function loadViews() {
        let len = QWIZM.quiz.questions.length,
            html = '';

        html += `<div id='instructions' class='view'>
                <div class="statement width70 taleft">${QWIZM.quiz.instructions}</div></div>
                <div id='clear' class='card view' > ${QWIZM.methods.writeClearView()}</div>`;

        for (let i = 1; i < len; i++) {
            html += `<div id='Q${i}' class='view'>
            ${QWIZM.quiz.questions[i](i)}`;
            // html += questionParts(i);
            html += `</div>`;
        }

        html += `<div id='summary' class='view'>Summary</div>`;

        return html;
    }
};

QWIZM.methods.questionParts = (qNumber) => {
    let html = ``;
    if (QWIZM.state.thisQuiz[qNumber]) {
        let parts = QWIZM.state.thisQuiz[qNumber],
            numberOfParts = parts.length;
        console.log('number of parts ' + parts.length);
        for (let i = 0; i < numberOfParts; i++) {
            html += `<div class='partStatement'>${parts[i].partStatement}:</div> `;
            html += `<input type='text' id='question${qNumber}part${i+1}' class='partInput'>`;
            html += `<span class='units'>${parts[i].units}</span> `;
            html += `<button id='${qNumber}part${i+1}btn type='button' class='markButton'>Enter</button>`;
            html += i % 2 === 0 ? "<span class='cross' />" : "<span class='check' />";
            html += `<span class='marks'>(${parts[i].marks} marks)</span>`;
            //html += `<span class='feedback'> ${parts[i].correctSoln}</span>`;
        }
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