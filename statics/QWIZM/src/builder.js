let QWIZM = QWIZM || {};

$(document).ready(function () {

    QWIZM.builder = ((Qq) => {
        $('body').append(QWIZM.methods.writeHeader(Qq));
        $('body').append("<main></main>");
        QWIZM.methods.pageLoad(Qq);
    })(QWIZM.quiz);

})