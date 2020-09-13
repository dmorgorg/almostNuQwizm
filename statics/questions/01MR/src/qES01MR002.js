let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR002 = (qNumber) => {
    let qId = 1000033; // question ID number, unique to this question

    let uId = QWIZM.state.uId,
        sd = QWIZM.methods.toSigDigs,
        stringify = QWIZM.methods.stringify,
        wd = QWIZM.quiz.workingDigs,
        sin = utils.sin,
        cos = utils.cos,
        asin = utils.asin,
        acos = utils.acos,
        tan = utils.tan,
        atan = utils.atan,
        thisQuiz = QWIZM.state.thisQuiz,
        thisQuestion,
        ov = QWIZM.methods.overlayVariable,
        arrayCount = 0,
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed),
        partMarks = 0,
        debug = true;

    //inputs
    // console.log(stringify(lcrng.getNext(2, 4, 0.025)))
    let c = stringify(lcrng.getNext(2, 4, 0.025)),
        a = stringify(lcrng.getNext(1.5, 1.64, 0.01) * c),
        b = stringify(lcrng.getNext(1.95, 1.975, 0.01) * c),
        A = stringify(acos((b * b + c * c - a * a) / (2 * b * c)));

    // convert to number equivalents of string inputs to avoid chance of string concatenation
    // instead of addition!!
    c = sd(c);
    a = sd(a);
    b = sd(b);
    A = sd(A);

    //calcs
    let a2 = stringify(sd(Math.sqrt(b * b + c * c - 2 * b * c * cos(A))), wd),
        B = sd(acos((a2 * a2 + c * c - b * b) / (2 * a2 * c)), wd);

    let statement = `Determine the length of !$BC!$ and the angle !$ABC!$.`,
        img = `../../images/00MR/00MR02.png`,
        inputs = QWIZM.getInputOverlays([{
                input: A + '&deg;',
                left: 31,
                top: 84,
                background: 'linen'
            },
            {
                input: c + ' cm',
                left: 50,
                top: 93,
                background: 'none'
            },
            {
                input: b + ' cm',
                left: 46,
                top: 49,
                rot: 55,
                background: 'none'
            }
        ]);

    //stringify
    a2 = stringify(a2);
    B = stringify(B);

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion.push({
            partStatement: `!$ BC !$`,
            units: 'm',
            marks: 5,
            correctSoln: a2
        });
        thisQuestion.push({
            partStatement: ` !$ \\angle ABC !$`,
            units: '!$^\\circ!$',
            marks: 4,
            correctSoln: B
        });

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;
    }


    return `<div class='statement width75'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks):
        ${statement}<br>
        </div>
        <div id = '${qId}img' class='image width50'>
        <img src= ${img}>
        ${inputs}
        </div>
        <form autocomplete="off"><div class='parts'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;


};