"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR006 = function (qNumber) {
  var qId = 1000117,
      // question ID number, unique to this question
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
      lcrng = new utils.LCRNG(seed); //inputs

  var OA = stringify(lcrng.getNext(0.5, 2.5, 0.1)),
      multOB = lcrng.getNext(1.8, 2.2, 0.05),
      OB = stringify(Math.round(multOB * OA / 0.005) * 0.005),
      multAC = lcrng.getNext(1, 1.4, 0.05),
      AC = stringify(Math.round(multAC * OA / 0.005) * 0.005),
      multBC = lcrng.getNext(1.7, 1.9, 0.05),
      BC = stringify(Math.round(multBC * OA / 0.005) * 0.005); //calcs

  var AB = Math.sqrt(Math.pow(OA, 2) + Math.pow(OB, 2)),
      angleACB = acos((Math.pow(AC, 2) + Math.pow(BC, 2) - Math.pow(AB, 2)) / (2 * AC * BC)),
      angleABC = asin(AC * sin(angleACB) / AB),
      angleOBC = atan(OA / OB),
      phi = angleABC + angleOBC,
      theta = 180 - phi - angleACB; //stringify
  // OA = stringify(OA);
  // OB = stringify(OB);
  // AC = stringify(AC);
  // AB = stringify(AB);

  angleACB = stringify(angleACB);
  angleABC = stringify(angleABC);
  angleOBC = stringify(angleOBC);
  phi = stringify(phi);
  theta = stringify(theta);
  var statement = "A typical question in Statics is to determine the tension in rods !$AC!$, !$BC!$ and !$CW!$.To solve this, we need to find the angles !$\\theta!$ and !$\\phi!$. Follow the steps outlined below to find these angles:\n    <ol>\n        <li>Determine length !$AB!$</li>\n        <li>Determine !$\\angle ACB!$</li>\n        <li>Determine !$ \\angle ABC!$</li>\n        <li>Determine !$\\angle OBA !$</li>\n        <li>Determine !$\\phi!$</li>\n        <li>Determine !$\\theta!$</li>\n    </ol>\n    <!-- Inputs: !$OA!$ = ".concat(OA, " m, !$OB!$ = ").concat(OB, " m, !$AC!$ = ").concat(AC, "&nbsp;m, !$BC%!$&nbsp;=&nbsp;").concat(BC, "&nbsp;m<p>    \n    <p> -->   \n   "),
      img = "../../images/math06.png",
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
  return "\n    <div class='statement width50 taleft'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "<br>\n    <!-- Ans: !$AB!$ = ").concat(AB, " cm, !$\\angle ACB!$ = ").concat(angleACB, "&deg;, !$\\angle ABC!$ = ").concat(angleABC, "&deg;, !$\\angle OBC!$ = ").concat(angleOBC, "&deg;, !$\\phi = ").concat(phi, "^\\circ !$, !$\\theta!$ = ").concat(theta, "&deg; -->\n    </div>\n    <div class='image width40'><img src= ").concat(img, ">\n    ").concat(iV1, "\n    ").concat(iV2, "\n    ").concat(iV3, "\n    ").concat(iV4, "\n    </div>");
};