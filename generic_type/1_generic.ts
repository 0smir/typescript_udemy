//============== Generic Types ======
// It describes two  kind of types working together - Array<string> it mean 'array' full of 'strings'
//So Generic is combinations of types - it give possibility to build more flexible things.

// let names: string[] = ['Max', 'Helga'];//
let names: Array<string> = ['Max', 'Helga']; // it is same as prev line
//here we using existing Array type (interface Array<T>). 


//================ Creating and Usage Generic type ====================

type DataStorage<T> = { // we create a custom Generic type, where T is for type and can be any other character (K, anything, etc)
  [key: string]: T
}

let store: DataStorage<string | boolean> = {};
store.name = 'Helga';
store.isInstruct = false;

let namestore: DataStorage<string> = {};

//========== Generic functions =============

function merge<T>(a: T, b: T) {
  return [a, b]
}

const ids = merge(1, 2);

function mergeAll<T, U>(a: T, b: U) { // you can assign types as may as you need 
  return [a, b]
}

const arrayResult = mergeAll(1, 'Helga');
