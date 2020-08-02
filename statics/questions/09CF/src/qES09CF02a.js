let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF02a = (qNumber) => {

    let qId = 1000187; // question ID number, unique to this question    

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
        // ov = QWIZM.methods.overlayVariable,
        arrayCount = 0,
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed),
        partMarks = 0,
        debug = false;


    //inputs - defaults to sigDigs
    // sd to convert to number equivalents of string inputs to avoid string concatenation
    let ABx = sd(stringify(lcrng.getNext(1, 2, 0.05))),
        mult1 = sd(stringify(lcrng.getNext(1.1, 1.3, 0.025))),
        ABy = sd(stringify(Math.round(ABx * mult1 / 0.05) * 0.05)),
        mult2 = sd(stringify(lcrng.getNext(1.5, 1.7, 0.025))),
        BCx = sd(stringify(Math.round(ABx * mult2 / 0.05) * 0.05)),
        ABDL = sd(stringify(lcrng.getNext(3, 4, 0.1))),
        BCDL = sd(stringify(lcrng.getNext(2, 3, 0.1)));

    //calcs
    let Wtri = sd(ABDL * ABy / 2),
        BC = sd((BCx ** 2 + ABy ** 2) ** 0.5),
        Wrect = sd(BC * BCDL),
        a11 = ABy,
        a12 = ABx,
        a21 = ABy,
        a22 = -BCx,
        b1 = sd(2 / 3 * ABy * Wtri),
        b2 = sd(Wrect * BC / 2),
        D = sd(a11 * a22 - a12 * a21),
        Dx = sd(b1 * a22 - b2 * a12),
        Dy = sd(a11 * b2 - a21 * b1),
        Bx = sd(Dx / D),
        By = sd(Dy / D),
        RB = sd((Bx ** 2 + By ** 2) ** 0.5),
        RBtheta = sd(atan(-By / Bx)),
        Ax = sd(Bx - Wtri),
        Ay = -By,
        RA = sd((Ax ** 2 + Ay ** 2) ** 0.5),
        RAtheta = sd(atan(Ay / Ax)),
        BCtheta = sd(atan(ABy / BCx)),
        Cx = sd(Wrect * sin(BCtheta) - Bx),
        Cy = sd(Wrect * cos(BCtheta) + By),
        RC = sd((Cx ** 2 + Cy ** 2) ** 0.5),
        RCtheta = sd(atan(Cy / Cx));



    //stringify - defaults to sigDigs
    ABx = stringify(ABx);
    BCx = stringify(BCx);
    ABy = stringify(ABy);
    ABDL = stringify(ABDL);
    BCDL = stringify(BCDL);
    RB = stringify(RB);
    RBtheta = stringify(RBtheta);
    RA = stringify(RA);
    RAtheta = stringify(RAtheta);
    RC = stringify(RC);
    RCtheta = stringify(RCtheta);



    let statement = `!$ABC!$ is a frame comprised of two structural members !$AB!$ and !$BC!$, pinned at !$B!$ and loaded as shown. Determine the force !$F_B!$ (both magnitude and direction !$\\theta!$, where !$0^\\circ\\!\\le\\!\\theta\\!<360^\\circ!$, measured counterclockwise from the positive !$x!$-axis) that frame member !$AB!$ exerts on frame member !$BC!$. Then determine the reactions at the pinned connections !$A!$ and !$C!$.`,
        img = `../../images/09CF/09CF02a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: ABx + ' m',
                left: 40,
                top: 89.75
            },
            {
                input: BCx + ' m',
                left: 68,
                top: 89.75,
            },
            {
                input: ABy + ' m',
                left: 10,
                top: 50,
            },
            {
                input: ABDL + ' kN/m',
                left: 15,
                top: 22.5,
                background: 'none'
            },
            {
                input: BCDL + ' kN/m',
                left: 78.5,
                top: 25.5,
                rot: -36,
                background: 'none'
            }
        ]);

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_B !$`,
            units: 'kN',
            marks: 10,
            correctSoln: RB
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_B\\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: RBtheta
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RA
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A\\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: RAtheta
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: 'kN',
            marks: 6,
            correctSoln: RC
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C\\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: RCtheta
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;

    }

    return `<div class='statement width60'><h3>Q${qNumber}</h3> (${thisQuiz[qNumber][0]} marks): 
    ${statement}</div>
    <div id = '${qId}img' class='image width55'>
        <img src= ${img}>
        ${inputs}
    </div>
    <form autocomplete="off"><div class='parts paddingLeft5 width55'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;

};