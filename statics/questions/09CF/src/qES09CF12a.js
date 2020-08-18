let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF12a = (qNumber) => {

    let qId = 1000253; // question ID number, unique to this question    

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


    //inputs - dFGaults to sigDigs
    let FG = lcrng.getNext(600, 900, 10),
        mult = lcrng.getNext(1.9, 2.1, 0.05),
        EF = Math.round(FG * mult / 10) * 10,
        mult2 = lcrng.getNext(.9, 1.1, 0.05),
        CCE = Math.round(FG * mult2 / 10) * 10,
        mult3 = lcrng.getNext(1.9, 1.1, 0.05),
        CCD = CCE,
        vert = Math.round(FG * mult3 / 10) * 10,
        M = lcrng.getNext(200, 400, 10);

    //calcs
    let CDtheta = sd(atan(vert / CCE)),
        BFtheta = sd(atan(vert / EF)),
        W = M * 9.81 / 1000,
        AB = FG + EF,
        AC = AB + CCE,
        EG = FG + EF,
        DG = AC + CCD,
        det = utils.twoByTwoSolver(AB * sin(BFtheta), AC * sin(CDtheta), FG * sin(BFtheta), DG * sin(CDtheta), 0, EG * W),
        FBF = sd(det[0]),
        FCD = sd(det[1]),
        Ax = sd(FBF * cos(BFtheta) - FCD * cos(CDtheta)),
        Ay = sd(FBF * sin(BFtheta) + FCD * sin(CDtheta)),
        RA = stringify((Ax ** 2 + Ay ** 2) ** 0.5),
        RAtheta = stringify(180 + atan(Ay / Ax)),
        Gx = sd(FCD * cos(CDtheta) - FBF * cos(BFtheta)),
        Gy = sd(W - FBF * sin(BFtheta) - FCD * sin(CDtheta)),
        RG = stringify((Gx ** 2 + Gy ** 2) ** 0.5),
        RGtheta = stringify(atan(Gy / Gx));


    //stringify - dFGaults to sigDigs
    // P = stringify(P);
    FG = stringify(FG);
    EF = stringify(EF / 1000);
    vert = stringify(vert / 1000);
    M = stringify(M);
    FBF = stringify(FBF);
    FCD = stringify(FCD);




    let statement = `The frame !$ABCDFG!$ supports a triangular sign with mass of ${M} kg. Determine the internal forces in two-force members !$BF!$ and !$CD!$ due to the weight of the sign. Then determine the magnitude and direction (!$0^\\circ\\le\\theta<360^\\circ!$) of the reactions at !$A!$ and !$G!$.`,
        img = `../../images/09CF/09CF12a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: FG + ' mm',
                left: 24.75,
                top: 91,
                rot: 45,
                fontSize: 1.4
            },
            {
                input: EF + ' m',
                left: 42,
                top: 91.5,
                fontSize: 1.4
            },
            {
                input: CCE + ' mm',
                left: 60,
                top: 91,
                rot: 45,
                fontSize: 1.4
            },
            {
                input: CCD + ' mm',
                left: 71,
                top: 91,
                rot: 45,
                fontSize: 1.4
            },
            {
                input: vert + ' m',
                left: 86,
                top: 32,
                fontSize: 1.4
            },
            {
                input: M + ' kg',
                left: 43,
                top: 65,
                fontSize: 1.5,
                fontWeight: 600
            }
        ]);


    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_{BF} !$`,
            units: 'kN',
            marks: 4,
            correctSoln: FBF
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_{CD} !$`,
            units: 'kN',
            marks: 4,
            correctSoln: FCD
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_{A} !$`,
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
            partStatement: `!$ R_{G} !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RG
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_{G}\\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: RGtheta
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;

    }

    return `<div class='statement width70'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks): 
    ${statement}</div>
    <div id = '${qId}img' class='image width70'>
        <img src= ${img}>
        ${inputs}  
    </div>
    <form autocomplete="off"><div class='parts paddingLFGt5 width55'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;

};