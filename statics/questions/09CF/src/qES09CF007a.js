let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF007a = (qNumber) => {

    let qId = 1000183; // question ID number, unique to this question    

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
    let AB = sd(stringify(lcrng.getNext(2, 3, 0.05))),
        mult = sd(stringify(lcrng.getNext(0.75, 0.85, 0.01))),
        BC = sd(stringify(Math.round(AB * mult * 5) / 5)),
        DL = sd(stringify(lcrng.getNext(2, 4, 0.05)));

    //calcs
    let DL2 = sd(DL * BC / (AB + BC)),
        W2 = sd(DL2 * BC / 2),
        RC = sd(W2 / 3),
        RB = sd(2 / 3 * W2),
        W1rect = sd(DL2 * AB),
        W1tri = sd(DL - DL2) * AB / 2,
        RA = sd(W1rect + W1tri + RB),
        MA = sd(AB * (W1tri / 3 + W1rect / 2 + RB));


    //stringify - defaults to sigDigs
    AB = stringify(AB);
    BC = stringify(BC);
    DL = stringify(DL);
    RC = stringify(RC * 1000);
    RB = stringify(RB * 1000);
    RA = stringify(RA);
    MA = stringify(MA);


    let statement = `There is a fixed connection at !$A!$, a pinned connection at !$B!$ and a rocker at !$C!$. Determine the magnitude of the reactions at !$A, B!$ and !$C!$, and the reacting moment !$M_A!$ at !$A!$, due to the uniformly varying load shown.<br>${RC}`,
        img = `../../images/09CF/09CF07a.png`,
        iV1 = ov({
            input: AB + ' m',
            left: 37,
            top: 83.5
        }),
        iV2 = ov({
            input: BC + ' m',
            left: 74,
            top: 83.5,
            //background: 'yellow'
        }),
        iV3 = ov({
            input: DL + ' kN/m',
            left: 23.5,
            top: 16,
            background: 'none'
        });

    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_C !$`,
            units: 'N',
            marks: 6,
            correctSoln: RC
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_B !$`,
            units: 'N',
            marks: 2,
            correctSoln: RB
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ R_A !$`,
            units: 'kN',
            marks: 6,
            correctSoln: RA
        };

        thisQuestion[arrayCount++] = {
            partStatement: `!$ M_A !$`,
            units: 'kN!$\\cdot!$m',
            marks: 4,
            correctSoln: MA
        };

    }

    return `<div class='statement width50'><h3>Q${qNumber}</h3>: 
    ${statement}</div>
    <div id = '${qId}img' class='image width55'>
        <img src= ${img}>
        ${iV1}
        ${iV2}
        ${iV3}
    </div>
    <form autocomplete="off"><div class='parts paddingLeft5 width55'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;

};