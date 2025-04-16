
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
