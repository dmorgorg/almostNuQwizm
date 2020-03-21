let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR008 = (qNumber) => {
    let qId = 1000133, // question ID number, unique to this question
        uId = QWIZM.state.uId,
        sd = utils.toSigDigs,
        stringify = utils.stringify,
        sin = utils.sin,
        cos = utils.cos,
        asin = utils.asin,
        acos = utils.acos,
        tan = utils.tan,
        atan = utils.atan,
        sigDigs = QWIZM.quiz.sigDigs,
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed);

    //inputs
    let theta = sd(lcrng.getNext(21, 24, 0.1), sigDigs),
        phi = sd(lcrng.getNext(52, 60, 0.1), sigDigs),
        W = sd(lcrng.getNext(100, 200, 5), sigDigs) * 9.81,
        b1 = sd(W, sigDigs),
        b2 = 0;

    //calcs
    let a11 = sin(theta),
        a12 = sin(phi),
        a21 = cos(theta),
        a22 = -cos(phi),
        D = a11 * a22 - a12 * a21,
        Dx = b1 * a22 - b2 * a12,
        Dy = a11 * b2 - a21 * b1,
        x = stringify(Dx / D, sigDigs),
        y = stringify(Dy / D, sigDigs);



    let statement = `Solve this system of equations for !$F_{AC}!$ and !$F_{BC}!$.
        
        $$
        \\begin{aligned}
            F_{BC}\\cdot\\sin\\left(${phi}^\\circ\\right) +F_{AC}\\cdot\\sin\\left(${theta}^\\circ\\right)  &= ${W} \\\\
            F_{BC}\\cdot\\cos\\left(${phi}^\\circ\\right) - F_{BC}\\cdot\\cos\\left(${theta}^\\circ\\right) &= 0 
        \\end{aligned}
        $$`;



    return `<div class='statement width50'><h3>Q${qNumber}</h3>: ${statement}<p>
    Temp: !$ a_{11}=${a11} !$  , a12=${a12}, a21=${a21}, a22=${a22}, !$D!$=${D}, !$Dx=${Dx}!$, !$Dy!$=${Dy};<p>
    Ans: !$FAC!$ = ${x}, !$FBC!$ = ${y}.
    

    </div>`;
};