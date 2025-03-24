// let a: null;
let a: null | string;
let b: undefined | string;

a = null;
a = 'Hello World';

b = undefined;
// b = null; //incorrect expression because available values is string and undefined only;
b = 'ok';