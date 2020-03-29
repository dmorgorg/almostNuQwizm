let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR007 = (qNumber) => {
    let qId = 1000121, // question ID number, unique to this question
        uId = QWIZM.state.uId,
        sd = QWIZM.methods.toSigDigs,
        stringify = QWIZM.methods.stringify,
        sin = utils.sin,
        cos = utils.cos,
        asin = utils.asin,
        acos = utils.acos,
        tan = utils.tan,
        atan = utils.atan,
        sigDigs = QWIZM.quiz.sigDigs,
        workingDigs = QWIZM.quiz.workingDigs,
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed);

    //inputs - don't stringify these, use 6y instead of 6.00y
    let a11 = sd(lcrng.getNext(1, 8, 1)),
        a12 = sd(lcrng.getNext(1, 8, 1)),
        b1 = sd(lcrng.getNext(1, 8, 1)),
        a21 = sd(lcrng.getNext(1, 8, 1)),
        a22 = sd(lcrng.getNext(1, 8, 1)),
        b2 = sd(lcrng.getNext(1, 8, 1));



    //calcs - dont want to write 1x for x
    let a11b = a11 === 1 ? '' : a11,
        a12b = a12 === 1 ? '' : a12,
        a22b = a22 === 1 ? '' : a22,
        a21b = a21 === 1 ? '' : a21;
    a22 *= -1;
    let D = a11 * a22 - a12 * a21,
        Dx = b1 * a22 - b2 * a12,
        Dy = a11 * b2 - a21 * b1,
        x = stringify(Dx / D),
        y = stringify(Dy / D);

    let statement = `Solve this system of equations for !$x!$ and !$y!$.        
        $$
        \\begin{aligned}
            ${a11b}x + ${a12b}y &= ${b1} \\\\
            ${a21b}x - ${Math.abs(a22b)}y &= ${b2} 
        \\end{aligned}
        $$`;

    return `<div class='statement width50'><h3>Q${qNumber}</h3>: ${statement}<p>
    Temp: a11=${a11}, a12=${a12}, a21=${a21}, a22=${a22}, !$D!$=${D}, !$Dx=${Dx}!$, !$Dy!$=${Dy};<p>
    Ans: !$x!$ = ${x}, !$y!$ = ${y}.
    </div>`;
};