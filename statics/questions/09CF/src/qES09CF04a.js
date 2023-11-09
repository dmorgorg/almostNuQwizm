let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF04a = (qNumber) => {

    let qId = 1000159; // question ID number, unique to this question    

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
        debug = false;


    //inputs - defaults to sigDigs
    let AD = stringify(lcrng.getNext(1.5, 3, 0.05)),
        mult = stringify(lcrng.getNext(1.25, 1.55, 0.05)),
        AB = stringify(Math.round(AD / mult * 5) / 5),
        mult2 = stringify(lcrng.getNext(1.1, 1.25, 0.1)),
        BC = stringify(Math.round(AB * mult2 * 5) / 5),
        DL = stringify(lcrng.getNext(1, 3, 0.05));

    // convert to number equivalents of string inputs to avoid string concatenation
    // instead of addition!!
    // RC = sd(RC);
    AB = sd(AB);
    BC = sd(BC);


    //calcs
    let lenBD = sd(Math.sqrt(AB ** 2 + AD ** 2)),
        thetaBD = sd(atan(AD / AB)),
        magDL = sd(DL * lenBD),
        RB = sd((magDL * (sin(thetaBD) * AD / 2 + cos(thetaBD) * AB / 2)) / AB),
        RBtheta = 90,
        RC = sd(RB * AB / (AB + BC)),
        RCtheta = 90,
        RA = sd(RB - RC),
        RAtheta = 90,
        RDy = sd(magDL * cos(thetaBD) - RB),
        RDx = sd(magDL * sin(thetaBD)),
        RD = sd(Math.sqrt(RDy ** 2 + RDx ** 2)),
        RDtheta = sd(atan(RDy / RDx));

    //stringify - defaults to sigDigs
    AB = stringify(AB);
    BC = stringify(BC);
    RD = stringify(RD);
    RDtheta = stringify(RDtheta);
    lenBD = stringify(lenBD);
    thetaBD = stringify(thetaBD);
    RB = stringify(RB);
    RBtheta = stringify(RBtheta);
    RA = stringify(RA);
    RAtheta = stringify(RAtheta);
    RC = stringify(RC);
    RCtheta = stringify(RCtheta);
    // BF = stringify(BF);
    // CE = stringify(CE);

    let statement = `There are pinned connections at !$A!$ and !$D!$, a rocker at !$C!$ and a frictionless collar at !$B!$. Determine the reactions (both magnitude and direction !$\\theta!$, where !$-180^\\circ<\\theta\\le 180^\\circ!$) at !$A, B, C!$ and !$D!$ due to the uniformly distributed load shown.<br>`,
        img = `../../images/09CF/09CF04a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: AD + ' m',
                left: 8,
                top: 43
            },
            {
                input: AB + ' m',
                left: 46,
                top: 83
            },
            {
                input: BC + ' m',
                left: 72,
                top: 83,
            },
            {
                input: DL + ' kN/m',
                left: 65,
                top: 26.75,
                rot: -54.46,
                background: 'none'
            }
        ]);

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_B !$`,
            units: 'kN',
            marks: 5,
            correctSoln: RB
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_B\\theta !$`,
            units: '&deg;',
            marks: 1,
            correctSoln: '90.0'
        };


        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: 'kN',
            marks: 3,
            correctSoln: RC
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C\\theta !$`,
            units: '&deg;',
            marks: 1,
            correctSoln: RCtheta
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RA
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A\\theta !$`,
            units: '&deg;',
            marks: 1,
            correctSoln: RAtheta
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_D !$`,
            units: 'kN',
            marks: 5,
            correctSoln: RD
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_D\\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: RDtheta
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;
    }

    return `<div class='statement'><h3>Q${qNumber}</h3> (${thisQuiz[qNumber][0]} marks):<p> 
    ${statement}</div>
    <div id = '${qId}img' class='image'>
    <img src= ${img}>
    ${inputs}
    </div>
    <div class='parts'>${QWIZM.methods.questionParts(qNumber)}</div>`;

};