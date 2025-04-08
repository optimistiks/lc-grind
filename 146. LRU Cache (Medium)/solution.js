/**
 * @param {number} capacity
 */
var LRUCache = function (capacity) {
  this.capacity = capacity;
  this.size = 0;

  this.map = new Map();

  // dummy head, true head is this.head.next
  this.head = new Node(null, null, null, null);
  // dummy tail, true tail is this.tail.prev
  this.tail = new Node(null, null, null, null);

  this.head.next = this.tail;
  this.tail.prev = this.head;
};

/**
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function (key) {
  if (!this.map.has(key)) return -1;

  const node = this.map.get(key);

  this._detachNode(node);
  this._putNodeInFront(node);

  return node.val;
};

/**
 * @param {number} key
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function (key, value) {
  let node = this.map.get(key);

  if (node) {
    node.val = value;

    this._detachNode(node);
    this._putNodeInFront(node);
  } else {
    node = new Node(key, value, null, null);

    // inserting new node, need to check capacity
    if (this.size === this.capacity) {
      this._deleteFirstNode();
    }

    this._putNodeInFront(node);
    this.map.set(key, node);
    this.size += 1;
  }
};

LRUCache.prototype._detachNode = function (node) {
  node.prev.next = node.next;
  node.next.prev = node.prev;
};

LRUCache.prototype._putNodeInFront = function (node) {
  const tail = this.tail.prev;
  // put old true tail behind node
  tail.next = node;
  // put dummy tail in front of node
  this.tail.prev = node;
  // put old true tail behind node
  node.prev = tail;
  // put dummy tail in front of node
  node.next = this.tail;
};

LRUCache.prototype._deleteFirstNode = function () {
  const firstNode = this.head.next;

  // this.head.next is true head, make next node new true head
  this.head.next = this.head.next.next;
  // dummy head should be behind new true head
  this.head.next.prev = this.head;

  this.map.delete(firstNode.key);

  this.size -= 1;
};

/**
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */

var Node = function (key, val, next, prev) {
  this.key = key;
  this.val = val;
  this.next = next;
  this.prev = prev;
};

/*
REACTO

Repeat
Impl LRUCache class
   can cache _capacity_ items
   get value by key, return value, or -1
   put value by key, update if exists, otherwise set
       if cannot set due to capacity, evict least recently used
   get and put must run O(1) average

Approach
   get must update recent used
   so store values in a key:value Map
   where value is a linked list
   linked list is initialized with a value
   then new value is added in front or in the back?
       in front?
   should we also keep key: LinkedListNode references?

   so get
       get linked list node by key (from a map)
       move linked list node to the front of the list (head & tail references?)
       return node value
   put
       obtain linked list node of the key (get or create)
       if capacity is reached, delete head node

[h] -> [t] -> null
capacity = 1
size = 0
put
[h] -> 1 -> [t] -> null
put
firstNode = 1
[h].next = [h].next.next
[h] -> [t] -> null


*/
