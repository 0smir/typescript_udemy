// interface is TS feature only


// type Authenticatable = {} // this way of declarating Type Alias also possible and correct,
// but in this case declaration merging is not availible.


//interface it is only a shape of smth. It will not contain logic.
interface Authenticatable {
  email: string;
  password: string;
  login(): void;
  logout(): void;
}

interface AuthenticatableAdmin extends Authenticatable {
  role: 'admin' | 'superadmin';
}

//example of declaretion merging. If your interface need new field - it is possible to add 
// in every code snippet
interface Authenticatable {
  role: string;
}

let user: Authenticatable;

//Authenticatable determinate type of object. Newly created object should have the same shepe
// same fields and methods.
user = {
  email: 'trst@gmail.com',
  password: 'abcd1',
  role: 'user',
  login() {
    console.log('login')
  },
  logout() {
    console.log('logout')
  }
}

//you can also use interfaces to define function types

type Sum = (a: number, b: number) => number; //function type

let sumResult: Sum; // making sure sum can only store values of that function type
sumResult = (a, b) => a + b; // assigning a value that adheres to that function type

let sr = sumResult(3, 5);
console.log(sr);

//Alternatively, you can also define the SumFn type via an interface

interface SumFn {
  (a: number, b: number): number;
}

let SF: SumFn;
SF = (a, b) => a + b;
let sf = SF(3, 6);

console.log(sf);

//......

// function authenticate(user: { login(): void }) { correct way to define function
function authenticate(user: Authenticatable) { // more short way to use (use interfaces)
  user.login()
}

//implementing of interface
class AuthenticatableUser implements Authenticatable {
  constructor(
    public email: string,
    public password: string,
    public role: string
  ) { }

  login() { }
  logout() { }
}