//=========== Function Overloads =======
// TypeScript allows to add multiple function signature: how a function looks — what it's called,
//  what it takes(parameters), and what it gives back(return type)

function getLength(val: string): string; // return type - string 
function getLength(val: any[]): number; //return type - number

//======================================
function getLength(val: string | any[]) {
  if (typeof val === 'string') {
    let wordsNumber = val.split(' ').length;
    return `${wordsNumber} words`;
  }
  return val.length;
}


const numOfWords = getLength('does this work?');
const numItems = getLength(['Sports', 'Reading']);

console.log('numOfWords: ', numOfWords);

console.log(typeof numOfWords === 'string'); // returns true
// console.log(numOfWords.length); //but without Function Overloads this expression will not work due TS detect result as 'string | number'
// but 'length' is not exist in union type 'string | number'.
//so we need to declarate results type more explicitly (!)

console.log('numItems', numItems);
