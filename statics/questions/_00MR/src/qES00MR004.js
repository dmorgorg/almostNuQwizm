let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR004 = (qNumber) => {
    let qId = 1000039, // question ID number, unique to this question
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
    let AB = sd(lcrng.getNext(400, 600, 5), sigDigs),
        BCmult = sd(lcrng.getNext(1.35, 1.65, 0.025), sigDigs),
        CDmult = sd(lcrng.getNext(1.6, 1.9, 0.025), sigDigs),
        DEmult = sd(lcrng.getNext(0.775, 0.975, 0.025), sigDigs),
        BFmult = sd(lcrng.getNext(1.35, 1.65, 0.025), sigDigs),
        BC = Math.round(AB * BCmult / 5) * 5,
        CD = Math.round(AB * CDmult / 5) * 5,
        DE = Math.round(AB * DEmult / 5) * 5,
        BF = Math.round(AB * BFmult / 5) * 5,
        strain = lcrng.getNext(1.5, 2.0, 0.1),
        deltaDE1 = DE * strain / 1000,
        dA = sd(deltaDE1 * (AB + BC) / CD, sigDigs);

    //calcs
    let deltaBF = dA * BC / (AB + BC),
        deltaDE = -dA * CD / (AB + BC);

    //stringify
    dA = stringify(dA, sigDigs);
    deltaBF = stringify(deltaBF, sigDigs);
    deltaDE = stringify(deltaDE, sigDigs);


    let statement = `!$ABCD!$ is a rigid plate, able to rotate about a pinned connection at !$C!$. !$ABCD!$ is held in position by linkages !$BF!$ and !$DE!$. When force !$P!$ is applied at !$A!$, !$A!$ moves rightwards a distance of ${dA} mm as plate !$ABCD!$ rotates about !$C!$. !$BF!$ increases in length (deforms) but can be assumed to remain horizontal. !$DE!$ decreases in length (its deformation is negative) but remains vertical. <p>
    Determine the deformation !$\\delta_{BF}!$ in !$BF!$ and the deformation !$\\delta_{DE}!$ in !$DE!$. <p>
    Inputs: AB = ${AB} mm, BC = ${BC} mm, CD = ${CD} mm, DE = ${DE} mm, BF = ${BF} mm, deltaDE = ${deltaDE1} mm<p>
    
    <p>
    
   `;

    let img = `../../images/math04.png`;


    return `<div class='statement width60'><h3>Q${qNumber}</h3>: ${statement}<br>
    Ans: <i>&delta;<sub>DE</sub></i> = ${deltaDE} mm, <i>&delta;<sub>BF</sub></i> = ${deltaBF} mm;
    </div>
    <div class='image width45'><img src= ${img}></div>`;
};