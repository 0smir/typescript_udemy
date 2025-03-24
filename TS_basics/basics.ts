let userName: string; //nember, boolean (!!! lowerCase)
let userAge = 38;

userName = 'Helga';
// userAge = '22';
// console.log("userName", userName);

function add(a: number, b = 5) {
  return a + b;
};

add(10);
// add('10'); //incorrect expressin
add(10, 7);
// add(10, '7');//incorrect expressin