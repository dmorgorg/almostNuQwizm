let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES01MR006 = (qNumber) => {

    let qId = 1000117; // question ID number, unique to this question   

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
        thisQuestion,
        ov = QWIZM.methods.overlayVariable,
        arrayCount = 0,
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed),
        partMarks = 0,
        debug = false;

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

    let statement = `A typical question in Statics is to determine the tension in rods !$AC!$, !$BC!$ and !$CW!$. To solve this, we need to find the angles !$\\theta!$ and !$\\phi!$. Follow the steps outlined below in order, starting with calculating the length of !$ AB !$, to find these angles:`,
        img = `../../images/01MR/01MR06.png`,
        inputs = QWIZM.getInputOverlays([{
                input: AC + ' m',
                left: 35,
                top: 49,
                rot: -26.5,
                // fontSize: 110,
                background: 'none'
            },
            {
                input: BC + ' m',
                left: 60.5,
                top: 38,
                rot: 56.25,
                // fontSize: 110,
                background: 'none'
            },
            {
                input: OA + ' m',
                left: 11.5,
                top: 32,
                rot: 90,
                // fontSize: 110,
                background: '#cdc8b0'
            },
            {
                input: OB + ' m',
                left: 49,
                top: 10,
                // fontSize: 110,
                background: '#cdc8b0'
            }
        ]);

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];
        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';
        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\left| AB\\right| !$`,
            units: 'm',
            marks: 3,
            correctSoln: AB
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\angle ACB !$`,
            units: '!$^\\circ!$',
            marks: 4,
            correctSoln: angleACB
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\angle ABC !$`,
            units: '!$^\\circ!$',
            marks: 4,
            correctSoln: angleABC
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\angle OBA !$`,
            units: '!$^\\circ!$',
            marks: 3,
            correctSoln: angleOBA
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\phi !$`,
            units: '!$^\\circ!$',
            marks: 3,
            correctSoln: phi
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\theta !$`,
            units: '!$^\\circ!$',
            marks: 3,
            correctSoln: theta
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;
    }


    return `
    <div class='statement'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks):<p>
    ${statement}</div>
    <div id = '${qId}img' class='image width70'><img src= ${img}>
    ${inputs}
    </div>
    <div class='parts'>${QWIZM.methods.questionParts(qNumber)}</div>`;


};