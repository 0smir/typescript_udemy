function generateError(msg?: string) {// (?) - use to show that parameter is optional
  throw new Error(msg);
};

generateError();
generateError('Error error!');

type User = {
  name: string;
  age: number;
  role?: 'admin' | 'guest'
}


//============ Nullish Coalescing (??)==============

// (??)- looks for null or underfined

let input = '';
const provideInputValue = input ?? false;
// expression check is left side (input) is null or underfined and if it is(null or underfined) expression return false
//but in this case was assigned empty string (not null or underfined), so  provideInputValue = '' (empty string);