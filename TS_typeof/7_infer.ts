function add(a: number, b: number) {
  return a + b;
}

type AddFn = typeof add;
type ReturnValueType<T> = T extends (...args: any[]) => infer R ? R : T;

type AddFnReturnValueType = ReturnValueType<AddFn>;
// type AddFnReturnValueType = ReturnType<AddFn>;// can be used in this way due ReturnType is build in TS feature utilit
//you can check all : https://www.typescriptlang.org/docs/handbook/utility-types.html
