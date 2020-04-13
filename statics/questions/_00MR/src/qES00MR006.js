let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR006 = (qNumber) => {
    // common for import?
    let uId = QWIZM.state.uId,
        sd = QWIZM.methods.toSigDigs,
        stringify = QWIZM.methods.stringify,
        sin = utils.sin,
        cos = utils.cos,
        asin = utils.asin,
        acos = utils.acos,
        tan = utils.tan,
        atan = utils.atan,
        thisQuiz = QWIZM.state.thisQuiz,
        ov = QWIZM.methods.overlayVariable,
        qp = QWIZM.methods.questionPart;

    let qId = 1000117, // question ID number, unique to this question        
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed);

    thisQuiz[qNumber] = []; // thisQuiz is created at valid login so may cause errors when building new questions; reset and login should handle those.
    let tQ = thisQuiz[qNumber];

    //inputs
    let OA = stringify(lcrng.getNext(0.5, 2.5, 0.1)),
        multOB = lcrng.getNext(1.8, 2.2, 0.05),
        OB = stringify(Math.round(multOB * OA / 0.005) * 0.005),
        multAC = lcrng.getNext(1, 1.4, 0.05),
        AC = stringify(Math.round(multAC * OA / 0.005) * 0.005),
        multBC = lcrng.getNext(1.7, 1.9, 0.05),
        BC = stringify(Math.round(multBC * OA / 0.005) * 0.005);

    //calcs
    let AB = Math.sqrt(OA ** 2 + OB ** 2),
        angleACB = sd(acos((AC ** 2 + BC ** 2 - AB ** 2) / (2 * AC * BC))),
        angleABC = sd(asin(AC * sin(angleACB) / AB)),
        angleOBA = sd(atan(OA / OB)),
        phi = angleABC + angleOBA,
        theta = 180 - phi - angleACB;

    //stringify
    AB = stringify(AB);
    angleACB = stringify(angleACB);
    angleABC = stringify(angleABC);
    angleOBA = stringify(angleOBA);
    phi = stringify(phi);
    theta = stringify(theta);



    let statement = `A typical question in Statics is to determine the tension in rods !$AC!$, !$BC!$ and !$CW!$.To solve this, we need to find the angles !$\\theta!$ and !$\\phi!$. Follow the steps outlined below, in order, to find these angles:`,
        img = `../../images/math06.png`,
        iV1 = ov({
            input: AC + ' m',
            left: 35,
            top: 49,
            rot: -26.5,
            fontSize: 1.75,
            background: 'none'
        }),
        iV2 = ov({
            input: BC + ' m',
            left: 60.5,
            top: 38,
            rot: 56.25,
            fontSize: 1.75,
            background: 'none'
        }),
        iV3 = ov({
            input: OA + ' m',
            left: 11.5,
            top: 32,
            rot: 90,
            fontSize: 1.75,
            background: '#cdc8b0'
        }),
        iV4 = ov({
            input: OB + ' m',
            left: 49,
            top: 10,
            fontSize: 1.75,
            background: '#cdc8b0'
        });

    // thisQuiz.push(questionPart)
    tQ.push(qp({
        partStatement: `Length of !$ AB !$`,
        units: 'm',
        marks: 3,
        correctSoln: AB
    }));
    tQ.push(qp({
        partStatement: `!$ \\angle ACB !$`,
        units: '!$^\\circ!$',
        marks: 4,
        correctSoln: angleACB
    }));
    tQ.push(qp({
        partStatement: `!$ \\angle ABC !$`,
        units: '!$^\\circ!$',
        marks: 4,
        correctSoln: angleABC
    }));
    tQ.push(qp({
        partStatement: `!$ \\angle OBA !$`,
        units: '!$^\\circ!$',
        marks: 3,
        correctSoln: angleOBA
    }));
    tQ.push(qp({
        partStatement: `!$ \\phi !$`,
        units: '!$^\\circ!$',
        marks: 3,
        correctSoln: phi
    }));
    tQ.push(qp({
        partStatement: `!$ \\theta !$`,
        units: '!$^\\circ!$',
        marks: 3,
        correctSoln: theta
    }));


    return `
    <div class='statement width50'><h3>Q${qNumber}</h3>: ${statement}</div>
    <div class='image width50'><img src= ${img}>
    ${iV1}
    ${iV2}
    ${iV3}
    ${iV4}
    </div>
    <form autocomplete="off"><div class='parts width50'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;


};