let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF03a = (qNumber) => {

    let qId = 1000333; // question ID number, unique to this question    

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
    let M = lcrng.getNext(1100, 1350, 10),
        WB = lcrng.getNext(2100, 2500, 20),
        mult = lcrng.getNext(0.310, 0.34, 0.005),
        FG = Math.round(mult * WB / 5) * 5,
        mult2 = lcrng.getNext(0.355, 0.385, 0.005),
        GB = Math.round(mult2 * WB / 5) * 5,
        BR = Math.round(FG * 0.95 / 5) * 5,
        mult3 = lcrng.getNext(0.7, 0.75, 0.005),
        AFx = Math.round(FG / mult3 / 5) * 5,
        mult4 = lcrng.getNext(2.1, 2.4, 0.005),
        RCx = Math.round(FG * mult4 / 5) * 5,
        RCy = Math.round(FG / 1.4 / 5) * 5,
        mult5 = lcrng.getNext(1.9, 2.1, 0.005),
        ACy = Math.round(RCy * mult5 / 5) * 5;

    //calcs
    let W = sd(M * 9.81 / 1000),
        FR = sd(W * FG / (FG + GB + BR)),
        FF = sd(W * (GB + BR) / (FG + GB + BR)),
        det = utils.twoByTwoSolver(ACy + RCy, -AFx - FG - GB, RCy, BR + RCx, AFx * FF, RCx * FR),
        Bx = sd(det[0]),
        By = sd(det[1]),
        R_B = sd((Bx ** 2 + By ** 2) ** 0.5),
        RBtheta = atan(By / Bx),
        Ax = sd(Bx),
        Ay = sd(FF + By),
        RA = sd((Ax ** 2 + Ay ** 2) ** 0.5),
        RAtheta = atan(Ay / Ax),
        Cx = sd(-Bx),
        Cy = sd(FR - By),
        RC = sd((Cx ** 2 + Cy ** 2) ** 0.5),
        RCtheta = 180 + atan(Cy / Cx);

    //stringify - defaults to sigDigs
    FR = stringify(FR);
    FF = stringify(FF);
    R_B = stringify(R_B);
    RBtheta = stringify(RBtheta);
    RA = stringify(RA);
    RAtheta = stringify(RAtheta);
    RC = stringify(RC);
    RCtheta = stringify(RCtheta);

    let statement = ` <p>The car has a mass of ${M} kg, half of which is supported by the frame !$ABC!$ shown. The connections at !$A, B!$ and !$C!$ are pinned. (You may assume that a similar frame supports the far side of the car.) The centre of gravity of the car is at !$G!$. Determine the magnitude of forces !$F_F!$ and !$F_R!$ exerted by the front and rear wheels on frame members !$AB!$ and !$BC!$. Then determine the force (magnitude and direction) that frame member !$AB!$ exerts on frame member !$BC!$ at !$B!$, and both the magnitude and direction of the reactions at !$A!$ and !$C!$.`,
        img = `../../images/09CF/09CF03a.png`,
        inputs = QWIZM.getInputOverlays([{
                input: M + ' kg',
                left: 55,
                top: 8
            },
            {
                input: FG + ' mm',
                left: 36.875,
                top: 87,
                rot: 45,
                padding: 0
            },
            {
                input: GB + ' mm',
                left: 46.25,
                top: 87,
                rot: 45
            },
            {
                input: BR + ' mm',
                left: 56,
                top: 87,
                rot: 45
            },
            {
                input: AFx + ' mm',
                left: 26,
                top: 87,
                rot: 45
            },
            {
                input: RCx + ' mm',
                left: 69,
                top: 87,
                rot: 45
            },
            {
                input: RCy + ' mm',
                left: 74,
                top: 38
            },
            {
                input: ACy + ' mm',
                left: 74,
                top: 51
            },
        ]);

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_R !$`,
            units: 'kN',
            marks: 2,
            correctSoln: FR
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_F !$`,
            units: 'kN',
            marks: 2,
            correctSoln: FF
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_B !$`,
            units: 'kN',
            marks: 6,
            correctSoln: R_B
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_B\\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: RBtheta
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
            marks: 2,
            correctSoln: RAtheta
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: 'kN',
            marks: 2,
            correctSoln: RC
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C\\theta !$`,
            units: '&deg;',
            marks: 2,
            correctSoln: RCtheta
        };
        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;
    }

    return `<div class='statement'><h3>Q${qNumber}</h3> (${thisQuiz[qNumber][0]} marks):<p> 
    ${statement}</div>
    <div id = '${qId}img' class='image width120'>
        <img src= ${img}>
        ${inputs}
        </div>
    <form autocomplete="off"><div class='parts'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;

};