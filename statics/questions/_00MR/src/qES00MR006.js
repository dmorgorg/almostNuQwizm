let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR006 = (qNumber) => {
    let qId = 1000117, // question ID number, unique to this question
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
        ov = QWIZM.methods.overlayVariable,
        seed = qId > uId ? qId % uId : uId === qId ? uId : uId % qId,
        lcrng = new utils.LCRNG(seed);

    //inputs
    let OA = stringify(lcrng.getNext(0.5, 2.5, 0.1)),
        multOB = lcrng.getNext(1.8, 2.2, 0.05),
        OB = stringify(Math.round(multOB * OA / 0.005) * 0.005),
        multAC = lcrng.getNext(1, 1.4, 0.05),
        AC = stringify(Math.round(multAC * OA / 0.005) * 0.005),
        multBC = lcrng.getNext(1.7, 1.9, 0.05),
        BC = stringify(Math.round(multBC * OA / 0.005) * 0.005);

    //calcs
    let AB = Math.sqrt(OA ** 2 + OB ** 2),
        angleACB = acos((AC ** 2 + BC ** 2 - AB ** 2) / (2 * AC * BC)),
        angleABC = asin(AC * sin(angleACB) / AB),
        angleOBC = atan(OA / OB),
        phi = angleABC + angleOBC,
        theta = 180 - phi - angleACB;

    //stringify
    // OA = stringify(OA);
    // OB = stringify(OB);
    // AC = stringify(AC);
    // AB = stringify(AB);
    angleACB = stringify(angleACB);
    angleABC = stringify(angleABC);
    angleOBC = stringify(angleOBC);
    phi = stringify(phi);
    theta = stringify(theta);



    let statement = `A typical question in Statics is to determine the tension in rods !$AC!$, !$BC!$ and !$CW!$.To solve this, we need to find the angles !$\\theta!$ and !$\\phi!$. Follow the steps outlined below to find these angles:
    <ol>
        <li>Determine length !$AB!$</li>
        <li>Determine !$\\angle ACB!$</li>
        <li>Determine !$ \\angle ABC!$</li>
        <li>Determine !$\\angle OBA !$</li>
        <li>Determine !$\\phi!$</li>
        <li>Determine !$\\theta!$</li>
    </ol>
    <!-- Inputs: !$OA!$ = ${OA} m, !$OB!$ = ${OB} m, !$AC!$ = ${AC}&nbsp;m, !$BC%!$&nbsp;=&nbsp;${BC}&nbsp;m<p>    
    <p> -->   
   `,
        img = `../../images/math06.png`,
        iV1 = ov({
            input: AC + ' m',
            left: 35,
            top: 49,
            rot: -26.5,
            fontSize: 1.5,
            background: 'none'
        }),
        iV2 = ov({
            input: BC + ' m',
            left: 60.5,
            top: 38,
            rot: 56.25,
            fontSize: 1.5,
            background: 'none'
        }),
        iV3 = ov({
            input: OA + ' m',
            left: 11.5,
            top: 32,
            rot: 90,
            fontSize: 1.5,
            background: '#cdc8b0'
        }),
        iV4 = ov({
            input: OB + ' m',
            left: 49,
            top: 9.5,
            fontSize: 1.5,
            background: '#cdc8b0'
        });


    return `
    <div class='statement width50 taleft'><h3>Q${qNumber}</h3>: ${statement}<br>
    <!-- Ans: !$AB!$ = ${AB} cm, !$\\angle ACB!$ = ${angleACB}&deg;, !$\\angle ABC!$ = ${angleABC}&deg;, !$\\angle OBC!$ = ${angleOBC}&deg;, !$\\phi = ${phi}^\\circ !$, !$\\theta!$ = ${theta}&deg; -->
    </div>
    <div class='image width40'><img src= ${img}>
    ${iV1}
    ${iV2}
    ${iV3}
    ${iV4}
    </div>`;


};