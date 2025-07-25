type Combinable = number | string; // alias type
type ConversionDescriptor = 'as_number' | 'as_text';


function combine(
  input1: Combinable,
  input2: Combinable,
  resultType: ConversionDescriptor
) {
  let result;

  if (typeof input1 === 'number' && typeof input2 === 'number' || resultType === 'as_number') {
    result = +input1 + +input2;
  } else {
    result = input1.toString() + input2.toString();
  }

  return result;
  // if (resultType === 'as_number') {
  //   return +result;
  // } else {
  //   return result.toString();
  // }

}


let combinedAges = combine(30, 26, 'as_number');
console.log('combinedAges', combinedAges);

let combinedNumb = combine('30', 26, 'as_number');
console.log('combinedNumb', combinedNumb);

let combinedNames = combine('Ahha', "Mode", 'as_text');
console.log('combinedNames', combinedNames);


