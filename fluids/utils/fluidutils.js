
/*
 Public Static Members, p105, JavaScript Patterns, Stoyan Stefanov
 */
var utils = utils || {};

utils.fluids = function() {
};

/**
 * L in m, Q in L/s, C is unit-less, D in mm, return headLoss in m
 */
utils.fluids.getHeadLoss = function(L, Q, C, D) {
	return L * Math.pow(279000 * Q / C / Math.pow(D, 2.63), 1.852);
};

/**
 * L in m, Q in L/s, C is unit-less, hL in m, return diameter in mm
 */
utils.fluids.getDiameter = function(L, Q, C, hL) {
	return Math.pow(279000 * Q / C / Math.pow(hL / L, 0.54), 0.3802);
};

/**
 * L in m, Q in L/s, C is unit-less, hL in m, return diameter in mm
 */
utils.fluids.getQ = function(L, C, D, hL) {
	return C * Math.pow(D, 2.63) * Math.pow(hL / L, 0.54) / 279000;
};

/**
 * Q in m^3/s, D in m, returns m/s
 */
utils.fluids.getVel = function(Q, D) {
	return Q / (Math.PI * D * D / 4);
};

/**
 * requires head in mm, angle in degrees returns Q in L/s
 */
utils.fluids.getQvNotchWeir = function(head, angle, coeff) {
	return 8 / 15 * coeff * Math.sqrt(19.62)
			* Math.tan(Math.PI / 180 * angle / 2) * Math.pow(head / 1000, 2.5)
			* 1000;
};

utils.fluids.getQRectangularWeir = function(L, H, coeff, B) {
	if (arguments.length === 3) {
		return 2 / 3 * coeff * Math.sqrt(19.62) * L * Math.pow(H, 1.5);
	}
};

utils.fluids.getHRectangularWeir = function(L, Q, coeff, B) {
	if (arguments.length === 3) {
		return Math.pow((3*Q)/(2*coeff*Math.sqrt(19.62)*L), 1/1.5);
	}
};

utils.fluids.getD = utils.fluids.getDiameter;
utils.fluids.getHL = utils.fluids.getHeadLoss;
