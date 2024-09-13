/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {boolean}
 */
var isPalindrome = function (head) {
  // we're going to move through the list with 2 ptrs
  // one is going to move 1 step forward
  // other 2 steps forward
  // in an odd linked list, when fast is at the last node,
  // slow will be at the middle node
  // in an even linked list, when fast is at null,
  // slow will be at the right middle node
  // (we will need a reference to the left middle node as well)
  // we're going to detach the second half and reverse it
  // then compare and attach back again un-reversed

  let prev = null;
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    prev = slow;
    slow = slow.next;
    fast = fast.next.next;
  }

  // end of first half of the LL
  let tail = fast === null ? prev : slow;
  // start of the second half of the LL
  let halfHead = fast === null ? slow : slow.next;
  // detach
  tail.next = null;

  // reverse second half
  const reversedHalf = reverse(halfHead);

  let isPalindrome = true;

  let compare = head;
  let compareReverse = reversedHalf;

  while (compareReverse) {
    if (compareReverse.val !== compare.val) {
      isPalindrome = false;
      break;
    }
    compare = compare.next;
    compareReverse = compareReverse.next;
  }

  tail.next = reverse(reversedHalf);

  return isPalindrome;
};

function reverse(node) {
  let prev = null;
  let head = node;
  while (head) {
    const next = head.next;
    head.next = prev;
    prev = head;
    head = next;
  }
  return prev;
}
