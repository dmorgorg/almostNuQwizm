let QWIZM = QWIZM || {};
QWIZM.summary = () => {}; //constructor, not sure why is need this
QWIZM.summary.display = () => {

    // console.log('in summary');
    // console.log(QWIZM.state);

    let totalScore = 0,
        maxPossible = 0,
        qNumber,
        qPart = 0,
        qPartCount = 0,
        thisQuestionScore = 0,
        thisQuestionMax = 0,
        state = QWIZM.state,
        questionCount = state.thisQuiz.length,
        html = `<summary class="statement width95">`;

    html += `<h3 class='width100'>Quiz Summary Table for user <span class="uname">${state.uname}</span>
    <span class="fright">(Total Score 0/42)</span></h3>`;
    html += `<div class="table">`;

    for (qNumber = 1; qNumber < questionCount; qNumber++) {
        html += `<section class='row'><div class='qNumber'>Q${qNumber}</div>`
        html += `<div class='items'>`;
        thisQuestionScore = 0;
        thisQuestionMax = 0;
        qPartCount = state.thisQuiz[qNumber].length - 1;
        for (qPart = 1; qPart <= qPartCount; qPart++) {
            let part = state.thisQuiz[qNumber][qPart];
            html += `<div class='item'>${part.partStatement}: ${part.userInput || 'a'}`;
            html += `</div>`;
        }

        html += `</div></section>`;


    }
    html += `</summary>`;
    return html;
}