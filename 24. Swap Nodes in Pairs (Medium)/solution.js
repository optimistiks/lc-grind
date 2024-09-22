/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {ListNode}
 */
var swapPairs = function (head) {
  if (head == null) {
    return head;
  }

  let newHead = head;

  // first we initialize our first pair of nodes to swap,
  // and that is head node and the head.next node

  // node preceding the pair to swap
  let prev = null;
  // first node of the pair to swap
  let first = head;
  // second node of the pair to swap
  let second = head.next;

  // if our linked list only has one element,
  // the while loop wont even start
  while (second) {
    if (prev === null) {
      // if we are at the first pair of nodes,
      // because only in this case prev is null,
      // we update the value that is going to be our return value,
      // the head of the new linked list,
      // it is always going to be the second node of the list,
      // because it will become the first node of the list after the first swap
      newHead = second;
    }

    // the rest of the linked list that goes after the second node in the pair
    const theRest = second.next;

    if (prev) {
      // update node that precedes the pair (to point to the second node)
      prev.next = second;
    }

    // update second node to point to the first node
    second.next = first;
    // update first node to point to the rest of the list
    first.next = theRest;

    // at this point the swap is done

    // define the next pair to process
    // node that precedes our next pair is the former first node of this pair,
    // currently it's the second after the swap
    prev = first;
    // starting node of the next pair is the starting node of "the rest of the list"
    // the rest may be null here if we are at the last pair of the list
    first = theRest;
    // second node of the first pair is the second node in "the rest of the list"
    // set it to null if we are at the last pair of the list
    second = theRest ? theRest.next : null;
  }

  return newHead;
};
