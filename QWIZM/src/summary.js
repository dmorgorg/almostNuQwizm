let QWIZM = QWIZM || {};
QWIZM.summary = () => {}; //constructor, not sure why is need this
QWIZM.summary.display = () => {
    let totalScore = 0,
        maxPossibe = 0,
        qNumber,
        qPart,
        thisQuestionScore = 0,
        thisQuestionMax = 0,
        questionCount = QWIZM.quiz.questions.length,
        html = `<article class='statement width95'>`;

    html += `<h3>Quiz Summary Table for user <span class='uname'>${QWIZM.state.uname}</span>
    <span class='taRight'>(Total Score 0/42)</span></h3>`;

    for (qNumber = 1; qNumber < questionCount; qNumber++) {
        html += `Q${qNumber}`;
    }






    html += `</article>`;
    return html;
}