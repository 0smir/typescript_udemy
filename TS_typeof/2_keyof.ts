
//======== keyof TS feature ==========
type User = { name: string; age: number };
type UserKeys = keyof User; // UserKeys now is union type of all keys defined in User

let validKey: UserKeys;


validKey = 'name';
validKey = 'age';


//=================== example of usage ==============
function getProp<T extends object, U extends keyof T>(obj: T, key: U) {
  const val = obj[key];
  if (val === undefined || val === null) {
    throw new Error('Accessing undefined or null value.');
  }
  return val;
}


const data = { id: 'yuuyh112', isStored: true, values: [1, 3, 55] };
const dataVal = getProp(data, 'id');

console.log(dataVal);

const userMen = { name: 'Max', age: 78 };
const val = getProp(userMen, 'age');

console.log('val', val);