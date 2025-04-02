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
  public hobbies: string[] = [];
  responsibilities: string[] = []; // will be public, because it is default. Privat should be assigned explisitly

  readonly possitions: string[] = [];

  private userType: string = 'user';

  constructor(public name: string, public age: number) { };//alernative method to add properties
  greet() {
    console.log('userType', this.userType)
  }

}

const hel = new User('Helga', 33);
const max = new User('Max', 96);

max.age = 37; // publick key-word could be reassigned
// max.possitions = ['mentor']; //incorrect way - you try to set new array due this prop-ty is readonly
max.possitions.push('barber'); // correct way  - you set new value to existing array (manipulation with original array)
console.log(hel, max);
