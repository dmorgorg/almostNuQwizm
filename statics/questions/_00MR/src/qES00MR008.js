let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR008 = (qNumber) => {
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

    let qId = 1000133, // question ID number, unique to this question        
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed);

    thisQuiz[qNumber] = []; // thisQuiz is created at valid login so may cause errors when building new questions; reset and login should handle those.
    let tQ = thisQuiz[qNumber];


    //inputs
    let theta = lcrng.getNext(21, 24, 0.1),
        phi = lcrng.getNext(52, 60, 0.1),
        W = stringify(lcrng.getNext(100, 200, 5) * 9.81),
        b1 = W,
        b2 = 0;

    //calcs
    let a11 = sin(theta),
        a12 = sin(phi),
        a21 = cos(theta),
        a22 = -cos(phi),
        D = a11 * a22 - a12 * a21,
        Dx = b1 * a22 - b2 * a12,
        Dy = a11 * b2 - a21 * b1,
        x = stringify(Dx / D),
        y = stringify(Dy / D);

    let statement = `Solve this system of equations for !$F_{AC}!$ and !$F_{BC}!$.        
        $$
        \\begin{aligned}
            F_{BC}\\cdot\\sin\\left(${phi}^\\circ\\right) +F_{AC}\\cdot\\sin\\left(${theta}^\\circ\\right)  &= ${W} \\\\
            F_{BC}\\cdot\\cos\\left(${phi}^\\circ\\right) - F_{BC}\\cdot\\cos\\left(${theta}^\\circ\\right) &= 0 
        \\end{aligned}
        $$`;

    // thisQuiz.push(questionPart)
    tQ.push(qp({
        partStatement: `!$ x !$`,
        units: '',
        marks: 5,
        correctSoln: x
    }));
    tQ.push(qp({
        partStatement: `!$ y !$`,
        units: '',
        marks: 4,
        correctSoln: y
    }));


    return `<div class='statement width50'><h3>Q${qNumber}</h3>: ${statement}</div>
    <form autocomplete="off"><div class='parts width45'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;
};