let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF001b = (qNumber) => {

    let qId = 1000193; // question ID number, unique to this question    

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

    let ACx = sd(stringify(lcrng.getNext(1, 1.95, 0.05))),
        mult1 = lcrng.getNext(0.95, 1.05, 0.25),
        CQx = sd(stringify(mult1 * ACx)),
        BQx = 2 * ACx - CQx,
        mult2 = lcrng.getNext(0.95, 1.05, 0.025),
        APy = sd(stringify(Math.round(ACx * mult2 / 0.05) * 0.05)),
        mult3 = lcrng.getNext(0.45, 0.55, 0.025),
        CPy = sd(stringify(ACx * mult3)),
        theta = sd(stringify(30, 40, 0.5)),
        P = sd(stringify(3.1, 4.9, 0.1)),
        Q = sd(stringify(2.1, 3.9, 0.1));

    //calcs
    let ACy = APy + CPy,
        BCy = ACy,
        BCx = CQx + BQx,
        BQy = sd(ACy * BQx / BCx),
        a11 = ACy,
        a12 = -ACx,
        a21 = BCy,
        a22 = BCx,
        b1 = sd(-P * APy),
        b2 = sd(-Q * (BQy * cos(theta) + BQx * sin(theta))),
        D = sd(a11 * a22 - a12 * a21),
        Dx = sd(b1 * a22 - b2 * a12),
        Dy = sd(a11 * b2 - a21 * b1),
        Cx = sd(Dx / D),
        Cy = sd(Dy / D),
        RC = sd((Cx ** 2 + Cy ** 2) ** 0.5),
        Ax = -Cx - P,
        Ay = -Cy,
        RA = sd((Ax ** 2 + Ay ** 2) ** 0.5),
        Bx = sd(Q * cos(theta) + Cx),
        By = sd(Q * sin(theta) + Cy),
        RB = sd((Bx ** 2 + By ** 2) ** 0.5);




    //stringify - defaults to sigDigs
    ACx = stringify(ACx);
    CQx = stringify(CQx);
    BQx = stringify(BQx);
    APy = stringify(APy);
    CPy = stringify(CPy);
    theta = stringify(theta);
    P = stringify(P);
    Q = stringify(Q);
    Cx = stringify(Cx);
    Cy = stringify(Cy);
    RC = stringify(RC);
    RA = stringify(RA);
    RB = stringify(RB);




    let statement = `!$ABC!$ is a frame comprised of two structural members !$AB!$ and !$BC!$, pinned at !$C!$ and loaded as shown. Determine the magnitudes of the reactions at !$A, B!$ and !$C!$.`,
        img = `../../images/09CF/09CF01b.png`,
        iV1 = ov({
            input: ACx + ' m',
            left: 32,
            top: 89
        }),
        iV2 = ov({
            input: CQx + ' m',
            left: 55,
            top: 89
        }),
        iV3 = ov({
            input: BQx + ' m',
            left: 77,
            top: 89
        }),
        iV4 = ov({
            input: APy + ' m',
            left: 8,
            top: 47
        }),
        iV5 = ov({
            input: CPy + ' m',
            left: 8,
            top: 21.5
        }),
        iV6 = ov({
            input: P + ' kN',
            left: 21,
            top: 27,
            color: '#a00',
            fontSize: 1.6,
            fontWeight: 'bold',
            background: 'none'
        }),
        iV7 = ov({
            input: Q + ' kN',
            left: 80,
            top: 21,
            color: '#a00',
            fontSize: 1.6,
            fontWeight: 'bold',
            background: 'none'
        }),
        iV8 = ov({
            input: theta + '&deg;',
            left: 78.5,
            top: 33.5,
            // rot: -36,
            // background: 'none'
        });

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: 'kN',
            marks: 10,
            correctSoln: RC
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RA
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_B !$`,
            units: 'kN',
            marks: 6,
            correctSoln: RB
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
        ${iV6}
        ${iV7}
        ${iV8}
    </div>
    <form autocomplete="off"><div class='parts paddingLeft5 width55'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;

};