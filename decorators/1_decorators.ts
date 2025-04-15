// In tsconfig.json file "experimentalDecorators" should be commented or setted gto false

function logger<T extends new (...args: any[]) => any>(target: T, ctx: ClassDecoratorContext) {
  // ...args: any[] - mean ucan use as many arguments any types
  console.log('logger decorator');
  console.log(target);
  console.log(ctx);

  return class extends target {
    age = 33;
    constructor(...args: any[]) {
      super(...args);
      console.log('class constructor!');
      console.log('created: ', this);

    }
  };
}

// metod decorator for greet
function autobind(target: (...args: any[]) => any, ctx: ClassMethodDecoratorContext) {
  // console.log('target: ', target);
  // console.log('ctx: ', ctx);

  ctx.addInitializer(function (this: any) {//addInitializer is build in method. 
    //In arguments should be normal function (not arrow), and this function should have as argument "this: any"
    this[ctx.name] = this[ctx.name].bind(this);
  });

  return function (this: any) { //this fn will replace the original method the decorator was added to.
    // in this case greet() will remove
    console.log('Executing of original function.');// it can be any other code (http-requests etc.)

    // target() - this is original function, but not use it at the same time with addInitializer. 
    // Because target is original method without modifications, so it has no sence to change it and then call original 
    target.apply(this);// if you really need call original method - do it with binding 'this' - use apply.
  }
}

@logger
class Personitem {
  name = "Helga";
  // constructor() { added to resolve greet(); error
  //   this.greet = this.greet.bind(this);
  // }

  @autobind
  greet() {
    console.log('hello, I am ' + this.name + '!');
  }
}

const helga = new Personitem();
helga.greet();
console.log(helga); // Personitem { name: 'Helga', age: 33 }
// original class was not removed, it was completed with age

const max = new Personitem();

const greet = max.greet;
max.greet(); // correct expressin even if we not use autobind-decorator
greet(); // return error if not use constructor or autobind-decorator in Personitem



