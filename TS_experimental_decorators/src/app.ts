//============================== Class Decorators ==============================
function Logger(logString: string) {
  console.log('Logger Factory');

  return function (constructor: Function) { // in this case 'constructor' is a name of argument, you can use any other name: 'target', 'targ', 'cnstr' etc.
    console.log('Logging...', logString);
    console.log('constructor: ', constructor);
  };
}

function WithTemplate(template: string, hookId: string) {
  console.log('template Factory');
  // return function (_: Function) {//(_) replace 'constructor', due I know we get this argument, but I don't need it.
  return function (constructor: any) {
    console.log('Rendering template');

    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}


/** In this case we remove original Class (Person) with new Class constructor which we return 
 * in WithTemplate2 decorator. Since we call super() in WithTemplate2 - the original Class data was saved
 * But after I replased original class by my custom Class, and thats allow us to add extra logic. 
 * So we extends and replases the old/original Class.
  */
function WithTemplate2(template: any, hookId: string) {
  return function <T extends { new(...args: any[]): { name: string } }>(originalConstructor: T) {
    return class extends originalConstructor {
      constructor(..._: any[]) {
        super(); // you have to call super if you create Class which extends enoter Class
        console.log('************rendering template WithTemplate2********');
        const hookElement = document.getElementById(hookId);
        // const p = new originalConstructor();
        if (hookElement) {
          const div = document.createElement('div');
          div.innerHTML = template;
          hookElement.append(div);
          // hookElement.querySelector('p')!.textContent += p.name;
          hookElement.querySelector('p')!.textContent += this.name;
        }
      }
    }
  }
}


// decorator will runs when it finds your class definition (constructor function definition)
@Logger('LOGGING - PERSON') // @-character is a sign of decorator calling
@WithTemplate2('<p>Title description: </p>', 'app')
@WithTemplate('<h1>My Person object</h1>', 'app') //order of executing of decoretor (actual decorator functions) is bottom up (bottom runs first), but decoretor Factories run earlier
class Person {
  name = "Helga";
  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();
console.log('Person inst', pers);


//======================== Property Decorators ===============================


/* All this types of decorators will execute when you defined the Class. 
It is not that decorators that run in runtime when you call the methods 
*/

/**
 * Decorators that's can return smth is: Methods, Accessors and Typescropt would use it.
 * Decorators Propertyes and Parameters also can return smth, but TypeScript will ignore it. 
 * Return values are not supported there or are not used to be precise.
 */

function Log(target: any, propertyName: string | Symbol) {
  console.log('============Property decorator ==============');
  console.log('target: ', target);
  console.log('propertyName: ', propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('============= Accessor Decorator ===============');
  console.log(target); //in case of static properties target will return constructor finction
  console.log(name);
  console.log(descriptor);
}

function Log3(target: any, name: string | Symbol, descriptor: PropertyDescriptor) {
  console.log('============= Method Decorator ===============');
  console.log(target);
  console.log(name);
  console.log(descriptor);
}

function Log4(target: any, name: string | Symbol, position: number) {
  console.log('============= Parameter Decorator ===============');
  console.log(target);
  console.log(name);
  console.log(position);
}

class Product {
  @Log
  title: string;
  private _price: number;

  @Log2
  set price(val: number) {
    if (val > 0) {
      this._price = val
    } else {
      throw new Error('Invalid price - should be positive.')
    }
  }

  constructor(t: string, p: number) {
    this.title = t;
    this._price = p;
  }

  @Log3
  getPriceWithTax(@Log4 tax: number) {
    return this._price * (1 + tax);
  }
}


const product_1 = new Product('Book', 19);
const product_2 = new Product('Book-2', 29);

console.log(product_1);
console.log(product_2);


//====================== Example: Creating an "Autobind" Decorator ======================

// function Autobind(target: any, methodName: string, descriptor: PropertyDescriptor) {
function Autobind(_: any, _2: string, descriptor: PropertyDescriptor) {
  const originalMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    enumerable: false,
    get() {
      const boundFn = originalMethod.bind(this);
      return boundFn;
    }
  };
  return adjDescriptor;
}

class Printer {
  message = 'This works!';

  @Autobind
  showMessage() {
    console.log('message to print: ', this.message);

  }
}

const printSmth = new Printer();
const button = document.querySelector('button');

// button?.addEventListener('click', printSmth.showMessage.bind(printSmth)); // tipical javascript solution
button?.addEventListener('click', printSmth.showMessage);

//===========================================================
interface ValidationConfig {
  [property: string]: {
    [validatable: string]: string[]// ['requerid', 'positive']
  }
}
const registratedValidators: ValidationConfig = {};

function Requerid(target: any, propName: string) {
  registratedValidators[target.constructor.name] = {
    ...registratedValidators[target.constructor.name],
    [propName]: [...(registratedValidators[target.constructor.name]?.[propName] ?? []), 'required']
  };
}

function PositiveNumber(target: any, propName: string) {
  registratedValidators[target.constructor.name] = {
    ...registratedValidators[target.constructor.name],
    [propName]: [...(registratedValidators[target.constructor.name]?.[propName] ?? []), 'positive']
  };
}

function validate(obj: any) {
  const objValidatorConfig = registratedValidators[obj.constructor.name];
  let isValid = true;


  if (!objValidatorConfig) {
    return true;
  }

  for (const prop in objValidatorConfig) {
    for (const validator of objValidatorConfig[prop]) {
      switch (validator) {
        case 'requerid':
          isValid = isValid && !!obj[prop];
          break;
        case 'positive':
          isValid = isValid && obj[prop] > 0;
          break;
      }
    }
  }
  return isValid;
}

class Course {
  @Requerid
  title: string;

  @PositiveNumber
  price: number;

  constructor(t: string, p: number) {
    this.title = t;
    this.price = p;
  }

}

const courseForm = document.querySelector('form');
courseForm?.addEventListener('submit', event => {
  event.preventDefault();
  const titleEl = document.getElementById('title') as HTMLInputElement;
  const priceEl = document.getElementById('price') as HTMLInputElement;

  const title = titleEl?.value;
  const price = +priceEl?.value;

  const createCourse = new Course(title, price);
  if (!validate(createCourse)) {
    alert('Invalid input, please try again!');
    return;
  }
  console.log(createCourse);

})
// Orcourse you can use npm package to validate your Classes https://github.com/typestack/class-validator
