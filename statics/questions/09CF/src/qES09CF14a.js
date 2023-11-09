let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF14a = (qNumber) => {

    let qId = 1000313; // question ID number, unique to this question    

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
    let T = lcrng.getNext(4, 6.5, 0.1),
        x1 = lcrng.getNext(2.1, 2.4, 0.05),
        mult = lcrng.getNext(1.8, 2.2, 0.05),
        x2 = Math.round(x1 * mult * 20) / 20,
        mult2 = lcrng.getNext(0.95, 1.05, 0.025),
        x3 = Math.round(x1 * mult2 * 20) / 20,
        mult3 = lcrng.getNext(1.35, 1.75, 0.05),
        y1 = Math.round(x1 * mult3 * 20) / 20,
        y2 = Math.round(y1 * 1.25 * 20) / 20;

    let det = utils.twoByTwoSolver(-y1, x1 + x2 + x3, y1 + y2, (x1 + 2 * x2 + x3), (2 * x1 + x2) * T, -3 * (x1 + x2) * T),
        Bx = sd(det[0]),
        By = sd(det[1]),
        RB = sd((Bx ** 2 + By ** 2) ** 0.5),
        Ax = -Bx,
        Ay = 2 * T - By,
        RA = sd((Ax ** 2 + Ay ** 2) ** 0.5),
        Cx = Bx,
        Cy = By + 3 * T,
        RC = sd((Cx ** 2 + Cy ** 2) ** 0.5);



    //stringify - defaults to sigDigs
    T = stringify(T);
    x1 = stringify(x1);
    x2 = stringify(x2);
    x3 = stringify(x3);
    y1 = stringify(y1);
    y2 = stringify(y2);
    RB = stringify(RB);
    RA = stringify(RA);
    RC = stringify(RC);


    let statement = `A section of walkway is supported by 5 vertical cables attached to arched frame !$ABC!$ as shown.  Each cable has a tension of ${T} kN. Determine the magnitude of the reactions at the pinned connections !$A,B!$ and !$C!$.`,
        img = `../../images/09CF/09CF14a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: x1 + ' m',
                left: 21.625,
                top: 58,
                rotate: 70
            },
            {
                input: x1 + ' m',
                left: 80,
                top: 58,
                rotate: 70
            },
            {
                input: x3 + ' m',
                left: 41.125,
                top: 58,
                rotate: 70
            },
            {
                input: x3 + ' m',
                left: 47.625,
                top: 58,
                rotate: 70
            },
            {
                input: x2 + ' m',
                left: 31.25,
                top: 58.25
            },
            {
                input: x2 + ' m',
                left: 57.25,
                top: 58.25
            },
            {
                input: x2 + ' m',
                left: 70,
                top: 58.25
            },
            {
                input: y1 + ' m',
                left: 8.75,
                top: 18
            },
            {
                input: y2 + ' m',
                left: 8.75,
                top: 33.75
            },

        ]);

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_B !$`,
            units: 'kN',
            marks: 8,
            correctSoln: RB
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RA
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: 'kN',
            marks: 4,
            correctSoln: RC
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