let QWIZM = QWIZM || {};
QWIZM.summary = () => {}; //constructor, not sure why is need this
QWIZM.summary.display = () => {

    // console.log('in summary');
    // console.log(QWIZM.state);
    // console.log(QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY));

    let state = QWIZM.methods.readFromLocalStorage(QWIZM.QUIZ_KEY);

    let quizScore = 0,
        quizPossible = 0,
        qNumber,
        qPart = 0,
        qPartCount = 0,
        questionScore = 0,
        questionPossible = 0,
        questionCount = state.thisQuiz.length - 1,
        html = `<summary class="statement width95">`;

    // get quizScore and quizPossible for header
    for (let qNumber = 1; qNumber < questionCount; qNumber++) {
        let qPartCount = state.thisQuiz[qNumber].length - 1;
        questionScore = 0;
        questionPossible = 0;
        for (let qPart = 1; qPart <= qPartCount; qPart++) {
            let part = state.thisQuiz[qNumber][qPart];
            questionScore += part.score || 0;
            questionPossible += part.marks;
        }
        quizScore += questionScore;
        quizPossible += questionPossible;
    }

    html += `<h3 class='width100'>Quiz Summary Table for <span class="uname">${state.uname}</span>
        <span class = "fright total" > Total Score: &nbsp; ${quizScore}&thinsp;/&thinsp;${quizPossible}</span></h3>`;
    html += `<div class="table">`;

    for (qNumber = 1; qNumber < questionCount; qNumber++) {

        qPartCount = state.thisQuiz[qNumber].length - 1;
        questionScore = 0;
        questionPossible = 0;

        // get questionScore and questionPossible
        for (qPart = 1; qPart <= qPartCount; qPart++) {
            let part = state.thisQuiz[qNumber][qPart];
            questionScore += part.score || 0;
            questionPossible += part.marks;
        }

        html += `<section class='row'><div class='qNumber'>Q${qNumber}`;
        html += `<span class="questionMarks"> (${questionScore}/${questionPossible})</span></div>`;
        html += `<div class='items'>`;

        for (qPart = 1; qPart <= qPartCount; qPart++) {
            let part = state.thisQuiz[qNumber][qPart],
                check = '<div class="symb"><span class="check" /></div>',
                cross = '<div class="symb"><span class="cross" /></div>',
                qm = '<div class="symb"><span class="qm" /></div>',
                empty = '<div class="symb"></div>';

            html += `<div class='item'><span class='ps'>${part.partStatement}:</span>`;
            html += `<span class="ui"> ${part.userInput||''}</span>`;

            if (part.isAnswered) {
                if (part.isCorrect) {
                    html += check;
                } else if (part.half) {
                    html += qm;
                } else {
                    html += cross;
                }
            } else {
                html += empty;
            }
            html += `<div class="marked"> (${part.score || 0}/${part.marks}) </div>`;
            html += `</div>`;
        }

        html += `</div></section>`;


    }
    html += `</summary>`;
    return html;
}