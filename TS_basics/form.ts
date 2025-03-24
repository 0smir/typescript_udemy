let element = document.getElementById('user-name');
// let element = document.getElementById('user-name')!; // (!) - nerrowing can be used if you shure that element is not null

// if (!element) {
//   throw new Error('Error');
// }

// console.log(element!.value); // example of nerrowing
console.log(element?.value); // (?) - can be used in plase of potential null value

// ===== Casting (or assertion) type ======//

let inputEl = document.getElementById('user-input') as HTMLInputElement | null;

console.log(inputEl?.value);