let QWIZM = QWIZM || {};

QWIZM.shorts = () => {
    return {
        uId: QWIZM.state.uId,
        sd: utils.toSigDigs,
        stringify: utils.stringify,
        sin: utils.sin,
        cos: utils.cos,
        asin: utils.asin,
        acos: utils.acos,
        tan: utils.tan,
        atan: utils.atan,
        sigDigs: QWIZM.quiz.sigDigs,
        ov: QWIZM.methods.overlayVariable
    };
}