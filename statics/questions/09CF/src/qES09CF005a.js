let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF005a = (qNumber) => {

    let qId = 1000199; // question ID number, unique to this question    

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
        debug = false;


    //inputs - defaults to sigDigs
    // sd to convert to number equivalents of string inputs to avoid string concatenation
    let diam = lcrng.getNext(275, 600, 25),
        mult = lcrng.getNext(0.4, 0.5, 0.01),
        mass = sd(stringify(Math.round(diam * mult * 0.5) / 0.5)),
        mult2 = lcrng.getNext(0.8, 0.9, 0.01),
        ABx = sd(stringify(Math.round(diam * mult2 * .1) / .1)),
        mult3 = lcrng.getNext(1.4, 1.6, 0.1),
        ABy = sd(stringify(Math.round(ABx * mult3 * .1) / .1)),
        mult4 = lcrng.getNext(2.6, 2.95, 0.05),
        BDx = sd(stringify(Math.round(ABx * mult4 * .1) / .1));

    //calcs
    let theta = sd(atan(ABy / ABx)),
        phi = sd(atan(ABy / BDx)),
        w = sd(mass * 9.81 / 1000),
        R = utils.twoByTwoSolver(-sin(theta), sin(phi), cos(theta), cos(phi), 0, w),
        RF = sd(R[0]),
        RG = sd(R[1]),
        alpha = sd((theta + phi) / 2),
        BF = sd(diam / 2 * tan(alpha)),
        AB = sd((ABx ** 2 + ABy ** 2) ** 0.5),
        AF = AB + BF,
        BD = sd((BDx ** 2 + ABy ** 2) ** 0.5),
        DG = BD + BF,
        B = utils.twoByTwoSolver(-ABy, ABx, ABy, BDx, AF * RF, -DG * RG),
        Bx = sd(B[0]),
        By = sd(B[1]),
        RB = sd((Bx ** 2 + By ** 2) ** 0.5),
        Ax = -Bx - RF * sin(theta),
        Ay = -By + RF * cos(theta),
        RA = sd((Ax ** 2 + Ay ** 2) ** 0.5),
        Dx = Bx + RG * sin(phi),
        Dy = By + RG * cos(phi),
        RD = sd((Dx ** 2 + Dy ** 2) ** 0.5);

    //stringify - defaults to sigDigs
    diam = stringify(diam);
    mass = stringify(mass);
    ABx = stringify(ABx);
    ABy = stringify(ABy);
    BDx = stringify(BDx);
    RF = stringify(RF);
    RG = stringify(RG);
    BF = stringify(BF);
    RB = stringify(RB);
    RA = stringify(RA);
    RD = stringify(RD);

    let statement = `!$ABCDE!$ is a frame comprised of two structural members !$ABC!$ and !$DBE!$, pinned at !$B!$. The frame supports a ${mass} kg section of smooth pipe with diameter ${diam}&nbsp;mm. Determine the magnitude and direction of each reaction at !$F!$ and !$G!$, due to the pipe. Then, using the lengths !$BF!$ and !$BG!$ (which are the same), determine the magnitudes of the reactions at the pinned connections !$A, B!$ and !$C!$.`,
        img = `../../images/09CF/09CF05a.png`,
        iV1 = ov({
            input: diam + ' mm',
            left: 33.5,
            top: 19
        }),
        iV2 = ov({
            input: mass + ' kg',
            left: 34,
            top: 3,
            fontWeight: 'bold',
            background: 'none'
        }),
        iV3 = ov({
            input: ABx + ' mm',
            left: 29.75,
            top: 88.75,
            // background: 'none'
        }),
        iV4 = ov({
            input: ABy + ' mm',
            left: 12,
            top: 55,
            // background: 'none'
        }),
        iV5 = ov({
            input: BDx + ' mm',
            left: 61,
            top: 88.75,
            // background: 'none'
        });


    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_F !$`,
            units: 'kN',
            marks: 5,
            correctSoln: RF
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_G !$`,
            units: 'kN',
            marks: 5,
            correctSoln: RG
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ BF !$`,
            units: 'mm',
            marks: 2,
            correctSoln: BF
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ RB !$`,
            units: 'kN',
            marks: 10,
            correctSoln: RB
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ RA !$`,
            units: 'kN',
            marks: 5,
            correctSoln: RA
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ RD !$`,
            units: 'kN',
            marks: 5,
            correctSoln: RD
        };



    }

    return `<div class='statement width60'><h3>Q${qNumber}</h3>: 
    ${statement}</div>
    <div id = '${qId}img' class='image width55'>
        <img src= ${img}>
        ${iV1}
        ${iV2}
        ${iV3}
        ${iV4}
        ${iV5}
    </div>
    <form autocomplete="off"><div class='parts paddingLeft5 width55'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;

};