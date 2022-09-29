/**
 * Linked List factory
 */
export function LinkedList<T>(data: T | null = null) {
  type LinkedListNode = ListNodeType<T | null>;
  type NodeParameter = LinkedListNode | null;

  let _head: NodeParameter = ListNode<T>(data);

  const _at = (node: NodeParameter, index: number): NodeParameter => {
    if (index === 0) {
      return node;
    } else if (node === null) {
      throw new Error('Index outside list');
    } else {
      return _at(node.nextNode, index - 1);
    }
  };

  const _size = (node: NodeParameter): number => (node === null ? 0 : 1 + _size(node.nextNode));

  const _tail = (node: NodeParameter): NodeParameter =>
    node === null || node.nextNode === null ? node : _tail(node.nextNode);

  const _append = (node: NodeParameter, value: T): LinkedListNode => {
    if (node === null) {
      return ListNode(value);
    } else {
      return ListNode(node.value, _append(node.nextNode, value));
    }
  };

  const _toString = (node: NodeParameter): string => {
    if (node === null) return 'null';
    else {
      return `( ${node.value} ) -> ${_toString(node.nextNode)}`;
    }
  };

  const _contains = (node: NodeParameter, value: T): boolean => {
    if (node === null) {
      return false;
    } else {
      return node.value === value || _contains(node.nextNode, value);
    }
  };

  const _find = (node: NodeParameter, value: T) => {
    const inner = (node: NodeParameter, value: T, index: number): number | null => {
      if (node === null) {
        return null;
      } else {
        if (node.value === value) return index;
        else return inner(node.nextNode, value, index + 1);
      }
    };

    return inner(node, value, 0);
  };

  const _insertAt = (node: NodeParameter, value: T, index: number): NodeParameter => {
    if (index === 0) {
      return ListNode(value, node); // Insert with remaining nodes
    } else if (node === null) {
      throw new Error('Index outside of list');
    } else {
      return ListNode(node.value, _insertAt(node.nextNode, value, index - 1));
    }
  };

  const _removeAt = (node: NodeParameter, index: number): NodeParameter => {
    if (node === null) {
      throw new Error('Index outside of list');
    } else if (index === 0) {
      return node.nextNode; // Return remaining nodes
    } else {
      return ListNode(node.value, _removeAt(node.nextNode, index - 1));
    }
  };

  return {
    /**
     * Append new node
     * @param {T} value Value of node to be appended
     */
    append: (value: T) => {
      _head = _append(_head, value);
    },
    /**
     * Prepend new node
     * @param {T} value Value of node to be appended
     */
    prepend: (value: T) => {
      const _new = ListNode(value, _head);
      _head = _new; // Assign new node to head
    },
    /**
     * size of list
     */
    get size() {
      return _size(_head);
    },
    /**
     * head of list
     */
    get head() {
      return _head;
    },
    /**
     * tail of list
     */
    get tail() {
      return _tail(_head);
    },
    /**
     * get node at index
     * @param {number} index
     */
    at: (index: number) => _at(_head, index),
    /**
     * remove last node from list
     */
    pop: () => {
      _head = _removeAt(_head, _size(_head) - 1);
    },
    /**
     * Return true if list contains `value`, otherwise false
     * @param {T} value Value to search for
     */
    contains: (value: T) => _contains(_head, value),
    /**
     * Return index of node that has `value`, null if not found
     * @param {T} value Value to find
     */
    find: (value: T) => _find(_head, value),
    /**
     * @returns a string representation of list
     */
    toString: () => _toString(_head),
    /**
     * @param {number} index index to insert at
     * @param {T} value value of node to insert
     */
    insertAt: (index: number, value: T) => {
      _head = _insertAt(_head, value, index);
    },
    /**
     * @param {number} index index to remove from
     */
    removeAt: (index: number) => {
      _head = _removeAt(_head, index);
    },
  };
}

interface ListNodeType<T> {
  value: T | null;
  nextNode: ListNodeType<T> | null;
}

/**
 * Node factory
 * @param {any} value Value that node holds
 * @param {Node} nextNode Reference to next node
 */
function ListNode<T>(value: T | null = null, nextNode: ListNodeType<T> | null = null) {
  return { value, nextNode };
}

console.clear();

const list = LinkedList();

list.append('A');

console.log(list.toString());

list.append('B');
list.append('C');
list.append('D');

console.log(list.toString());

console.log(list.size);

console.log(list.head);

console.log(list.tail);

console.log(list.at(3));

list.pop();

console.log(list.toString());
console.log(list.contains('A'));
console.log(list.contains('1'));

console.log(list.toString());
console.log(list.find('A'));
console.log(list.find('B'));
console.log(list.find('C'));

console.log(list.toString());
list.insertAt(1, 'J');
console.log(list.toString());
try {
  list.insertAt(4, 'J'); // Should throw
} catch (e: any) {
  console.log(e.message);
}
try {
  list.insertAt(-1, 'J'); // Should throw
} catch (e: any) {
  console.log(e.message);
}
console.log(list.toString());
list.removeAt(0);
console.log(list.toString());
list.removeAt(1);
console.log(list.toString());
try {
  list.removeAt(3); // Should throw
} catch (e: any) {
  console.log(e.message);
}
console.log(list.toString());
