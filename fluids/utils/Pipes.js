/*
 Public Static Members, p105, JavaScript Patterns, Stoyan Stefanov
*/
var utils = utils || {};

//constructor
utils.Pipes = function() {};

//typical pipes: nominal (in) and radius (mm)
utils.Pipes.S40 = [
    ["1/8-in", '\\frac18 \\textsf{-in}', 6.8],
    ["1/4-in", '\\frac14 \\textsf{-in}', 9.2],
    ["3/8-in", '\\frac38 \\textsf{-in}', 12.5],
    ["1/2-in", '\\frac12 \\textsf{-in}', 15.8],
    ["3/4-in", '\\frac34 \\textsf{-in}', 20.9],
    ["1-in", '1\\textsf{-in}', 26.6],
    ["1&nbsp;1/4-in", '3\\frac14 \\textsf{-in}', 35.1],
    ["1&nbsp;1/2-in", '1\\frac12 \\textsf{-in}', 40.9],
    ["2-in", '2\\textsf{-in}', 52.5],
    ["2&nbsp;1/2-in", '2\\frac12 \\textsf{-in}', 62.7],
    ["3-in", '3\\textsf{-in}', 77.9],
    ["3&nbsp;1/2-in", '3\\frac12 \\textsf{-in}', 90.1],
    ["4-in", '4\\textsf{-in}', 102.3],
    ["5-in", '5\\textsf{-in}', 128.2],
    ["6-in", '6\\textsf{-in}', 154.1],
    ["8-in", '8\\textsf{-in}', 202.7],
    ["10-in", '10\\textsf{-in}', 254.5],
    ["12-in", '12\\textsf{-in}', 303.2],
    ["14-in", '14\\textsf{-in}', 333.4],
    ["16-in", '16\\textsf{-in}', 381],
    ["18-in", '18\\textsf{-in}', 428.7],
    ["20-in", '20\\textsf{-in}', 477.9],
    ["24-in", '24\\textsf{-in}', 574.7],
];