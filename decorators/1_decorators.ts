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

@logger
class Personitem {
  name = "Helga";
  greet() {
    console.log('hello, I am ' + this.name + '!');
  }
}

const helga = new Personitem();
helga.greet();
console.log(helga); // Personitem { name: 'Helga', age: 33 }
// original class was not removed, it was completed with age

const max = new Personitem();







