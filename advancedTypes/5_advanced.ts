//============== Index Type ==========
// it create dinamic and flexible object types without losing type safety
// some times it importent to have extra flexibility


type DataStore = {
  [prop: string]: string | number | boolean; //placeholder to dinemic property. it can be added in a future
  //[prop: <string or number or Symbol>] - you should define type of property name itself.
  // in a mouste cases it will be a string, but JS also do allow Symbol or number
};


//this is essentialy the same as this type
let someObj: Record<string, number | boolean>; // this is alternative way usage of dinemic properties 

let store: DataStore = {};

store.id = 5;
store.isOpen = true;
store.name = 'HelgaStore';


// TS will interpriyate this expression as 'string[]' - array of strings 
//and you may add items as many as you want
let roles = ['admin', 'guest', 'editor'];

//This is TS feature! You can use it in case its impirtant to make ts more strict
// It make var type as nerrow as possible. Now it 'readonly'
let rolesOfUsers = ['admin', 'guest', 'editor'] as const;

// console.log(rolesOfUsers.push('olol'));// it is wrong expressin, it's not possible add additional item

let roleName = rolesOfUsers[0]; // its possible to get array items data



// ===============Satisfies keyword===============

const dataEntries: Record<string, number> = {
  entry_1: 0.51,
  entry_2: -1.25
}

dataEntries.entry_3
// it's correct, due we assign type as property of object - 'string'
// value of prop - 'number'


const dataEntriesInfo = {
  entry_1: 0.51,
  entry_2: -1.25
} satisfies Record<string, number>; // this expression check /test assigned values
//and it should fits the type value 'props:string, value: number'
//TS will use the type you set after 'satisfies' keyword to check where the actual
// value assigned to dataEntriesInfo is of tet type.

// dataEntriesInfo.entry_3 // this is incorrect expression, due it type was not
//checked via 'shape' of Recorded type

dataEntriesInfo.entry_2 //correct, due it exist in dataEntriesInfo

