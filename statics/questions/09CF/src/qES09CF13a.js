let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF13a = (qNumber) => {

    let qId = 1000273; // question ID number, unique to this question    

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
    let AP = lcrng.getNext(1100, 1750, 100),
        PB = AP,
        mult = lcrng.getNext(0.9, 1.1, 0.025),
        BC = Math.round(AP * mult / 10) * 10,
        mult2 = lcrng.getNext(1.4, 1.5, 0.025),
        CM = Math.round(AP * mult2 / 50) * 50,
        mult3 = lcrng.getNext(0.75, 0.8, 0.025),
        MD = Math.round(BC * mult3 / 10) * 10,
        mult4 = lcrng.getNext(0.6, 0.8, 0.01),
        BCy = Math.round(BC * mult4 / 10) * 10,
        M = lcrng.getNext(2, 5, 0.05),
        P = lcrng.getNext(2, 5, 0.05);


    //calcs
    let BCtheta = sd(atan(BCy / BC)),
        CD = (CM + MD) / 1000,
        TBC = sd(M / CD / sin(BCtheta)),
        Dx = sd(TBC * cos(BCtheta)),
        Dy = sd(TBC * sin(BCtheta)),
        RD = sd((Dx ** 2 + Dy ** 2) ** 0.5),
        RDtheta = 360 - sd(atan(Dy / Dx)),
        Ax = -sd(TBC * cos(BCtheta)),
        Ay = sd(P + TBC * sin(BCtheta)),
        AB = (AP + PB) / 1000,
        RA = stringify((Ax ** 2 + Ay ** 2) ** 0.5),
        RAtheta = stringify(180 + atan(Ay / Ax)),
        MA = stringify(AP / 1000 * P + AB * TBC * sin(BCtheta));


    //stringify - defaults to sigDigs
    AP = stringify(AP / 1000);
    PB = stringify(PB / 1000);
    BC = stringify(BC / 1000);
    BCy = stringify(BCy / 1000);
    CM = stringify(CM / 1000);
    MD = stringify(MD / 1000);
    M = stringify(M);
    P = stringify(P);
    TBC = stringify(TBC);
    RD = stringify(RD);
    RDtheta = stringify(RDtheta);
    MA = stringify(MA);

    let statement = `Beams !$AB!$ and !$CD!$ are connected by a cable from !$B!$ to !$C!$. There is a fixed connection at !$A!$ and a pinned connection at !$D!$. A point load and a couple are applied, as shown. Determine the tension !$T_{BC}!$ in !$BC!$ and the reaction (magnitude and direction, !$0^\\circ\\le\\theta<360^\\circ!$) at !$D!$. Then find the reaction (magnitude and direction, !$0^\\circ\\le\\theta<360^\\circ!$) and the reacting moment !$M_A!$ at !$A!$.`,
        img = `../../images/09CF/09CF13a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: AP + ' m',
                left: 21.75,
                top: 84.25,
            },
            {
                input: PB + ' m',
                left: 36,
                top: 84.25,
            },
            {
                input: BC < 1 ? BC * 1000 + ' mm' : BC + ' m',
                left: 50.5,
                top: 84.25,
            },
            {
                input: CM + ' m',
                left: 66.75,
                top: 84.25,
            },
            {
                input: MD < 1 ? MD * 1000 + ' mm' : MD + ' m',
                left: 80.65,
                top: 84.25,
            },
            {
                input: BCy + ' m',
                left: 65,
                top: 39,
            },
            {
                input: M + ' kN!$\\cdot!$m',
                left: 76,
                top: 60,
            },
            {
                input: P + ' kN',
                left: 29,
                top: 59,
            }
        ]);


    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ T_{BC} !$`,
            units: 'kN',
            marks: 4,
            correctSoln: TBC
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_{D} !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RD
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_{D}\\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: RDtheta
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_{A}!$`,
            units: 'kN',
            marks: 2,
            correctSoln: RA
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_{A}\\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: RAtheta
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ M_A !$`,
            units: 'kN!$\\cdot!$m',
            marks: 2,
            correctSoln: MA
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;

    }

    return `<div class='statement'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks): <p>
    ${statement}</div>
    <div id = '${qId}img' class='image width120'>
        <img src= ${img}>
       ${inputs}     
    </div>
    <div class='parts'>${QWIZM.methods.questionParts(qNumber)}</div>`;

};