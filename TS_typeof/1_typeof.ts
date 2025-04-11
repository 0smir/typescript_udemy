let userName = 'Helga';

console.log(typeof userName);// js operator

type UserName = typeof userName; //ts operator

const settings = {
  difficulty: 'easy',
  minLavel: 10,
  didStart: false,
  players: ['Max', 'Helga']
}

// type Settings = { //long way to derive shape of object
//   difficulty: string;
//   minLavel: number;
//   didStart: boolean;
//   players: string[];
// }

type Settings = typeof settings; // shortcat derive shape of object

function loadData(s: typeof settings) {
  //...
}

loadData(settings);

//============== typeof && functions ========
function sum(a: number, b: number): number {
  return a + b;
}
function subtract(a: number, b: number): number {
  return a - b;
}

type SumFn = typeof sum;
type SubtractFn = typeof subtract;

function performMathAction(cb: SumFn | SubtractFn, a: number, b: number) {
  // some code...
  console.log('cb: ', cb);
  return cb(a, b);
}

let result = performMathAction(sum, 1, 2);
console.log(result);
