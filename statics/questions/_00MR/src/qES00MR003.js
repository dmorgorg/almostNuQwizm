let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR003 = (qNumber) => {
    let qId = 1000037, // question ID number, unique to this question
        uId = QWIZM.state.uId,
        sd = utils.toSigDigs,
        sin = utils.sin,
        cos = utils.cos,
        asin = utils.asin,
        acos = utils.acos,
        tan = utils.tan,
        atan = utils.atan,
        stringify = utils.stringify,
        sigDigs = QWIZM.quiz.sigDigs,
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed);

    //inputs
    let topChord = sd(lcrng.getNext(30, 40, 0.5), sigDigs),
        multiplier = tan(topChord),
        x1 = sd(lcrng.getNext(2, 3.5, 0.1), sigDigs);



    //calcs
    let y = Math.round(sd(x1 * multiplier, sigDigs) * 5) / 5,
        x = Math.round(sd(x1 * 2 / 3, sigDigs) * 5) / 5,
        phi = sd(atan(y / (x / 2)), sigDigs),
        theta = 90 - sd(atan(y / (1.5 * x)), sigDigs);

    //stringify
    x = stringify(x, sigDigs);
    y = stringify(y, sigDigs);
    phi = stringify(phi, sigDigs);
    theta = stringify(theta, sigDigs);

    let statement = `Determine angles !$\\theta!$ and !$\\phi!$. <br\>
    Temp: topChordAngle = ${topChord}!$^\\circ!$, mult = ${multiplier}, !$x_{AB} = ${x}!$ m, !$y!$&nbsp;=&nbsp;${y} m<br\>
   `;

    let img = `../../images/math03.png`;


    return `<div class='statement width40'><h3>Q${qNumber}</h3>: ${statement}<br>
    Ans: <i>&theta;</i> = ${theta}&deg;, <i>&phi;</i> = ${phi}&deg;
    </div>
    <div class='image width60'><img src= ${img}></div>`;
};