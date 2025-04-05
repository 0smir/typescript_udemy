"use strict";
// interface is TS feature only
let user;
//Authenticatable determinate type of object. Newly created object should have the same shepe
// same fields and methods.
user = {
    email: 'trst@gmail.com',
    password: 'abcd1',
    role: 'user',
    login() {
        console.log('login');
    },
    logout() {
        console.log('logout');
    }
};
let sumResult; // making sure sum can only store values of that function type
sumResult = (a, b) => a + b; // assigning a value that adheres to that function type
let sr = sumResult(3, 5);
console.log(sr);
let SF;
SF = (a, b) => a + b;
let sf = SF(3, 6);
console.log(sf);
