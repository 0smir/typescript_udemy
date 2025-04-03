"use strict";
class Person {
    firstName = '';
    lastName = '';
    // constructor(private firstName: string, private lastName: string) { }
    set personName(name) {
        if (name.trim() === '') {
            throw new Error('Invalid name.');
        }
        this.firstName = name;
    }
    set personLastName(name) {
        if (name.trim() === '') {
            throw new Error('Invalid name.');
        }
        this.lastName = name;
    }
    get fullName() {
        return this.firstName + ' ' + this.lastName;
    }
    static eid = 'USER';
    static greet() {
        console.log('Hello!');
    }
}
//const Helga = new Person('Helga', 'Vaal'); //you can create person this way only if you  use constructor function;
// console.log(Helga.fullName);
const Max = new Person();
Max.personName = 'Max';
Max.personLastName = 'Muller';
console.log(Max.fullName);
console.log(Person.eid); //can be access before creating Person class
console.log(Person.greet); //can be access before creating Person class
