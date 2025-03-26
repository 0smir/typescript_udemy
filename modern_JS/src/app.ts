// Code goes here!

const add = (a: number, b: number) => a + b;
const addItem = (a: number, b: number = 3) => a + b; // IMPORTENT: default parametr should be a last param

const summ = (...numbers: number[]) => {
  return numbers.reduce((curResult, curVal) => { return curResult + curVal }, 0);
}
const printOutput: (a: number | string) => void = output => console.log(output);

printOutput(add(2, 5));
printOutput(addItem(5));

printOutput(summ(5, 6, 7));


const button = document.querySelector('button');

if (button) {
  button.addEventListener('click', event => console.log(event));
}


const hobbies = ['Sports', 'Reading', 'Cooking'];
const activeHobbies = ['Hiking'];

activeHobbies.push(...activeHobbies);

const person = {
  userName: 'Max',
  age: 33
};

const copiedPerson = { ...person };


// let hobby1 = hobbies[0],
//     hobby2 = hobbies[1];
const [hobby1, hobby2, ...otherHobbies] = hobbies;

console.log(hobby1);
console.log(hobby2);
console.log(otherHobbies);

const { userName: firstName, age } = person;

console.log(firstName, age); // firstName is alias for userName key