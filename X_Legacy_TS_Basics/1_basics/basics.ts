console.log('Time to get started...');

function add(n1: number, n2: number, showResult: boolean, phrase: string) {
  let result = n1 + n2;
  if (showResult) {
    console.log(phrase + result);

  } else {
    return n1 + n2;
  }

}

let num1 = 3.3;
let num2 = 5.2;
let printResult = true;
let resultText = 'This is function result: ';

let result = add(num1, num2, printResult, resultText);
// console.log('result', result);
