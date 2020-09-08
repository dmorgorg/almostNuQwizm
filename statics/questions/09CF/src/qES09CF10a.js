let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF10a = (qNumber) => {

    let qId = 1000213; // question ID number, unique to this question    

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
        mult = lcrng.getNext(2.7, 3.3, 0.1),
        BCy = sd(stringify(Math.round(mult * ABy / 10) * 10)),
        mult2 = lcrng.getNext(1.8, 2.2, 0.05),
        DEy = sd(stringify((Math.round(mult2 * ABy / 10) * 10))),
        CDy = BCy,
        CEx = (CDy + DEy) / 2,
        mult3 = lcrng.getNext(3.2, 3.8, 0.05),
        ACx = sd(stringify((Math.round(ABy * mult3 / 100) * 100))),
        P = lcrng.getNext(4, 6, 0.1);

    //calcs
    let RA = sd(P * CEx / (ACx + CEx)),
        RE = sd(P - RA),
        ABx = sd(ABy / (ABy + BCy) * ACx),
        BCx = ACx - ABx,
        DEx = sd(DEy / (DEy + CDy) * CEx),
        CDx = CEx - DEx,
        det = utils.twoByTwoSolver(-BCy, BCx, CDy, CDx, ABx * RA, -DEx * RE),
        Cx = sd(det[0]),
        Cy = sd(det[1]),
        RC = sd((Cx ** 2 + Cy ** 2) ** 0.5),
        Bx = -Cx,
        By = -Cy - RA,
        RB = sd((Bx ** 2 + By ** 2) ** 0.5),
        Dx = Cx,
        Dy = Cy - RE,
        RD = sd((Dx ** 2 + Dy ** 2) ** 0.5);



    //stringify - defaults to sigDigs
    P = stringify(P);
    ABy = stringify(ABy);
    BCy = stringify(BCy / 1000);
    DEy = stringify(DEy / 1000);
    CDy = stringify(CDy / 1000);
    CEx = stringify(CEx / 1000);
    ACx = stringify(ACx / 1000);
    RA = stringify(RA);
    RE = stringify(RE);
    RC = stringify(RC);
    RB = stringify(RB);
    RD = stringify(RD);


    let statement = `The frame illustrated is made up of three rigid structural members !$ABC, CDE!$ and !$BFD!$. All connections are pinned except for the frictionless roller at !$A!$. Determine the magnitude of the reaction at each connection.`,
        img = `../../images/09CF/09CF10a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: ABy + ' mm',
                left: 13,
                top: 65.5,
            },
            {
                input: BCy + ' m',
                left: 13,
                top: 45,
            },
            {
                input: DEy < 1 ? DEy * 1000 + ' mm' : DEy + ' m',
                left: 90,
                top: 71,
            },
            {
                input: CDy + ' m',
                left: 90,
                top: 44
            },
            {
                input: CEx + ' m',
                left: 67,
                top: 10
            },
            {
                input: ACx + ' m',
                left: 41,
                top: 10
            },
            {
                input: P + ' kN',
                left: 56,
                top: 73
            }
        ]);


    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RA
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_E !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RE
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: RC < 1 ? 'N' : 'kN',
            marks: 8,
            correctSoln: RC < 1 ? stringify(RC * 1000) : RC
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_B !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RB
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_D !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RD
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;
    }

    return `<div class='statement'><h3>Q${qNumber}</h3> (${thisQuiz[qNumber][0]} marks): <p>
    ${statement}</div>
    <div id = '${qId}img' class='image width120'>
        <img src= ${img}>
       ${inputs}
    </div>
    <form autocomplete="off"><div class='parts'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;

};