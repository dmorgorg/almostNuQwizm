"use strict";

var katexify = function katexify() {
    renderMathInElement(document.body, {
        delimiters: [{
            left: "$$",
            right: "$$",
            display: true
        }, {
            left: "\\[",
            right: "\\]",
            display: true
        }, {
            left: "!$",
            right: "!$",
            display: false
        }, {
            left: "\\(",
            right: "\\)",
            display: false
        }]
    });
};