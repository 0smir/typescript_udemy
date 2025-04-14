//=============== Conditional types ==================

// creating of utilityes types/ helper type to extract type of elements in the array


type StringArr = string[]; // custom type for array of strings
// type ElementType = StringArr[number];// 
// type ElementType<T extends any[]> = T[number]; // create helper type which cam be Arry type only
// type Element1 = ElementType<StringArr>; //correct expression
const text = 'Hello'; // is 'string' type
// type ElementType2 = ElementType<typeof text>; // incorrect expression due it cant be a string it should be Array type


type getElementType<T> = T extends any[] ? T[number] : T; //syntax for writing of conditions
// keyword extends is like '===' operator in this case
type Example1 = getElementType<StringArr>; // return type string[]
type Example2 = getElementType<typeof text>; // return setted type 'string'


// ==================== Example ====================

type FullNamePerson = { firstName: string; lastName: string }
type FullnameOrNothing<T> = T extends FullNamePerson ? string : never;


// function getFullName<T extends object>(person: T
// ): T extends FullNamePerson ? string : never {
function getFullName<T extends object>(person: T): FullnameOrNothing<T> {
  if ('firstName' in person &&
    'lastName' in person &&
    person.firstName &&
    person.lastName
  ) {
    return `${person.firstName} ${person.lastName}` as FullnameOrNothing<T>;
  }
  throw new Error('No firstName and/or lastName found.');
}

const name1 = getFullName({}); // return never
const name2 = getFullName({ firstName: 'Helga', lastName: 'Vaal' });




