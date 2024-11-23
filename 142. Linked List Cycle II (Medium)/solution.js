/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var detectCycle = function (head) {
  if (head == null) {
    return null;
  }
  // first, find the loop by moving the slow pointer one node at a time,
  // and fast node two times at a time

  let slow = head;
  let fast = head;

  do {
    slow = slow.next;
    fast = fast?.next?.next ?? null;
  } while (slow !== fast);

  if (fast === null) {
    return null;
  }

  // we found a loop
  // at this point, distance from the head of the linked list to the start of the loop is L1,
  // and the distance from the current point (where two pointers met) to the start of the linked list is L1
  // so we move one node to the head, and start moving both of them one node at a time
  // so they will meet at the start of the loop

  slow = head;

  while (slow !== fast) {
    slow = slow.next;
    fast = fast.next;
  }

  return slow;
};
