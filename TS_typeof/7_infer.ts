function add(a: number, b: number) {
  return a + b;
}

type AddFn = typeof add;
type ReturnValueType<T> = T extends (...args: any[]) => infer R ? R : T;


type AddFnReturnValueType = ReturnValueType<AddFn>;
