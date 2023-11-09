let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qWR08HW001 = (qNumber) => {

    let qId = 1000171; // question ID number, unique to this question    

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


    let lAB = sd(lcrng.getNext(800, 1200, 5)),
        dAB = sd(lcrng.getNext(200, 400, 5)),
        cAB = sd(lcrng.getNext(100, 140, 10)),

        lBC = sd(lcrng.getNext(800, 1200, 5)),
        dBC = sd(lcrng.getNext(500, 700, 5)),
        cBC = sd(lcrng.getNext(100, 150, 10)),

        lCD = sd(lcrng.getNext(800, 1200, 5)),
        dCD = sd(lcrng.getNext(200, 500, 5)),
        cCD = sd(lcrng.getNext(100, 150, 10)),

        minDiam = Math.min(dAB, dCD),
        maxVel = sd(lcrng.getNext(1.8, 2.3, .01)),

        // this is the Q we'll use
        Q = stringify(Math.PI * (minDiam / 1000) * (minDiam / 1000) / 4 * maxVel * 1000);

    // calculations,
    let hLAB = sd(utils.fluids.getHeadLoss(lAB, Q, cAB, dAB)),
        hLBC = sd(utils.fluids.getHeadLoss(lBC, Q, cBC, dBC)),
        hLCD = sd(utils.fluids.getHeadLoss(lCD, Q, cCD, dCD));

    // solutions
    let totalLoss = sd(hLAB + hLBC + hLCD, wd),
        equivLength = 1000,
        equivDiam = Math.round(utils.fluids.getDiameter(equivLength, Q, 100,
            totalLoss) / 5) * 5,
        newQ = Math.round(Math.PI * Math.pow(equivDiam / 1000, 2) / 4 * maxVel * 1000 / 10) * 10,
        hLequiv = sd(utils.fluids.getHeadLoss(equivLength, newQ, 100, equivDiam));

    // round or pad for correct solution
    hLAB = stringify(hLAB);
    hLBC = stringify(hLBC);
    hLCD = stringify(hLCD);
    hLequiv = stringify(hLequiv);

    // Q = stringify(Q);
    newQ = stringify(newQ);



    let statement = `Water flows from !$A!$ to !$D!$, through the pipes !$AB!$, !$BC!$ and !$CD!$ at a rate of !$${Q}!$ L/s.<p>Determine the head loss in each pipe.<p>Then find the diameter, !$D_{equiv AD}!$, (to the nearest 5&nbsp;mm) of the pipe with length <br>!$L=${equivLength}!$ m and resistance coefficient !$C=100!$ that is hydraulically  equivalent to pipe system from !$A!$ to !$D!$. <p>Finally, use the equivalent pipe that you\'ve just found to determine the headloss between !$A!$ and !$D!$ if the flow is changed to !$${newQ}!$  L/s.<p>Disregard all minor losses.
     `;

    let img = `../../images/08HW/qwizmHWQ01.png`;

    let inputs = QWIZM.getInputOverlays([{
            input: `!$
                    \\begin{aligned}
                    L &= ${lAB} \\textsf{ m}\\\\
                    D &= ${dAB} \\textsf{ mm}\\\\
                    C &= ${cAB} 
                    \\end{aligned}
                    !$`,
            left: 18,
            top: 55,
            // fs: 80  // percentage
            bg: "none"
        }, {
            input: `!$
                    \\begin{aligned}
                    L &= ${lBC} \\textsf{ m}\\\\
                    D &= ${dBC} \\textsf{ mm}\\\\
                    C &= ${cBC} 
                    \\end{aligned}
                    !$`,
            left: 44,
            top: 55,
            bg: "none"

        }, {
            input: `!$
                    \\begin{aligned}
                    L &= ${lCD} \\textsf{ m}\\\\
                    D &= ${dCD} \\textsf{ mm}\\\\
                    C &= ${cCD} 
                    \\end{aligned}
                    !$`,
            left: 78,
            top: 42,
            bg: "none"
        }

    ]);


    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ hL_{AB} !$`,
            units: 'm',
            marks: 2,
            correctSoln: hLAB
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ hL_{BC} !$`,
            units: 'm',
            marks: 2,
            correctSoln: hLBC
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ hL_{CD} !$`,
            units: 'm',
            marks: 2,
            correctSoln: hLCD
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ D_{equivAD} !$`,
            units: 'mm',
            marks: 2,
            correctSoln: equivDiam
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ hL_{AD} !$`,
            units: 'm',
            marks: 2,
            correctSoln: hLequiv
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;


    }

    return `<div class='statement'><h3>Q${qNumber}</h3> (${thisQuiz[qNumber][0]} marks):<p> 
    ${statement}</div>
    <div id = '${qId}img' class='image width100'>
        <img src= ${img}>        
        ${inputs}
        </div>
    <div class='parts width100'>${QWIZM.methods.questionParts(qNumber)}</div>`;

};