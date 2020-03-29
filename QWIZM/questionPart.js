"use strict";

var QWIZM = QWIZM || {};

QWIZM.questionPart = function (o) {
  return {
    symbol: o.symbol,
    units: o.units,
    marks: o.marks,
    "long": o["long"],
    userSoln: o.userSoln,
    isAnswered: utils.asin,
    acos: utils.acos,
    tan: utils.tan,
    atan: utils.atan,
    sigDigs: QWIZM.quiz.sigDigs,
    ov: QWIZM.methods.overlayVariable
  };
};