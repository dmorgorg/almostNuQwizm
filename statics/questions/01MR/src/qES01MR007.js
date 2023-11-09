let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES01MR007 = (qNumber) => {

    let qId = 1000121; // question ID number, unique to this question
    // common for import?
    let uId = QWIZM.state.uId,
        sd = QWIZM.methods.toSigDigs,
        stringify = QWIZM.methods.stringify,
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
        debug = false;

    //inputs - don't stringify these, use 6y instead of 6.00y
    let a11 = sd(lcrng.getNext(1, 8, 1)),
        a12 = sd(lcrng.getNext(1, 8, 1)),
        b1 = sd(lcrng.getNext(1, 8, 1)),
        a21 = sd(lcrng.getNext(1, 8, 1)),
        a22 = sd(lcrng.getNext(1, 8, 1)),
        b2 = sd(lcrng.getNext(1, 8, 1));

    //calcs - dont want to write 1x for x
    let a11b = a11 === 1 ? '' : a11,
        a12b = a12 === 1 ? '' : a12,
        a22b = a22 === 1 ? '' : a22,
        a21b = a21 === 1 ? '' : a21;
    a22 *= -1;
    let D = a11 * a22 - a12 * a21,
        Dx = b1 * a22 - b2 * a12,
        Dy = a11 * b2 - a21 * b1,
        x = stringify(Dx / D),
        y = stringify(Dy / D);

    let statement = `Solve this system of equations for !$x!$ and !$y!$.        
        $$
        \\begin{aligned}
            ${a11b}x + ${a12b}y &= ${b1} \\\\
            ${a21b}x - ${a22b}y &= ${b2} 
        \\end{aligned}
        $$`;

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];
        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';
        thisQuestion[arrayCount++] = {
            partStatement: `!$ x !$`,
            units: '',
            marks: 3,
            correctSoln: x
        }
        thisQuestion[arrayCount++] = {
            partStatement: `!$ y !$`,
            units: '',
            marks: 3,
            correctSoln: y
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;
    }

    return `<div class='statement width70'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks):
     ${statement}</div>
    <div class='parts width80'>${QWIZM.methods.questionParts(qNumber)}</div>`;
};