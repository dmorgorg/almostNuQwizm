let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF08a = (qNumber) => {

    let qId = 1000211; // question ID number, unique to this question    

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
    // sd to convert to number equivalents of string inputs to avoid string concatenation
    let ABx = lcrng.getNext(1000, 1500, 10),
        BCx = 2 * ABx,
        CDx = ABx,
        mult = lcrng.getNext(0.65, 0.85, 0.05),
        ABy = stringify(Math.round(ABx * mult / 5) * 5),
        BCy = ABy * 2,
        CDy = ABy,
        mult2 = lcrng.getNext(1.1, 1.25, 0.025),
        DEy = sd(stringify(Math.round(BCy * mult2 / 5) * 5)),
        DL = lcrng.getNext(2, 3.8, 0.1);

    //calcs
    let BEy = BCy + CDy + DEy,
        AC = sd(((ABx + BCx) ** 2 + (ABy + BCy) ** 2) ** 0.5),
        W = sd(BEy * DL / 1000),
        AWy = sd(ABy + BEy / 2),
        RC = sd(W * AWy / AC),
        theta = sd(atan(ABy / ABx)),
        Ay = sd(-RC * cos(theta)),
        Ax = sd(RC * sin(theta) - W),
        RA = sd((Ax ** 2 + Ay ** 2) ** 0.5),
        DEtheta = sd(atan(DEy / (BCx + CDx))),
        FDE = -sd(W / 2 / cos(DEtheta)),
        Bx = sd(-Ax + RC * sin(theta) + FDE * cos(DEtheta)),
        By = sd(-Ay - RC * cos(theta) - FDE * sin(DEtheta)),
        RB = sd((Bx ** 2 + By ** 2) ** 0.5);


    //stringify - defaults to sigDigs
    DL = stringify(DL);
    RC = stringify(RC);
    RA = stringify(RA);
    RB = stringify(RB);
    FDE = stringify(FDE);


    let statement = `There is a rocker at !$C!$. All the other connections are pinned. Determine the magnitude of the reaction at connections !$A,B!$ and !$C!$, and the internal force !$F_{DE}!$ in two-force member !$DE!$, due to the applied distributed load.`,
        img = `../../images/09CF/09CF08a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: ABx + ' mm',
                left: 24,
                top: 88.75,
                rot: 45
            },
            {
                input: BCx + ' mm',
                left: 44,
                top: 88.75,
            },
            {
                input: CDx + ' mm',
                left: 64,
                top: 88.75,
                rot: 45
            },
            {
                input: ABy + ' mm',
                left: 84,
                top: 63
            },
            {
                input: BCy + ' mm',
                left: 84,
                top: 49
            },
            {
                input: CDy + ' mm',
                left: 84,
                top: 34.55
            },
            {
                input: DEy + ' mm',
                left: 84,
                top: 19
            },
            {
                input: DL + ' kN/m',
                left: 11,
                top: 5.5,
                fontWeight: 'bold',
            }
        ]);

    if (!thisQuiz[qNumber] || debug) {

        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RC
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RA
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_{DE} !$`,
            units: 'kN',
            marks: 4,
            correctSoln: FDE
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_B !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RB
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;

        // console.log(thisQuestion);
    }

    return `<div class='statement'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks): <p>
        ${statement}</div>
        <div id = '${qId}img' class='image'>
            <img src= ${img}>
            ${inputs}
        </div>
        <div class='parts'>${QWIZM.methods.questionParts(qNumber)}</div>`;

};