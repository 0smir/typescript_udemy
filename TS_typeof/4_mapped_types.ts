//========= mapped types ==============
//deriving types
//mapped-types feature  - is way of conwerting one object type to another kind of object type

type Operations = {
  add: (a: number, b: number) => number;
  substract: (a: number, b: number) => number;

  // add?: (a: number, b: number) => number; // optional property
  // substract?: (a: number, b: number) => number;// optional property

  // readonly add: (a: number, b: number) => number;// readonly prop
  // readonly substract: (a: number, b: number) => number;// readonly prop
};

// type Results = { // manualy definding object type
//   add: number,
//   substract: number
// }


// mapped type
type Results<T> = {// turn this object type to generic type
  [Key in keyof T]: number; // go thrue all thouth keys and map them to  this object type

  //[Key in keyof T]: number | string; // union types also can be used

  //[Key in keyof T]?: number;//(?) question mark make all properties not required. Now you can use
  // properties that you need right now (not all props, just that you need) 
  // [Key in keyof T]-?: number; // show that this props should be requered

  //readonly [Key in keyof T]: number; // make prop read only
  //-readonly [Key in keyof T]: number; // make prop NOT readonly
};

//(?) question mark make all properties not required. Now you can use
// properties that you need right now (not all props, just that you need) 

let mathOperations: Operations = {
  add(a: number, b: number) {
    return a + b;
  },
  substract(a: number, b: number) {
    return a - b;
  }
}

// let mathResults: Results = { // simple way to describe
//   add: mathOperations.add(4, 5),
//   substract: mathOperations.substract(4, 5),
// }

let mathResults: Results<Operations> = {
  add: mathOperations.add(4, 5),
  substract: mathOperations.substract(4, 5),
};

// mathResults.add = 10; // in case readonly will return error

