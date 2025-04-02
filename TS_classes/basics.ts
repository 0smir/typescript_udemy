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
  private userType: string = 'user';
  constructor(public name: string, public age: number) { };//alernative method to add properties
  greet() {
    console.log('userType', this.userType)
  }

}

const hel = new User('Helga', 33);
const max = new User('Max', 96);

max.age = 37; // publick key-word could be reassigned

console.log(hel, max);
