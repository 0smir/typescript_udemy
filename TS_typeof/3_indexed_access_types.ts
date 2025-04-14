//================ indexed access types ======


//if you already have values of object You can define type this way
// const appUserItem = {
//   name: 'Helga',
//   age: 33,
//   permissions: [{ id: 'pps1', title: 'Admin', description: 'Admin access' }]
// }
// type AppUser = typeof appUserItem;


//If you don't have values from scratch yoy can define type like this:
type AppUser = {
  name: string;
  age: number;
  permission: {
    id: string;
    title: string;
    description: string;
  }[]; // discribes array of objects
};

type Perms = AppUser['permission']; // extracting of type that's stored (setuped) in permission property of AppUser object type.
//so Perms now has all this object array type {id: string; title: string; description: string;}. So now it is an alias of AppUser.permission.
//This is a way to create subType of object type as a separate alias

//======================== example of usage ===========

type Perm = Perms[number]; // asking of TS to get elements with index
// return nested object thet storred in arry

type Names = string[];
type Name = Names[number]; // could be rewriten as Names[2];

