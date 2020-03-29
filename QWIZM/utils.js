"use strict";

var utils = utils || {};

utils = function utils() {}; // function constructor, doesn't need anything in it


utils.radians = function (deg) {
  return deg * Math.PI / 180;
};

utils.degrees = function (rad) {
  return rad * 180 / Math.PI;
}; // trig functions that work on degrees


utils.sin = function (deg) {
  return Math.sin(utils.radians(deg));
};

utils.cos = function (deg) {
  return Math.cos(utils.radians(deg));
};

utils.tan = function (deg) {
  return Math.tan(utils.radians(deg));
};

utils.asin = function (number) {
  return utils.degrees(Math.asin(number));
};

utils.acos = function (number) {
  return utils.degrees(Math.acos(number));
};

utils.atan = function (number) {
  return utils.degrees(Math.atan(number));
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
      return min + s % Math.floor((max - min) / inc + 1) * inc;
    } else if (arguments.length === 2) {
      return min + s % (max - min);
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