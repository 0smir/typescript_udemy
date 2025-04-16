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
  return function (constructor: any) {//(_) replace 'constructor', due I know we get this argument, but I don't need it.
    console.log('Rendering template');

    const hookEl = document.getElementById(hookId);
    const p = new constructor();
    if (hookEl) {
      hookEl.innerHTML = template;
      hookEl.querySelector('h1')!.textContent = p.name;
    }
  };
}


// decorator will runs when it finds your class definition (constructor function definition)
@Logger('LOGGING - PERSON') // @-character is a sign of decorator calling
@WithTemplate('<h1>My Person object</h1>', 'app') //order of executing of decoretor (actual decorator functions) is bottom up (bottom runs first), but decoretor Factories run earlier
class Person {
  name = "Helga";
  constructor() {
    console.log('Creating person object...');
  }
}

const pers = new Person();
console.log(pers);


//======================== Property Decorators ===============================


/* All this types of decorators will execute when you defined the Class. 
It is not that decorators that run in runtime when you call the methods 
*/


function Log(target: any, propertyName: string | Symbol) {
  console.log('============Property decorator ==============');
  console.log('target: ', target);
  console.log('propertyName: ', propertyName);
}

function Log2(target: any, name: string, descriptor: PropertyDescriptor) {
  console.log('============= Accessor Decorator ===============');
  console.log(target); //in case of static properties target will return constructop finction
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

