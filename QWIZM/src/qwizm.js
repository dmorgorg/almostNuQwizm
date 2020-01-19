let QWIZM = QWIZM || {};
QWIZM.methods = QWIZM.methods || {};


// some constants
QWIZM.DURATION = 400;
QWIZM.NEGATIVE = -42;
QWIZM.QUIZ_KEY = "quiz_" + QWIZM.quiz.id;

QWIZM.methods = function () {} // function constructor, doesn't need anything in it

QWIZM.state = {} // an object to hold everything

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
    let o = QWIZM.methods.readStorage(QWIZM.QUIZ_KEY),
        len = QWIZM.quiz.questions.length,
        html = `<footer>
                <nav class='navbar'>
                    <ul class='nav-links'>
                        <li class = "nav-item active" id="instructionsBtn" > Instructions </li>
                        <li class = "nav-item" id="clearBtn" > Clear </li>`;

    for (let i = 1; i < len; i++) {
        html += `<li class="nav-item" id="Q${i}Btn">Q${i}</li>`;
    }

    return html + `<li class = "nav-item" id="summaryBtn">Summary </li>
                </ul>                                          
                <div class='uname'>${o.uname}</div>                     
            </nav>                     
        </footer>`;
};

QWIZM.methods.pageLoad = o => {
    let quizId = `quiz_${o.id}`;
    // check whether there is a quiz item for this quiz in localStorage
    if (localStorage.getItem(quizId) === null) {
        QWIZM.methods.writeLoginForm();
    }
    // if there is a quiz item, load the state of the quiz
    else {
        QWIZM.state = QWIZM.methods.readStorage(quizId);
        $('body').append(QWIZM.methods.writeFooter());
        $('main').text("text");
        $('main').html(QWIZM.methods.loadQuestions());

    }
};

QWIZM.methods.loadQuestions = () => {
    let len = QWIZM.quiz.questions.length,
        html = '';

    for (let i = 1; i < len; i++) {
        // console.log('test: ' + QWIZM.quiz.questions[i - 1].statement)
        html += `<div id='Q${i}' class='question'>
            ${QWIZM.quiz.questions[i].statement}</div>\n`;
    }

    return html;
}

QWIZM.methods.displayPage = e => {
    let id = e.target.id;
    $('#' + id).addClass("active");
    // $('"li#' + e.target.id + '"').addClass("active");
    console.log(e.target.id);
}

QWIZM.methods.writeLoginForm = () => {
    $('main').append(`<div class = "login-card">
            <h2> Please Log In </h2>
            <form>
            <ul class = "login-list">
                <li>
                    <label for="uname">Username</label>
                    <input type="text" id="uname" autocomplete="off" placeholder="Alphabetical characters only, e.g. JohnSmith" />
                </li> 
                <li id="unameError"></li>
                <li>
                    <label for="uId">ID number</label>
                    <input type = "text" id = "uId" autocomplete="off" placeholder = "Numerical characters only, e.g. 402235" />
                </li> 
                <li id = "uIdError"></li>
                <li><button id="login-button" type="submit">Submit</button></li>
            </ul>
            </form>
        </div>`);
};

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
        // writeStorage early enough that it is complete before pageLoad()
        QWIZM.methods.writeStorage(QWIZM.QUIZ_KEY, QWIZM.state);
        $('.login-card').fadeOut(QWIZM.DURATION);
        QWIZM.methods.pageLoad(QWIZM.quiz);
    }
}

QWIZM.methods.writeStorage = (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
}

QWIZM.methods.readStorage = (key) => {
    return JSON.parse(localStorage.getItem(key));
}