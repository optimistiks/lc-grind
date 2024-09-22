/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} k
 * @return {ListNode}
 */
var swapNodes = function (head, k) {
  let count = 0;
  // front and end pointers will be used to track the kth node from
  // the start and end of the linked list, respectively
  let front = null,
    end = null;
  let curr = head;

  while (curr != null) {
    count++;

    // if end is not null, it means kth node from the begining
    // has been found. Now, we can move the end pointer in the
    // linked list to find the kth node from the end of the linked list
    if (end != null) end = end.next;

    // if the count has become equal to k, it means that the curr is
    // pointing at the kth node from the start of the linked list
    if (count == k) {
      front = curr;
      end = head;
    }

    curr = curr.next;
  }
  // swap the values of two nodes
  const temp = front.val;
  front.val = end.val;
  end.val = temp;

  return head;
};
