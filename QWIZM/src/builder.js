let QWIZM = QWIZM || {};

$(document).ready(() => {

    QWIZM.builder = ((Qq) => {
        QWIZM.quiz.questions.unshift(''); // make arrays indices line up with question numbers
        $('body').append(QWIZM.methods.writeHeader(Qq));
        $('body').append("<main></main>");
        QWIZM.methods.viewsLoad(Qq);

        katexify();
    })(QWIZM.quiz);

})