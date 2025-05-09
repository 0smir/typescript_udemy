// namespace App {
//autobind decorator
export function autobind(
  _target: any,
  _methodName: string,
  descriptor: PropertyDescriptor) {

  const originMethod = descriptor.value;
  const adjDescriptor: PropertyDescriptor = {
    configurable: true,
    get() {
      const boundFn = originMethod.bind(this);
      return boundFn;
    }
  }
  return adjDescriptor;
}
// }