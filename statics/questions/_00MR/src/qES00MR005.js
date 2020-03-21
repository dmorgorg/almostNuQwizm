let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR005 = (qNumber) => {
    let qId = 1000081, // question ID number, unique to this question
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
    let AC = sd(lcrng.getNext(5, 15, 0.5), sigDigs),
        multiplier = lcrng.getNext(0.55, 0.75, 0.05),
        AD = sd(AC * multiplier, sigDigs);

    //calcs
    let CD = Math.sqrt(AC ** 2 - AD ** 2),
        AB = AD * AC / CD,
        BC = AB * AD / AC;


    //stringify
    AC = stringify(AC, sigDigs);
    AD = stringify(AD, sigDigs);
    CD = stringify(CD, sigDigs);
    AB = stringify(AB, sigDigs);
    BC = stringify(BC, sigDigs);


    let statement = `Using the Pythagorean Theorem and the theory of similar triangles, determine the lengths of  !$AB!$, !$BD!$ and !$CD!$.
    <!-- Inputs: AC = ${AC} cm, AD = ${AD} cm<p> -->`,
        img = `../../images/math05.png`,
        iV1 = ov({
            input: AC,
            left: 40,
            top: 86,
            fontSize: 1.6,
            background: 'none'
        }),
        iV2 = ov({
            input: AD,
            left: 17,
            top: 53,
            fontSize: 1.6,
            background: 'none',
            rot: 53.5
        });


    return `<div class='statement width45 taleft'><h3>Q${qNumber}</h3>: ${statement}
    <!-- Ans: <i>CD</i> = ${CD} cm, <i>AB</i> = ${AB} cm, <i>BC</i> = ${BC} cm; -->
    </div>
    <div class='image width35'><img src= ${img}>
    ${iV1}
    ${iV2}
    </div>`;
};