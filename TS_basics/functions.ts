function add(a: number, b: number): number {
  return a + b;
};

// function add(type of parameter1, type of parameter2): type of result {
//   return a + b;
// }

function log(message: string): void { // void-type use in case if function don't return anything
  console.log(message);
};

function logAndThrow(errorMessage: string): never { // never - use it if func will never complite (will not finished just process an error to not crush your web-app) result of this function will never be used
  console.log(errorMessage);
  throw new Error(errorMessage);
};


let logMsg = (msg: string) => {
  console.log(msg);
};


// function performJob(callBack: Function) { // one of aproach to set call back type (built in TS Function type)
function performJob(callBack: (m: string) => void) { // assign Function type of result which setted as callback (example log has void type)
  // ...
  callBack('Job is complite!');
};
// callback type looks likearrow function an can be use for all types of [javascript] function
performJob(logMsg);
performJob(log);

type User = {
  name: string,
  age: number,
  greet: () => string,
  msg: (m: string) => void;
};

let user: User = {
  name: 'Helga',
  age: 85,
  greet() {
    console.log('hello! - greet');
    return this.name;
  },
  msg(m) {
    console.log('message: ', m);
  }
};

user.greet();
