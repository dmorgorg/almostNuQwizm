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

utils.stringify = (number, sigDigs) => {

    let delta = 1e-9,
        pre = '',
        temp = number + ''; //stringify

    //save 0, . and - from the front of the string before checking for leading 1 and extra sigDig
    while (temp.charAt(0) === '0' || temp.charAt(0) === '.' || temp.charAt(0) === '-' || temp.charAt(0) === '+') {
        pre += temp.charAt(0);
        temp = temp.slice(1);
    }

    if (temp.charAt(0) === '1') { //if number begins with 1, increase the number of sig digs (generally from 3 to 4)
        sigDigs += 1;
    }

    //in the case where a 5 is represented by 499999... i.e. 1.5575 as 1.55749999...., the toPrecision() method gives the correct answer for 1.55749999 (1.557) and not the correct answer for 1.5575 (1.558). To solve this, apply toPrecision() first with a larger number of sig digs
    if (number < 0) {
        delta *= -1;
    }
    // console.log(number + ', ' + sigDigs);
    number = Number((number + delta).toPrecision(sigDigs));
    return number.toPrecision(sigDigs);

};

utils.toSigDigs = (number, sigDigs) => {
    return Number(utils.stringify(number, sigDigs));
}




utils.makeInputAlpha = (str) => {
    return str.replace(/[^A-Za-z_\-]+/, '');
};

utils.makeInputInteger = (str) => {
    return str.replace(/[^\d]+/, '');
};