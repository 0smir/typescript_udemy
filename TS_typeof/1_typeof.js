"use strict";
let userName = 'Helga';
console.log(typeof userName); // js operator
const settings = {
    difficulty: 'easy',
    minLavel: 10,
    didStart: false,
    players: ['Max', 'Helga']
};
function loadData(s) {
    //...
}
loadData(settings);
//============== typeof && functions ========
function sum(a, b) {
    return a + b;
}
function subtract(a, b) {
    return a - b;
}
function performMathAction(cb, a, b) {
    // some code...
    console.log('cb: ', cb);
    return cb(a, b);
}
let result = performMathAction(sum, 1, 2);
console.log(result);
