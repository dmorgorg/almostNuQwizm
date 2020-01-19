"use strict";

var utils = utils || {};

utils = function utils() {}; // function constructor, doesn't need anything in it


utils.radians = function (deg) {
  return deg * Math.PI / 180;
};

utils.degrees = function (rad) {
  return rad * 180 / Math.PI;
};
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

  var s = seed,
      a = 16807,
      m = 2147483647; // if an arrow function is used, 'arguments' returns 'seed' from constructor

  this.getNext = function (min, max, inc) {
    s = a * s % m;

    if (arguments.length === 3) {
      return min + s % ((max - min + 1) / inc) * inc;
    } else if (arguments.length === 2) {
      return min + s % (max - min + 1);
    } else if (arguments.length === 0) {
      return s;
    }
  };
};

utils.makeInputAlpha = function (str) {
  return str.replace(/[^A-Za-z_\-]+/, '');
};

utils.makeInputInteger = function (str) {
  return str.replace(/[^\d]+/, '');
};