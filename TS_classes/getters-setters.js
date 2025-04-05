"use strict";
//============ private, public, readonly, static, protected =======
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
console.log(Person.eid); //static props can be accessed before creating Person class
console.log(Person.greet); //static props can be accessed before creating Person class
class Employee extends Person {
    jobTitle;
    constructor(jobTitle) {
        super();
        this.jobTitle = jobTitle;
        // super.firstName = 'Max'; // It's possible to rewrite basic class parameters in this way
    }
    work() {
        console.log(this.firstName); // can be accessed in extended Class if parent Class value has key-word protected
    }
}
class UIElement {
    identifier;
    constructor(identifier) {
        this.identifier = identifier;
    }
    clone(targetLocation) {
        //logic of duplicate the UI element
    }
}
// let uiElement = new UIElement(); // incorrect way of Class extending. This is build in restriction of abstract Classes
class SideDrawerElement extends UIElement {
    identifier;
    position;
    constructor(identifier, position) {
        super(identifier);
        this.identifier = identifier;
        this.position = position;
    }
}
