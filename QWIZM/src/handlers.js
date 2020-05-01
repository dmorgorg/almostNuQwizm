let QWIZM = QWIZM || {};
QWIZM.handlers = QWIZM.handlers || {};

// event handler for navigation button click
QWIZM.handlers.updateView = e => {
    // get the button just clicked
    let btnId = e.target.id;

    console.log('update view');
    console.log(QWIZM.state);
    console.log(QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY));

    QWIZM.state = QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY);

    // if the view corresponding to the click is not currently visible...
    if (QWIZM.state.currentView + 'Btn' !== btnId) {
        // remove .active from previous view
        $('#' + QWIZM.state.currentView + 'Btn').removeClass("active");
        $('#' + QWIZM.state.currentView).hide();
        // set new view in the state
        QWIZM.state.currentView = btnId.replace('Btn', '');
        // show that the newly clicked button is active
        $('#' + btnId).addClass("active");
        $('#' + QWIZM.state.currentView).fadeIn(QWIZM.DURATION);
        QWIZM.methods.writeToLocalStorage(QWIZM.QUIZ_KEY, QWIZM.state);
    }
};

QWIZM.handlers.reset = () => {
    $('#clear').fadeOut();
    localStorage.removeItem(QWIZM.QUIZ_KEY);
    window.location.reload(); //to show login again
};

// event handler for clicking the login submit button
QWIZM.handlers.validateLogin = (e) => {
    e.preventDefault();
    let uname = $('#uname')[0].value,
        uId = $('#uId')[0].value,
        valid = false;

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
        QWIZM.state = {};
        QWIZM.state.uname = uname;
        QWIZM.state.uId = uId;
        QWIZM.state.currentView = 'instructions';
        QWIZM.state.thisQuiz = []; // this will hold state of entered and processed submissions
        // writeState early enough that it is complete before viewsLoad()
        QWIZM.methods.writeToLocalStorage(QWIZM.QUIZ_KEY, QWIZM.state);
        $('#login-card').fadeOut();
        window.location.reload(true); // not sure why but this helps katex

        // QWIZM.methods.viewsLoad(QWIZM.quiz);
    }
}