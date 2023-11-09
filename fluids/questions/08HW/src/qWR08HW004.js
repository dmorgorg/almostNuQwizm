let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qWR08HW004 = (qNumber) => {

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
        partMarks = 0,
        inputs, // declaring inputs here allows for zero input overlays without breaking program
        debug = false;

    let pipeIndex = sd(lcrng.getNext(12, 16, 1), 1),
        lAB = stringify(lcrng.getNext(500, 800, 5)),
        dAB = utils.Pipes.S40[pipeIndex][2],
        cAB = sd(lcrng.getNext(100, 140, 10));

    let pipeIndex1 = sd(lcrng.getNext(6, pipeIndex - 2, 1), 1),
        len1 = sd(lcrng.getNext(800, 1200, 5)),
        d1 = utils.Pipes.S40[pipeIndex1][2],
        c1 = sd(lcrng.getNext(100, 150, 10));

    let pipeIndex2 = sd(lcrng.getNext(pipeIndex1 + 1, pipeIndex), 1),
        len2 = sd(lcrng.getNext(800, 1200, 5)),
        d2 = utils.Pipes.S40[pipeIndex2][2],
        c2 = sd(lcrng.getNext(100, 150, 10));


    let lCD = stringify(lcrng.getNext(500, 800, 5)),
        dCD = dAB,
        cCD = cAB;

    // calcs
    //flow through P1 and P2 for hL=10
    let QP1 = utils.fluids.getQ(len1, c1, d1, 10),
        QP2 = utils.fluids.getQ(len2, c2, d2, 10),
        percent = sd(QP1 / (QP1 + QP2) * 100),
        hLBC100 = sd(utils.fluids.getHeadLoss(len1, percent, c1, d1)),
        equivBC = sd(utils.fluids.getDiameter(1000, 100, 100, hLBC100)),
        hLAB100 = sd(utils.fluids.getHeadLoss(lAB, 100, cAB, dAB)),
        hLCD100 = sd(utils.fluids.getHeadLoss(lCD, 100, cCD, dCD)),
        hLAD100 = hLAB100 + hLBC100 + hLCD100,
        equivAD = sd(utils.fluids.getDiameter(1000, 100, 100, hLAD100)),
        randomVel = sd(lcrng.getNext(1.8, 2.2, 0.01)),
        Q = sd(Math.PI * (equivAD / 1000) ** 2 / 4 * randomVel * 1000),
        hL = sd(utils.fluids.getHeadLoss(1000, Q, 100, equivAD)),
        deltaP = Math.round(9.81 * hL),
        Q3 = sd(utils.fluids.getQ(1000, 100, equivAD, hL));

    percent = stringify(percent);
    hLBC100 = stringify(hLBC100);
    equivBC = stringify(equivBC);
    hLAD100 = stringify(hLAD100);
    equivAD = stringify(equivAD);
    Q3 = stringify(Q3);

    let statement = `Calculate the percentage of the flow from !$A!$ to !$D!$ that travels through the upper pipe !$1!$.
    <p>Assuming a flow through the system of !$100 \\textsf{ L/s}!$, determine the headloss, !$hL_{BC:Q=100}!$, between !$B!$ and !$C!$.
    <p>Determine the diameter, !$D_{equivBC}!$, of a pipe, with !$L=1000\\textsf{ m}!$ and !$C=100!$, that is hydraulically equivalent to the pipes between !$B!$ and !$C!$.
    <p>Still assuming a flow of !$100 \\textsf{ L/s}!$, determine the headloss, !$hL_{AD:Q=100}!$, between !$A!$ and !$D!$
    <p>Determine the diameter, !$D_{equivAD}!$, of a pipe, with !$L=1000\\textsf{ m}!$ and !$C=100!$, that is hydraulically equivalent to the system from !$A!$ to !$D!$.
    <p>The difference in pressure between !$A!$ and !$D!$, which are at the same elevation, is ${deltaP} kPa What is the flow !$Q!$ through the system? 
     `;

    let img = `../../images/08HW/qwizmHWQ04.png`;


    inputs = QWIZM.getInputOverlays([{
            input: `!$
                \\begin{aligned}
                    L &= ${lAB} \\textsf{ m}\\\\
                    D &= ${dAB} \\textsf{ mm}\\\\
                    C &= ${cAB}
                \\end{aligned}
                !$`,
            left: 16,
            top: 70,
            fs: 100, // percentage
            bg: "none"
        }, {
            input: `!$ L = ${len1} \\textsf{ m, } D = ${d1} \\textsf{ mm, }  C= ${c1}  !$`,
            left: 53,
            top: 12,
            fs: 100, // percentage
            bg: "none"
        }, {
            input: `!$ L = ${len2} \\textsf{ m, } D = ${d2} \\textsf{ mm, }  C= ${c2}  !$`,
            left: 53,
            top: 86,
            fs: 100, // percentage
            bg: "none"
        }, {
            input: `!$
                \\begin{aligned}
                    L &= ${lCD} \\textsf{ m}\\\\
                    D &= ${dCD} \\textsf{ mm}\\\\
                    C &= ${cCD}
                \\end{aligned}
                !$`,
            left: 87,
            top: 70,
            fs: 100, // percentage
            bg: "none"
        }

    ]);

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\textsf{Pipe}_1 !$`,
            units: '%',
            marks: 2,
            correctSoln: percent
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$hL_{BC:Q=100}!$`,
            units: 'm',
            marks: 2,
            correctSoln: hLBC100
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$D_{equivBC}!$`,
            units: 'mm',
            marks: 2,
            correctSoln: equivBC
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$hL_{AD:Q=100}!$`,
            units: 'm',
            marks: 2,
            correctSoln: hLAD100
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$D_{equivAD}!$`,
            units: 'mm',
            marks: 2,
            correctSoln: equivAD
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$Q!$`,
            units: 'L/s',
            marks: 2,
            correctSoln: Q3
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
    <div class='parts width100'>${QWIZM.methods.questionParts(qNumber)}</div>`;

};