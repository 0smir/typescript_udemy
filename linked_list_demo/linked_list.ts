class ListNode<T> {
  next?: ListNode<T>;
  constructor(public value: T) { }
}

class LinkedList<T> {
  private tail?: ListNode<T>;
  constructor(
    private root?: ListNode<T>,
    private length = 0
  ) { }

  add(value: T) {
    const node = new ListNode(value);
    if (!this.root || !this.tail) {
      this.root = node;
      this.tail = node;
    } else {

      // let current = this.root;//long approach
      // while (current.next) { 
      //   current = current.next;
      // }
      // current.next = current;

      this.tail.next = node;
      this.tail = node;
    }
    this.length++;
  }
  getNumberOfElements() {
    return this.length;
  }
  print() {
    let current = this.root;
    while (current) {
      console.log(current.value);
      current = current.next;
    }
  }
  insertAt(value: T, pos: number) {
    if (pos > -1 && pos < this.length && this.root) {
      let current = this.root;
      let prev = current;
      let index = 0;
      let node = new ListNode(value);

      if (pos === 0) {
        node.next = this.root;
        this.root = node;
      } else {
        while (index++ < pos && current.next) {
          console.log('while: ', index, pos);
          prev = current;
          current = current.next;
        }
        node.next = current;
        prev.next = node;
      }
      this.length++;
      return true;
    } else {
      return false;
    }
  }

  removeAt(pos: number) {
    if (pos >= 0 && this.length > 0 && this.root) {
      let current = this.root,
        index = 0,
        prev: ListNode<T> = current;
      if (pos === 0) {
        this.root = current.next;
      } else {
        while (index++ < pos && current.next) {
          prev = current;
          current = current.next;
        }
        prev.next = current.next;
      }
      this.length--;
      return current;
    } else {
      return null;
    }
  }
}



const numberList = new LinkedList<number>();
numberList.add(1);
numberList.add(2);
numberList.add(3);
numberList.add(5);
numberList.add(-6);
console.log('length: ', numberList.getNumberOfElements());

numberList.insertAt(100, 0);
numberList.insertAt(50, 3);
numberList.print();

console.log('=================================');

numberList.removeAt(0);
numberList.removeAt(2);
// numberList.removeAt(numberList.getNumberOfElements() - 1);
numberList.print();

const nameList = new LinkedList<string>();