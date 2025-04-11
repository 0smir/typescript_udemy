class ListNode<T> {
  next?: ListNode<T>;
  constructor(public value: T) { }
}

class LinkedList<T> {
  private tail?: ListNode<T>;
  constructor(private root?: ListNode<T>, private length = 0) { }
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

  }

  removeAt(pos: number) { }
}



const numberList = new LinkedList<number>();
numberList.add(1);
numberList.add(2);
numberList.add(3);
numberList.add(5);
numberList.add(-6);


console.log('length: ', numberList.getNumberOfElements());
numberList.print();


const nameList = new LinkedList<string>();