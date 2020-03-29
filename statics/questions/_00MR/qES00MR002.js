"use strict";

var QWIZM = QWIZM || {};
QWIZM.question = QWIZM.question || {};

QWIZM.question.qES00MR002 = function (qNumber) {
  var qId = 1000033,
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
  // console.log(stringify(lcrng.getNext(2, 4, 0.025)))

  var c = stringify(lcrng.getNext(2, 4, 0.025)),
      a = stringify(lcrng.getNext(1.5, 1.64, 0.01) * c),
      b = stringify(lcrng.getNext(1.95, 1.975, 0.01) * c),
      A = stringify(acos((b * b + c * c - a * a) / (2 * b * c))); //calcs

  var a2 = Math.sqrt(b * b + c * c - 2 * b * c * cos(A)),
      B = acos((a * a + c * c - b * b) / (2 * a * c));
  var statement = "Determine the length of !$BC!$ and the angle !$ABC!$. <br>\n        Temp: !$a!$ = ".concat(a, " cm, !$b!$ = ").concat(b, " cm, !$c!$ = ").concat(c, " cm, !$A!$&nbsp;=&nbsp;").concat(A, "&deg;<br>"),
      img = "../../images/math02.png",
      iV1 = ov({
    input: A + '&deg;',
    left: 31,
    top: 84,
    background: 'linen'
  }),
      iV2 = ov({
    input: c + ' cm',
    left: 50,
    top: 93,
    background: 'none'
  }),
      iV3 = ov({
    input: b + ' cm',
    left: 46,
    top: 49,
    rot: 55,
    background: 'none'
  }); //stringify

  a2 = stringify(a, sigDigs);
  B = stringify(B, sigDigs);
  return "<div class='statement width50'><h3>Q".concat(qNumber, "</h3>: ").concat(statement, "<br>\n     Ans: !$a!$ = ").concat(a2, " cm, !$ABC!$ = ").concat(B, "!$^\\circ!$\n    </div>\n    <div id = '").concat(qId, "img' class='image width30'>\n    <img src= ").concat(img, ">\n    ").concat(iV1, "\n    ").concat(iV2, "\n    ").concat(iV3, "\n    </div>");
};