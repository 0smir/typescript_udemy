// let person: {
//   name: string,
//   age: number,
//   hobbies: string[],
//   role: [number, string]
// } = {
//   name: 'Helga',
//   age: 25,
//   hobbies: ['Sports', 'Cooking'], // union type
//   role: [2, 'author'] //tuple
// };

// person.role.push('admin'); // will work in a correct way , due 'push' is exeption for tuple.
// person.role.push(1); // will work in a correct way , due 'push' is exeption for tuple.
// person.role[1] = 10; //incorrect way to assign new value

//tuple is for more strictnes.

let favoriteActivities: string[];

//Enum : enum{New, Old}
const ADMIN = 0;
enum Role { // enum is a first custom type
  ADMIN = 5, READ_ONLY, AUTHOR // all next walues will be assigned with +1 under the hoodle (READ_ONLY = 6, AUTHOR = 7)
};
enum Roler { // enum can be created in this way
  ADMIN = 'ADMIN', READ_ONLY = ' READ_ONLY,', AUTHOR = 'AUTHOR'
};

let person = {
  name: 'Helga',
  age: 25,
  hobbies: ['Sports', 'Cooking'],
  role: Role.ADMIN
};

