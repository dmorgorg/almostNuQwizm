let QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES09CF17a = (qNumber) => {

    let qId = 1000357; // question ID number, unique to this question    

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
    let P = lcrng.getNext(2, 4, 0.1),
        ABx = lcrng.getNext(750,850,10),
        CEy = lcrng.getNext(630,700,10),
        DEx = lcrng.getNext(1280,1370,10),
        CDx = sd(stringify(Math.round(DEx*1.5*10)/10)),
        BCx = sd(stringify(Math.round(ABx*1.5*10)/10)),
        mult = lcrng.getNext(4.5, 5.5, 0.1),
        ACy = sd(stringify(Math.round(CEy * mult * 10) / 10));

    //calcs
        let AEy = ACy+CEy,
            GE = sd(ACy*P/AEy),
            FA = P-GE,
            ACx = ABx+BCx,
            ABy = sd(ABx/ACx*ACy),
            BCy=ACy-ABy,
            CEx=DEx+CDx,
            CDy=sd(CDx/CEx*CEy),
            DEy=CEy-CDy,
            BDx=CDx-BCx,
            BDy=BCy+CDy,
            BDtheta=sd(atan(BDy/BDx)),
            FB = sd(ACy*FA/(BCy*cos(BDtheta)+BCx*sin(BDtheta))),
            GD = sd(GE*CEy/(CDx*sin(BDtheta)-CDy*cos(BDtheta))),
            Cx = sd(FB*cos(BDtheta)-FA),
            Cy=sd(FB*sin(BDtheta)),
            FC=sd((Cx**2+Cy**2)**0.5),
            Cx2=-GE-GD*cos(BDtheta),
            Cy2=-GD*sin(BDtheta),
            GC = sd((Cx2 ** 2 + Cy2 ** 2) ** 0.5);
   




    //stringify - defaults to sigDigs
    P = stringify(P);
    ABx = stringify(ABx);
    DEx = stringify(DEx/1000);
    CDx = stringify(CDx/1000);
    BCx = stringify(BCx/1000);
    ACy = stringify(ACy/1000);
    GE = stringify(GE);
    FA = stringify(FA);
    FB = stringify(FB);
    GE = stringify(GE);
    FC = stringify(FC);
    GC = stringify(GC);
    


    let statement = `Frame !$ACD!$ is pinned at !$A!$ and !$C!$. There is a frictionless roller at !$E!$ and a cable from !$B!$ to !$D!$. A horizontal force of ${P} kN is applied to the pin at !$C!$, as shown. Determine the magnitudes of the forces !$F_A!$, !$F_B!$, !$F_C!$ exerted on frame member !$ABC!$ and the forces !$G_C!$, !$G_D!$, !$G_E!$ exerted on frame member !$CDE!$.`,
        img = `../../images/09CF/09CF17a.png`;


    if (!thisQuiz[qNumber] || debug) {
        thisQuiz[qNumber] = [];
        thisQuestion = thisQuiz[qNumber];

        // thisQuiz.push(questionPart)
        thisQuestion[arrayCount++] = '';

        thisQuestion[arrayCount++] = {
            partStatement: `!$ G_E !$`,
            units: 'kN',
            marks: 2,
            correctSoln: GE
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_A !$`,
            units: 'kN',
            marks: 2,
            correctSoln: FA
        };
        
        thisQuestion[arrayCount++] = {
            partStatement: `!$ G_D !$`,
            units: 'kN',
            marks: 2,
            correctSoln: GD
        };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_B !$`,
            units: 'kN',
            marks: 6,
            correctSoln: FB
        };
         thisQuestion[arrayCount++] = {
             partStatement: `!$ G_C !$`,
             units: 'kN',
             marks: 4,
             correctSoln: GC
         };
        thisQuestion[arrayCount++] = {
            partStatement: `!$ F_C !$`,
            units: 'kN',
            marks: 4,
            correctSoln: FC
        };
       

        for (let i = 1; i < thisQuestion.length; i++) {
            partMarks += thisQuestion[i].marks;
        }
        // store question total marks in the empty first element of the array
        thisQuestion[0] = partMarks;


    }

    let inputs = QWIZM.getInputOverlays([{
            input: P + ' kN',
            left: 72,
            top: 68.5,
            fontWeight: 'bold',
            color: '#a00',
            background: 'none'
        },
        {
            input: ABx + ' mm',
            left: 41.75,
            top: 10,
            rot: 45
        },
        {
            input: CEy + ' mm',
            left: 81,
            top: 75.5,
        },
        {
            input: DEx + ' m',
            left: 27,
            top: 89.75,
        },
        {
            input: CDx + ' m',
            left: 49,
            top: 89.75,
        },
        {
            input: BCx + ' m',
            left: 54,
            top: 10.5,
        },
        {
            input: ACy + ' m',
            left: 81,
            top: 47,
        },
      

    ]);

    return `<div class='statement'><h3>Q${qNumber}</h3>(${thisQuiz[qNumber][0]} marks):<p>
    ${statement}</div>
    <div id = '${qId}img' class='image'>
        <img src= ${img}>
       ${inputs}          
    </div>
    <form autocomplete="off"><div class='parts'>${QWIZM.methods.questionParts(qNumber)}</div></form>`;

};