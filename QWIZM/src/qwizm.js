let QWIZM = QWIZM || {},
    state;

QWIZM.methods = QWIZM.methods || {};
QWIZM.state = {} // an object to hold everything that goes in localStorage



// some constants
QWIZM.DURATION = 400;
QWIZM.NEGATIVE = -42;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;

QWIZM.methods = function () {} // function constructor, doesn't need anything in it

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
        console.log('on reload: ' + QWIZM.state.currentView);

        $('main').html(QWIZM.methods.loadViews());

        $('body').append(QWIZM.methods.writeFooter());
        // set all views to display:none;. Do that here rather than initializing all views to hidden so that when they are shown, display: flex (or whatever) is maintained
        $('.view').hide();
        // don't know why instructions btn remains highlighted on refresh....
        // $('#instructionsBtn').removeClass("active");
        $('#' + QWIZM.state.currentView + 'Btn').addClass("active");
        $('#' + QWIZM.state.currentView).fadeIn();
    }

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



QWIZM.methods.loadViews = () => {
    let len = QWIZM.quiz.questions.length,
        html = '';

    html += `<div id='instructions' class='view' >${QWIZM.quiz.instructions}</div>
            <div id='clear' class='card view' > ${QWIZM.methods.writeClearView()}</div>`;

    for (let i = 1; i < len; i++) {
        html += `<div id='Q${i}' class='view'>
            ${QWIZM.quiz.questions[i].statement}</div>\n`;
    }

    html += `<div id='summary' class='view'>Summary</div>`;

    return html;
}

// event handler for navigation button click
QWIZM.methods.updateView = e => {
    // get the button just clicked
    let btnId = e.target.id;
    // if the view corresponding to the click is not currently visible...
    if (QWIZM.state.currentView + 'Btn' !== btnId) {
        // remove .active from previous view
        $('#' + QWIZM.state.currentView + 'Btn').removeClass("active");

        $('#' + QWIZM.state.currentView).hide();
        // set new view in the state
        QWIZM.state.currentView = btnId.replace('Btn', '');
        // show that the newly clicked button is active
        $('#' + btnId).addClass("active");
        //console.log(QWIZM.state.currentView);
        $('#' + QWIZM.state.currentView).fadeIn(QWIZM.DURATION);
        QWIZM.methods.writeState(QWIZM.QUIZ_KEY, QWIZM.state);
    }

    console.log(QWIZM.state.currentView);
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

QWIZM.methods.writeClearView = () => {
    let html = `<h2>Warning!</h2>
                <p> Clicking the <span class = "highlight"> Clear Quiz </span> button below will reset the quiz, requiring you to log in again.</p >
                <p><span class="highlight"> All your input answers, currently stored in the browser, will be lost!</span></p>
                <p> Only click the <span class = "highlight"> Clear Quiz </span> button if this is really what you intend.</p >
                <p>(Generally, the only reason to clear the quiz from the browser is if you plan to enter a fictitious ID to practise the quiz with a different set of question values.)</p>
                <button id="clear-button" type="submit">Clear Quiz</button>`;
    return html;
}

// event handler for clicking the login submit button
QWIZM.methods.validateLogin = (e) => {
    e.preventDefault();
    let uname = $('#uname')[0].value,
        uId = $('#uId')[0].value,
        valid = false;

    // convert uId to positive integer, if it exists
    uId = uId.length > 0 ? parseInt(uId) : QWIZM.NEGATIVE;

    // reset error messages to empty string by default; don't persist messages from a previous submit
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
        QWIZM.state.uId = uId;
        QWIZM.state.currentView = 'instructions';

        // writeState early enough that it is complete before viewsLoad()
        QWIZM.methods.writeState(QWIZM.QUIZ_KEY, QWIZM.state);
        $('#login-card').fadeOut();
        QWIZM.methods.viewsLoad(QWIZM.quiz);
    }
}

QWIZM.methods.reset = () => {
    $('#clear').fadeOut();
    localStorage.removeItem(QWIZM.QUIZ_KEY);
    window.location.reload();
}

QWIZM.methods.writeState = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

QWIZM.methods.readState = (key) => {
    return JSON.parse(localStorage.getItem(key));
}