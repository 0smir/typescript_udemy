// ========== Enum =========

// let userRole = 0; // 0 => Admin, 1 => Guest

//enum it is a type where you allowed to define different options
enum Role {
  Admin,
  Editor,
  Guest
}

let userRole: Role = Role.Admin;
// let userRole: Role = 0; // will not get an error because under the hood it will conver to object with numbers

//... after logout it canbe changed to Guest
userRole = Role.Guest;



//=== usage Union type instead of Enumes ====

let roleList: 'admin' | 'editor' | 'guest' = 'admin'; // more popular way to defined different options

// ...

roleList = 'guest';


//=== usage of Union type instead of Tuple type

let possibleResult: [1 | -1, 1 | -1]; //literal type

possibleResult = [1, -1]; // correct only in case if assign  1 or -1



type Rolename = 'admin' | 'editor' | 'guest' | 'reader';
type User = {
  name: string;
  age: number;
  role: Rolename;
};
function access(role: Rolename) {
  // ...
}