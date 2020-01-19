// since everything within <body> is created dynamically, we need to use event delegation
$('body').on("keyup", "#uname", e => e.target.value = utils.makeInputAlpha(e.target.value));
$('body').on("keyup", "#uId", e => e.target.value = utils.makeInputInteger(e.target.value));
$('body').on("click", "#login-button", QWIZM.methods.validateLogin);
$('body').on("click", "li.nav-item", QWIZM.methods.displayPage);