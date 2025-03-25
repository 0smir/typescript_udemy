// ============ Arrays and tupels ===============

// let hobbies = ['Sports', 'Reading'];
let hobbies: string[] = ['Sports', 'Reading']; // aproach to assign strings ony array

// hobbies.push(10); //incorrect due array full of strings

let users: (string | number)[]; //aproach to assign union type of array => strings and numbers can be included to this array

users = [1, 'Helga', 'Max'];
users = ['Helga', 'Max'];
users = [1, 5];

let list: Array<string | number>; //generic type - addition way to assing array with different types


// let possibleResults: number[]; //[1, -1] 
let possibleResults: [number, number]; // more explicitly way to assign tuple type array;
// tuple type it is a way to assign array with fixed-length (any length needed) and  cleary defined types

possibleResults = [1, -1];
// possibleResults = [5, 10, 33];// incorrect expression of tuple type array assignation

let itemsArray: [number, string];
itemsArray = [3, '5']; //correct
// itemsArray = [3, '5', 10]; //incorrect due length of arry defined as two



// ============= Objects ===========

let userItem: {
  name: string,
  age: number | string,
  hobbies: string[],
  role: {
    description: string,
    id: number
  }
} = {
  name: 'Helga',
  age: 38,
  hobbies: ['Sports', 'Reading'],
  role: {
    description: 'admin',
    id: 78
  }
}; // be attentive: all fields of object should be setted (age, hobbies, role etc.)

let val: {} = 'some text'; // assign not an object but any value that is not null of undefined

// let someOdj = {}; //expression correct for javascript (defining an empty object), but not correct for typescript
//let val: {} = null; //incorrect expression null and undefined types is not assignable to this type
// let val: {} = 8; // correct expression
// let val: {} = "hjh"; // correct expression
// let val: {} = {}; // correct expression

let data: Record<string, number | string>; // generic type. Should be used in case if we don't know list of keys of object
//let data: Record<type of key, type of value>;

data = {
  entry1: 'string',
  entry2: 9899,
};

let data2: Record<string | number, number | string>;

data2 = {
  0: 'Hello',
  type: 'Olol',
  1: 333,
  speed: 120
}

