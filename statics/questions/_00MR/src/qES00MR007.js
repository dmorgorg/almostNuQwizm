let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR007 = (qNumber) => {
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
        ov = QWIZM.methods.overlayVariable,
        qp = QWIZM.methods.questionPart;

    let qId = 1000121, // question ID number, unique to this question        
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed);

    thisQuiz[qNumber] = []; // thisQuiz is created at valid login so may cause errors when building new questions; reset and login should handle those.
    let tQ = thisQuiz[qNumber];


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

    // thisQuiz.push(questionPart)
    tQ.push(qp({
        partStatement: `!$ x !$`,
        units: '',
        marks: 3,
        correctSoln: x
    }));
    tQ.push(qp({
        partStatement: `!$ y !$`,
        units: '',
        marks: 3,
        correctSoln: y
    }));

    return `<div class='statement width50'><h3>Q${qNumber}</h3>: ${statement}</div>
    <form autocomplete="off"><div class='parts width50'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;
};