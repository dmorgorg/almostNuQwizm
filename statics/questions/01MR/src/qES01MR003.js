let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES01MR003 = (qNumber) => {

    let qId = 1000037; // question ID number, unique to this question 

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
    let topChordAngle = (lcrng.getNext(30, 40, 0.5)),
        multiplier = tan(topChordAngle),
        x1 = stringify(lcrng.getNext(2, 3.5, 0.1));

    // convert to number equivalents of string inputs to avoid string concatenation
    // instead of addition!!
    x1 = sd(x1);

    //calcs
    let y = stringify(Math.round(x1 * multiplier * 5) / 5),
        x = stringify(Math.round(x1 * 2 / 3 * 5) / 5),
        phi = stringify(atan(y / (x / 2))),
        theta = 90 - stringify(atan(y / (1.5 * x)));

    let statement = `Determine angles !$\\theta!$ and !$\\phi!$.`,
        img = `../../images/01MR/01MR03.png`,
        inputs = QWIZM.getInputOverlays([{
                input: x + ' m',
                left: 27,
                top: 86
            },
            {
                input: x + ' m',
                left: 51.5,
                top: 86
            },
            {
                input: x + ' m',
                left: 75.5,
                top: 86
            },
            {
                input: y + ' m',
                left: 7,
                top: 38
            }
        ]);



    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];
        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';
        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\theta !$`,
            units: '!$^\\circ!$',
            marks: 5,
            correctSoln: theta
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ \\phi !$`,
            units: '!$^\\circ!$',
            marks: 5,
            correctSoln: phi
        };

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;
    }

    return `<div class='statement width60'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks):
     ${statement}    
    </div>
    <div id = '${qId}img' class='image'><img src= ${img}>
     ${inputs}
    </div>
    <div class='parts'>${QWIZM.methods.questionParts(qNumber)}</div>`;

};