let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR002 = (qNumber) => {
    let qId = 1000033, // question ID number, unique to this question
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
        ov = QWIZM.methods.overlayVariable,
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed);

    //inputs
    let c = sd(lcrng.getNext(2, 4, 0.025), sigDigs),
        a = sd(lcrng.getNext(1.5, 1.64, 0.01) * c, sigDigs),
        b = sd(lcrng.getNext(1.95, 1.975, 0.01) * c, sigDigs),
        A = sd(acos((b * b + c * c - a * a) / (2 * b * c)), sigDigs);

    //calcs
    let a2 = Math.sqrt(b * b + c * c - 2 * b * c * cos(A)),
        B = acos((a * a + c * c - b * b) / (2 * a * c));

    let statement = `Determine the length of !$BC!$ and the angle !$ABC!$. <br\>`,
        // Temp: !$a!$ = ${a} cm, !$b!$ = ${b} cm, !$c!$ = ${c} cm, !$A!$&nbsp;=&nbsp;${A}&deg;<br\>
        // Note: don't overlay <i>a</i>.<br\>`,
        img = `../../images/math02.png`,
        iV1 = ov({
            input: A + '&deg;',
            left: 23,
            top: 81,
            background: 'linen'
        }),
        iV2 = ov({
            input: c + ' cm',
            left: 36,
            top: 90
        }),
        iV3 = ov({
            input: b + ' cm',
            left: 32,
            top: 48,
            rot: 55,
            background: 'none'
        });

    //stringify
    a2 = stringify(a, sigDigs);
    B = stringify(B, sigDigs);


    return `<div class='statement width50'><h3>Q${qNumber}</h3>: ${statement}<br>
    <!-- Ans: !$a!$ = ${a2} cm, !$ABC!$ = ${B}!$^\\circ!$ -->
    </div>
    <div id = '${qId}img' class='image width30'>
    <img src= ${img}>
    ${iV1}
    ${iV2}
    ${iV3}
    </div>`;


};