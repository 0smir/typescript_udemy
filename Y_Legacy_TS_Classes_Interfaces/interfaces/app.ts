// type AddFn = (a: number, b: number) => number
interface AddFn {
  (a: number, b: number): number;
}

let add: AddFn;

add = (n1: number, n2: number) => {
  return n1 + n2;
}



interface Named {
  readonly name?: string;
  outputName?: string;
}


// interface Greetable extends Named, AnotherInterface, OneMoreInterface {
interface Greetable extends Named {
  greet(phrase: string): void;
}

// user1 = {
//   name: 'Helga',
//   greet(text: string) {
//     console.log(text + ' ' + this.name);
//   }
// }

// user1.greet('Hello! I am');

class Person implements Greetable {
  name?: string; //? - mark optional parameter
  age = 30;

  constructor(n?: string) {
    if (n) {
      this.name = n;
    }
  }

  greet(text: string) {
    if (this.name) {
      console.log(text + ' - ' + this.name);
    } else {
      console.log('Hi!');

    }
  }
}
let user1: Greetable;

user1 = new Person();
// user1.name = 'Helga'; //got error due name is readonly
user1.greet('Hello! I am');