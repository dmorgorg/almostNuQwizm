/*
 Public Static Members, p105, JavaScript Patterns, Stoyan Stefanov
*/
var utils = utils || {};
//constructor
utils.LeD = function() {};

//typical properties of oils - specific gravity;
utils.LeD.Valves = [
    ["fully open globe valve", 340],
    ["fully open butterfly valve", 40],
    ["fully open gate valve", 13],
    ["1/2 open gate valve", 260],
    ["!$1/4!$ open gate valve", 900],

];

utils.LeD.Elbows = [
    ["standard 90<sup>o</sup> elbow", '\\mathsf{standard\\space 90^\\circ elbow}', 30],
    ["long radius 90<sup>o</sup> elbow", '\\mathsf{long\\space radius\\space 90^\\circ elbow}', 20],
    ["90<sup>o</sup> street elbow", '\\mathsf{90^\\circ\\space street\\space elbow}', 58]

];