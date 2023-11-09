let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF15a = (qNumber) => {

    let qId = 1000289; // question ID number, unique to this question    

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


    //inputs 
    let ABx = lcrng.getNext(1.05, 1.35, 0.05),
        BCx = ABx,
        EFx = Math.round(ABx * 1.25 * 1000 / 10) / 1000 * 10,
        DEx = Math.round(EFx * 5 / 3 * 20) / 20,
        mult = lcrng.getNext(2.5, 2.8, 0.05),
        CDx = Math.round(ABx * mult * 20) / 20,
        mult2 = lcrng.getNext(1.2, 1.45, 0.5),
        AFy = Math.round(ABx * mult2 * 20) / 20,
        ACy = 2 * AFy,
        UDL = lcrng.getNext(2, 6, 0.1);



    //calcs
    let W = sd(UDL * CDx),
        Dy = W / 2,
        Cy = Dy,
        DFy = ACy + AFy,
        DFx = DEx + EFx,
        EFy = sd(EFx / DFx * DFy),
        ABy = ACy / 2,
        BCy = ABy,
        BEy = ABy + AFy - EFy,
        ACx = ABx + BCx,
        BEtheta = sd(atan(BEy / (BCx + CDx + DEx))),
        det = utils.twoByTwoSolver(ACy, -(ABy * cos(BEtheta) + ABx * sin(BEtheta)), -DFy, EFy * cos(BEtheta) - EFx * sin(BEtheta), ACx * W / 2, -DFx * W / 2),
        TBE = sd(det[1]),
        Dx = sd(det[0]),
        RC = sd((Dx ** 2 + Dy ** 2) ** 0.5),
        RD = RC,
        Ax = sd(Dx - TBE * cos(BEtheta)),
        Ay = sd(Dy + TBE * sin(BEtheta)),
        RA = sd((Ax ** 2 + Ay ** 2) ** 0.5),
        Fx = sd(TBE * cos(BEtheta) - Dx),
        Fy = sd(Dy - TBE * sin(BEtheta)),
        RF = sd((Fx ** 2 + Fy ** 2) ** 0.5),
        Ay2 = sd(W * (CDx / 2 + DEx + EFx) / (ABx + BCx + CDx + DEx + EFx)),
        TBE2 = sd(Ay2 * (ABx + BCx) / (BCy * cos(BEtheta) + BCx * sin(BEtheta)));



    //stringify - defaults to sigDigs
    ABx = stringify(ABx);
    BCx = stringify(BCx);
    EFx = stringify(EFx);
    DEx = stringify(DEx);
    CDx = stringify(CDx);
    AFy = stringify(AFy);
    AFy = stringify(AFy);
    ACy = stringify(ACy);
    UDL = stringify(UDL);
    BEtheta = stringify(BEtheta);
    TBE = stringify(TBE);
    RC = stringify(RC);
    RD = stringify(RD);
    RA = stringify(RA);
    RF = stringify(RF);
    TBE2 = stringify(TBE2);


    let statement = `!$A,C,D!$ and !$F!$ are pinned connections. Determine the angle !$\\theta!$ between cable !$BE!$ and the horizontal and then determine the tension !$T_{BE}!$ in cable !$BE!$. Calculate the magnitude of the reactions in the four pinned connections. If the pinned connection at !$A!$ were replaced with a frictionless roller, what would the tension !$T_{BE}(2)!$ become?`,
        img = `../../images/09CF/09CF15a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: ABx + ' m',
                left: 22.875,
                top: 92.25,
                rot: 45
            },
            {
                input: BCx + ' m',
                left: 32.125,
                top: 92.25,
                rot: 45
            },
            {
                input: EFx + ' m',
                left: 85.75,
                top: 92
            },
            {
                input: DEx + ' m',
                left: 71.5,
                top: 92
            },
            {
                input: CDx + ' m',
                left: 49,
                top: 92
            },
            {
                input: AFy + ' m',
                left: 9.5,
                top: 69.5
            },
            {
                input: ACy + ' m',
                left: 9.5,
                top: 43
            },
            {
                input: UDL + ' kN/m',
                left: 57,
                top: 7,
                fontWeight: 600,
                fontSize: 1.5
            },
        ]);




    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: BEtheta
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ T_{BE} !$`,
            units: 'kN',
            marks: 10,
            correctSoln: TBE
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RC
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_{D} !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RD
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_{A} !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RA
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_{F} !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RF
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ T_{BE}(2) !$`,
            units: 'kN',
            marks: 4,
            correctSoln: TBE2
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