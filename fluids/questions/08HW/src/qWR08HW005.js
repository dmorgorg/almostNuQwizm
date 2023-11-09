let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qWR08HW005 = (qNumber) => {

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
        partMarks = 0,
        inputs, // declaring inputs here allows for zero input overlays without breaking program
        debug = false;

    let pipeIndexAB = sd(lcrng.getNext(16, 21, 1), 1),
        lAB = sd(lcrng.getNext(100, 400, 5)),
        dAB = utils.Pipes.S40[pipeIndexAB][2],
        cAB = sd(lcrng.getNext(100, 140, 10)),

        pipeIndexBC2 = sd(lcrng.getNext(pipeIndexAB - 5, pipeIndexAB - 4, 1), 1),
        len2 = sd(lcrng.getNext(600, 800, 5)),
        d2 = utils.Pipes.S40[pipeIndexBC2][2],
        c2 = sd(lcrng.getNext(100, 150, 10)),

        mult = sd(lcrng.getNext(1.1, 1.3, 0.01)),
        len1 = Math.round(len2 * mult / 5) * 5,
        pipeIndexBC1 = sd(lcrng.getNext(pipeIndexBC2 + 1, pipeIndexAB - 3, 1), 1),
        d1 = utils.Pipes.S40[pipeIndexBC1][2],
        c1 = sd(lcrng.getNext(100, 150, 10)),

        mult2 = sd(lcrng.getNext(1.1, 1.3, 0.01)),
        len3 = Math.round(len1 * mult2 / 5) * 5,
        pipeIndexBC3 = sd(lcrng.getNext(pipeIndexBC1 + 1, pipeIndexAB - 2, 1), 1),
        d3 = utils.Pipes.S40[pipeIndexBC3][2],
        c3 = sd(lcrng.getNext(100, 150, 5)),

        dCD = utils.Pipes.S40[pipeIndexAB + 1][2],
        lCD = sd(lcrng.getNext(100, 400, 5)),
        cCD = sd(lcrng.getNext(100, 140, 10)),

        // calcs
        LeffAB = sd(lAB + dAB / 1000 * 100), // check valve       
        Leff1 = sd(len1 + d1 / 1000 * (340 + 30 + 30)), // globe and two elbows
        Leff2 = sd(len2 + d2 / 1000 * 340), // globe valve
        Leff3 = sd(len3 + d3 / 1000 * (30 + 150)), // elbow and angle valve
        LeffCD = sd(lCD + dCD / 1000 * 35), // gate valve

        // get flows from B to C for hL=10
        Q1 = sd(utils.fluids.getQ(Leff1, c1, d1, 10)),
        Q2 = sd(utils.fluids.getQ(Leff2, c2, d2, 10)),
        Q3 = sd(utils.fluids.getQ(Leff3, c3, d3, 10)),
        percent = sd(Q2 / (Q1 + Q2 + Q3) * 100),

        // get hL_AD for a flow of 100 L/s
        hLAB100 = sd(utils.fluids.getHeadLoss(LeffAB, 100, cAB, dAB)),
        hLBC100 = sd(utils.fluids.getHeadLoss(Leff2, percent, c2, d2)),
        hLCD100 = sd(utils.fluids.getHeadLoss(LeffCD, 100, cCD, dCD)),
        hLAD100 = sd(hLAB100 + hLBC100 + hLCD100),

        //equivAD
        equivAD = sd((279000 * 100 / 100 / (hLAD100 / 1000) ** 0.54) ** 0.3802),

        maxVel = sd(lcrng.getNext(2, 3, 0.05)),
        // pipe velocities for Q=100 L/s
        v1 = sd(100 * Q1 / (Q1 + Q2 + Q3) / 1000 / (Math.PI * (d1 / 1000) ** 2 / 4)),
        v2 = sd(100 * Q2 / (Q1 + Q2 + Q3) / 1000 / (Math.PI * (d2 / 1000) ** 2 / 4)),
        v3 = sd(100 * Q3 / (Q1 + Q2 + Q3) / 1000 / (Math.PI * (d3 / 1000) ** 2 / 4)),
        vAB = sd(100 / 1000 / (Math.PI * (dAB / 1000) ** 2 / 4)),
        vCD = sd(100 / 1000 / (Math.PI * (dCD / 1000) ** 2 / 4)),
        maxVel100 = sd(Math.max(v1, v2, v3, vAB, vCD)),
        Q0 = 100 * maxVel / maxVel100,

        //headloss for this Q
        z = stringify(1000 * (279000 * Q0 / 100 / equivAD ** 2.63) ** 1.852),

        //recalculate flow for rounded z;
        Q = sd(100 * equivAD ** 2.63 * (z / 1000) ** 0.54 / 279000);

    LeffAB = stringify(LeffAB);
    Leff1 = stringify(Leff1);
    Leff2 = stringify(Leff2);
    Leff3 = stringify(Leff3);
    LeffCD = stringify(LeffCD);
    percent = stringify(percent);
    hLAD100 = stringify(hLAD100);
    equivAD = stringify(equivAD);
    Q = stringify(Q);

    let statement = `All elbows are standard with  !$Le/D = 30!$. For equivalent pipes, use !$L = 1000 \\textsf{ m}!$ and !$C = 100!$. Disregard entrance and exit losses, and any losses at junctions !$B!$ and !$C!$.
    <p>Find the effective length of each of the pipes, which have the following valves and fittings:
    $$\\small \\begin{array}{rcl}
        AB\\space:&\\space\\textsf{Check-valve,} &Le/D = 100 \\\\
        BC1\\space:&\\space\\textsf{Globe-valve,} &Le/D = 340 \\\\
        BC2\\space:&\\space\\textsf{Globe-valve,} &Le/D = 340 \\\\
        BC3\\space:&\\space\\textsf{Angle-valve,} &Le/D = 150 \\\\
        CD\\space:&\\space\\textsf{Gate-valve,} &Le/D = 35
    \\end{array} $$
    <p>Determine the percentage of the system flow which goes through pipe !$ BC2 !$
    <p>Assume a system flow of !$Q=100\\textsf{ L/s}!$. Determine the head loss, !$ hL_{AD:Q=100} !$ between !$A!$ and !$D!$.
    <p>Calculate the diameter, !$ D_{equivAD} !$, of the pipe equivalent to the system between !$A!$ and !$D!$.
    <p>Given that the elevation difference between the surfaces of the two tanks (which are both open to the atmosphere) is !$ z=${z}\\textsf{ m}!$, determine the flow, !$Q!$, through the system.     `;

    let img = `../../images/08HW/qwizmHWQ05b.png`;

    inputs = QWIZM.getInputOverlays([{
            input: `!$
               \\begin{aligned}
                    L &= ${lAB} \\textsf{ m}\\\\
                    D &= ${dAB} \\textsf{ mm}\\\\
                    C &= ${cAB}
                \\end{aligned}
                !$`,
            left: 22,
            top: 80,
            fs: 90, // percentage
            bg: "none"
        }, {
            input: `!$  L = ${len2} \\textsf{ m}, D = ${d2} \\textsf{ mm}, C = ${c2} !$`,
            left: 50,
            top: 67,
            fs: 90, // percentage
            bg: "none"
        }, {
            input: `!$  L = ${len1} \\textsf{ m}, D = ${d1} \\textsf{ mm}, C = ${c1} !$`,
            left: 50,
            top: 42,
            fs: 90, // percentage
            bg: "none"
        }, {
            input: `!$  L = ${len3} \\textsf{ m}, D = ${d3} \\textsf{ mm}, C = ${c3} !$`,
            left: 50,
            top: 84,
            fs: 90, // percentage
            bg: "none"
        }, {
            input: `!$
            \\begin{aligned}
                 L &= ${lCD} \\textsf{ m}\\\\
                 D &= ${dCD} \\textsf{ mm}\\\\
                 C &= ${cCD}
             \\end{aligned}
             !$`,
            left: 79,
            top: 80,
            fs: 90, // percentage
            bg: "none"
        },
        {
            input: `!$ z = ${z} \\textsf{ m}  !$`,
            left: 79,
            top: 27,
            fs: 90,
            bg: "none"
        }


    ]);

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ L_\\textsf{eff}AB !$`,
            units: 'm',
            marks: 1,
            correctSoln: LeffAB
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ L_\\textsf{eff}BC1 !$`,
            units: 'm',
            marks: 1,
            correctSoln: Leff1
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ L_\\textsf{eff}BC2 !$`,
            units: 'm',
            marks: 1,
            correctSoln: Leff2
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ L_\\textsf{eff}BC3 !$`,
            units: 'm',
            marks: 1,
            correctSoln: Leff3
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ L_\\textsf{eff}CD !$`,
            units: 'm',
            marks: 1,
            correctSoln: LeffCD
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ Q_{BC2} !$`,
            units: '%',
            marks: 6,
            correctSoln: percent
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ hL_{AD:Q=100} !$`,
            units: 'm',
            marks: 6,
            correctSoln: hLAD100
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ D_{equivAD} !$`,
            units: 'mm',
            marks: 2,
            correctSoln: equivAD
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ Q !$`,
            units: 'L/s',
            marks: 4,
            correctSoln: Q
        };


        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;


    }

    return `<div class='statement'><h3>Q${qNumber}</h3> (${thisQuiz[qNumber][0]} marks):<p> 
    ${statement}</div>
    <div id = '${qId}img' class='image width130'>
        <img src= ${img}>        
        ${inputs}
        </div>
    <div class='parts width100'>${QWIZM.methods.questionParts(qNumber)}</div>`;

};