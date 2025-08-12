//Generics

function merge<T extends object, U extends object>(objA: T, objB: U) {
  return Object.assign(objA, objB);
}

let mergeObj = merge({ name: 'MAx' }, { age: 30 });
let mergeObj1 = merge({ name: 'Helga', hobby: ['Cooking'] }, { age: 30 });
console.log(mergeObj.age);
console.log(mergeObj1.hobby[0]);


interface Lengthy {
  length: number;
}

function countAndDescribe<T extends Lengthy>(element: T): [T, string] {
  let descriptionText = 'Got no value!';
  if (element.length === 1) {
    descriptionText = 'Got 1 element';
  } else if (element.length > 1) {
    descriptionText = 'Got ' + element.length + ' elements';
  }

  return [element, descriptionText];
}

console.log(countAndDescribe('Hi, there!'));

function extractAndConvert<T extends object, U extends keyof T>(obj: T, key: U) {
  return obj[key];
}


extractAndConvert({ name: 'Max' }, 'name');


class DataStorage<T extends string | number | boolean> {
  private data: T[] = [];

  addItem(item: T) {
    this.data.push(item);
  }

  removeItem(item: T) {
    if (this.data.indexOf(item) === -1) {
      return;
    } else {
      this.data.splice(this.data.indexOf(item), 1);
    }

  }

  getItems() {
    return [...this.data];
  }
}

let textStorage = new DataStorage<string>();
textStorage.addItem('MAx');
textStorage.addItem('Helga');
textStorage.removeItem('MAx');

console.log(textStorage.getItems());

interface CourseGoal {
  title: string;
  description: string;
  compliteUnit: Date;
}


function createCourseGoal(
  title: string,
  description: string,
  compliteUnit: Data
): CourseGoal {
  let courseGoal: Partial<CourseGoal> = {}; // Partial (type) make all props of an object optional
  courseGoal.title = title;
  courseGoal.description = description;
  courseGoal.compliteUnit = compliteUnit;
  return courseGoal as CourseGoal;
}


const names: Readonly<string[]> = ['MAx', 'Helga'];// Readonly make your array not changeble
// names.push('Manu'); // will show error in terminal

