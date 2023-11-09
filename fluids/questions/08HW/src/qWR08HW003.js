let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qWR08HW003 = (qNumber) => {

    let qId = 1000187; // question ID number, unique to this question    

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
    // input variables EDIT THE FOLLOWING ON A PER-QUESTION BASIS
    let vel = sd(lcrng.getNext(0.8, 2.25, 0.05)),
        length = sd(lcrng.getNext(150, 200, 5)),
        pipeIndex = sd(lcrng.getNext(8, 12, 1), 1),
        nominal = utils.Pipes.S40[pipeIndex][1],
        diam = utils.Pipes.S40[pipeIndex][2],
        C = sd(lcrng.getNext(100, 140, 10), 1),
        elbowIndex = sd(lcrng.getNext(0, utils.LeD.Elbows.length - 1, 1)),
        elbowNominal = utils.LeD.Elbows[elbowIndex][1],
        elbowLeD = utils.LeD.Elbows[elbowIndex][2],
        valveIndex = sd(lcrng.getNext(0, utils.LeD.Valves.length - 1, 1)),
        valveNominal = utils.LeD.Valves[valveIndex][0],
        valveLeD = utils.LeD.Valves[valveIndex][1],
        Leff = sd(length + diam / 1000 * (2 * elbowLeD + valveLeD + 100 + 150)),
        //get hL for given vel
        Q = sd(Math.PI * (diam / 1000) ** 2 / 4 * vel * 1000),
        headloss = stringify(utils.fluids.getHeadLoss(Leff, Q, C, diam));

    Q = stringify(utils.fluids.getQ(Leff, C, diam, headloss));
    length = stringify(length);


    let statement = ` Water flows from an open tank through !$${length} \\textsf{ m}!$ of !$${nominal} !$ !$S40!$ steel pipe with an inside diameter of !$${diam}!$ mm and resistance coefficient !$C=${C}!$. The elbows are !$ ${elbowNominal}!$s with !$\\frac{Le}{D} = ${elbowLeD}!$. There is a ${valveNominal} with !$\\frac{Le}{D}=${valveLeD}!$, a venturi meter with !$\\frac{Le}{D}=100!$, and an angle valve with !$\\frac{Le}{D}=150!$. <p>Neglecting entrance losses, determine !$L_\\textsf{eff}!$, the effective length of the pipe.<p> Now calculate !$Q!$, the flow through the system (you need to disregard velocity head at the pipe exit to solve this conveniently).`;

    let img = `../../images/08HW/qwizmHWQ03.png`;

    let inputs = QWIZM.getInputOverlays([{
        input: headloss + ' m',
        left: 85,
        top: 48,
        // fs: 80  // percentage
        bg: "none"
    }]);

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ L_\\textsf{eff} !$`,
            units: 'm',
            marks: 2,
            correctSoln: Leff
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
    <div id = '${qId}img' class='image width120'>
        <img src= ${img}>        
        ${inputs}
        </div>
    <div class='parts width100'>${QWIZM.methods.questionParts(qNumber)}</div>`;

};