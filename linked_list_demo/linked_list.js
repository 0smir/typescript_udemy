"use strict";
class ListNode {
    value;
    next;
    constructor(value) {
        this.value = value;
    }
}
class LinkedList {
    root;
    length;
    tail;
    constructor(root, length = 0) {
        this.root = root;
        this.length = length;
    }
    add(value) {
        const node = new ListNode(value);
        if (!this.root || !this.tail) {
            this.root = node;
            this.tail = node;
        }
        else {
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
}
const numberList = new LinkedList();
numberList.add(1);
numberList.add(2);
numberList.add(3);
numberList.add(5);
numberList.add(-6);
console.log(numberList.getNumberOfElements());
numberList.print();
const nameList = new LinkedList();
