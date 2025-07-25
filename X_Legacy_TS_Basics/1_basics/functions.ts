function add(n1: number, n2: number) {
  return n1 + n2;
}

function printResult(num: number): void {
  console.log('Result: ', num);
}

function addAndHandle(
  n1: number,
  n2: number,
  cb: (n: number) => void
) {
  let result = n1 + n2;
  cb(result);
}

printResult(add(5, 12));

let combineVal: (a: number, b: number) => number;
combineVal = add;
// combineVal = 5;
// combineVal = printResult;

console.log(combineVal(8, 2));

addAndHandle(10, 20, (result) => {
  console.log(result);

});