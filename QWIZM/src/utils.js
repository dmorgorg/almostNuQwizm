let utils = utils || {};

utils = function () {} // function constructor, doesn't need anything in it

utils.radians = deg => deg * Math.PI / 180;
utils.degrees = rad => rad * 180 / Math.PI;
// trig functions that work on degrees
utils.sin = deg => Math.sin(utils.radians(deg));
utils.cos = deg => Math.cos(utils.radians(deg));
utils.tan = deg => Math.tan(utils.radians(deg));
utils.asin = number => utils.degrees(Math.asin(number));
utils.acos = number => utils.degrees(Math.acos(number));
utils.atan = number => utils.degrees(Math.atan(number));

/** 
 *  Linear Congruence Random Number Generator
 *  Numerical Recipes in C, 2nd Ed., p278
 */

// function constructor - doesn't work with arrow function because of 'this'?
utils.LCRNG = function (seed) {

    // just in case not called with 'new'
    if (!(this instanceof utils.LCRNG)) {
        return new utils.LCRNG(seed);
    }

    let s = seed,
        a = 16807,
        m = 2147483647;

    // if an arrow function is used, 'arguments' returns 'seed' from constructor
    this.getNext = function (min, max, inc) {
        s = (a * s) % m;
        if (arguments.length === 3) {
            return min + (s % Math.floor((max - min) / inc + 1)) * inc;
        } else if (arguments.length === 2) {
            return min + s % (max - min);
        } else if (arguments.length === 0) {
            return s;
        }
    }
}

utils.makeInputAlpha = (str) => {
    return str.replace(/[^A-Za-z_\-]+/, '');
};

utils.makeInputInteger = (str) => {
    return str.replace(/[^\d]+/, '');
};