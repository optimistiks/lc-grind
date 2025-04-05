/**
 * // Definition for a _Node.
 * function _Node(val, next, random) {
 *    this.val = val;
 *    this.next = next;
 *    this.random = random;
 * };
 */

/**
 * @param {_Node} head
 * @return {_Node}
 */
var copyRandomList = function (head) {
  const map = new Map();

  let cur = head;

  while (cur) {
    map.set(cur, new _Node(cur.val, null, null));
    cur = cur.next;
  }

  cur = head;

  while (cur) {
    if (cur.next) {
      map.get(cur).next = map.get(cur.next);
    }
    if (cur.random) {
      map.get(cur).random = map.get(cur.random);
    }
    cur = cur.next;
  }

  return map.get(head);
};

/*
REACTO

Repeat
given head of a linked list of length n
where each node have an additional pointer that points to random node, or null
return
a copy of the linked list with the same structure
no node in the new list should point to any node of the old list
linked list can be of size 0

Example

Approach
so if we follow only "next" pointer, we will traverse the whole linked list

so what if we traverse the original list, creating a new list as we go
the new list will have the random pointers set to null

now we need to populate random pointers

first pass, enumerate nodes
second pass: record what node points to what node (indexes, for example 2->5)
third pass: create an array of nodes
fourth pass: reconnect nodes according to map

what about little linked lists
for example
A->B (next)
A->C (random)

oldNode ---> newNode mapping

when we iterate the linked list
save oldA: newA 
so then when you make a second pass over the initial linked list
you can see oldNode.random, find that node in the map, and connect your new node to that


*/
