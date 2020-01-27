let QWIZM = QWIZM || {};

$(document).ready(function () {

    QWIZM.builder = ((Qq) => {
        QWIZM.quiz.questions.unshift(''); // make arrays indices line up with question numbers
        // let currentView = 'instructions';
        $('body').append(QWIZM.methods.writeHeader(Qq));
        $('body').append("<main></main>");
        QWIZM.methods.viewsLoad(Qq);
    })(QWIZM.quiz);

})