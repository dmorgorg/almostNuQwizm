let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF09a = (qNumber) => {

    let qId = 1000231; // question ID number, unique to this question    

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
    let ABy = lcrng.getNext(500, 1000, 10),
        BCy = ABy,
        mult = lcrng.getNext(1.35, 1.65, 0.05),
        ABx = Math.round(ABy * mult / 10) * 10,
        BEx = ABx,
        CDx = ABx * 1.5,
        CDy = ABy * 1.5,
        mult2 = lcrng.getNext(0.85, 1.15, 0.05),
        DFy = Math.round(ABy * mult2 / 5) * 5,
        P = lcrng.getNext(4, 6, 0.1),
        theta = lcrng.getNext(25, 31, 0.1);

    //calcs
    let RE = sd(P * CDx / (sin(theta) * (CDy + DFy) - 2 * cos(theta) * ABx)),
        Fx = sd(RE * sin(theta)),
        Fy = sd(P - RE * cos(theta)),
        RF = sd((Fx ** 2 + Fy ** 2) ** 0.5),
        Ax = sd((CDy + DFy) * Fx / (ABy + BCy)),
        Ay = sd((ABy * Ax - BCy * RE * sin(theta) - BEx * RE * cos(theta)) / ABx),
        RA = sd((Ax ** 2 + Ay ** 2) ** 0.5),
        Cy = -Ay - Fy,
        Cx = -Ax - Fx,
        RC = sd((Cx ** 2 + Cy ** 2) ** 0.5),
        Bx = sd(Ax + RE * sin(theta)),
        By = sd(Ay - RE * cos(theta)),
        RB = sd((Bx ** 2 + By ** 2) ** 0.5);

    //stringify - defaults to sigDigs
    P = stringify(P);
    ABy = stringify(ABy);
    BCy = stringify(BCy);
    ABx = stringify(ABx / 1000);
    CDx = stringify(CDx / 1000);
    CDy = stringify(CDy / 1000);
    RE = stringify(Math.abs(RE));
    RF = stringify(RF);
    RA = stringify(RA);
    RC = stringify(RC);
    RB = stringify(RB);

    let statement = `The frame illustrated is made up of three rigid structural members !$ABC, CDE!$ and !$BFD!$. All connections are pinned except for the frictionless roller at !$E!$. Determine the magnitude of the reaction at each connection.`,
        img = `../../images/09CF/09CF09a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: ABy + ' mm',
                left: 8,
                top: 76,
            },
            {
                input: BCy + ' mm',
                left: 8,
                top: 61,
            },
            {
                input: ABx < 1 ? ABx * 1000 + ' mm' : ABx + ' m',
                left: 54,
                top: 91.25,
            },
            {
                input: BEx < 1 ? BEx * 1000 + ' mm' : BEx + ' m',
                left: 71,
                top: 91.25
            },
            {
                input: CDx + ' m',
                left: 31,
                top: 91.25
            },
            {
                input: CDy < 1 ? CDy * 1000 + ' mm' : CDy + ' m',
                left: 8,
                top: 42
            },
            {
                input: DFy < 1 ? DFy * 1000 + ' mm' : DFy + ' m',
                left: 8,
                top: 22
            },
            {
                input: theta + '&deg;',
                left: 95.5,
                top: 46
            },
            {
                input: P + ' kN',
                left: 19,
                top: 45,
                fontWeight: 'bold',
                fontSize: 1.4
            }
        ]);


    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_E !$`,
            units: 'kN',
            marks: 6,
            correctSoln: RE
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_F !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RF
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A !$`,
            units: 'kN',
            marks: 6,
            correctSoln: RA
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RC
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
    }

    return `<div class='statement width60'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks): 
    ${statement}</div>
    <div id = '${qId}img' class='image width75'>
        <img src= ${img}>
        ${inputs}
    </div>
    <form autocomplete="off"><div class='parts paddingLeft5 width55'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;

};