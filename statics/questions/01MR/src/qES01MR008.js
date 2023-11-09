let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES01MR008 = (qNumber) => {

    let qId = 1000133; // question ID number, unique to this question  
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

    let statement = `Solve this system of equations for !$F_{AC}!$ and !$F_{BC}!$. <br/><br/>       
        $$
        \\begin{aligned}
            F_{BC}\\cdot\\sin\\left(${phi}^\\circ\\right) +F_{AC}\\cdot\\sin\\left(${theta}^\\circ\\right)  &= ${W} \\\\
            F_{BC}\\cdot\\cos\\left(${phi}^\\circ\\right) - F_{AC}\\cdot\\cos\\left(${theta}^\\circ\\right) &= 0 
        \\end{aligned}
        $$`;

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];
        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';
        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_{BC} !$`,
            units: '',
            marks: 5,
            correctSoln: x
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_{AC} !$`,
            units: '',
            marks: 4,
            correctSoln: y
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;
    }



    return `<div class='statement width60'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks):<p>
    ${statement}</div><br/>
    <div class='parts width90'>${QWIZM.methods.questionParts(qNumber)}</div>`;
};