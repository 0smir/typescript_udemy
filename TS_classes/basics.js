"use strict";
// class User {
//   name: string;
//   age: number;
//   constructor(n: string, a: number) {
//     this.name = n;
//     this.age = a;
//   }
//   // constructor() { //vanilla js method to create class
//   //   this.name = 'Helga';
//   // }
// }
class User {
    name;
    age;
    constructor(name, age) {
        this.name = name;
        this.age = age;
    } //alernative method to add properties
}
const hel = new User('Helga', 33);
const max = new User('Max', 96);
console.log(hel, max);
