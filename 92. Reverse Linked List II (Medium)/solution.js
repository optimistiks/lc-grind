/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} left
 * @param {number} right
 * @return {ListNode}
 */
var reverseBetween = function (head, left, right) {
  // node that precedes our sublist (left - 1)
  let subListPrev = null;
  // node that is start of our sublist (left)
  let subListHead = null;
  // node that is end of our sublist (right)
  let subListTail = null;
  // node that is after our sublist (right + 1)
  let subListNext = null;

  // node pos at cursor
  let i = 1;
  // node before cursor
  let prev = null;
  // current node
  let curr = head;

  // previous node for sublist reversal
  let subPrev = null;

  while (curr) {
    if (i === left) {
      // we are at sublist start,
      // remember current node as sublist start,
      // and previous node as one preceding the sublist
      subListPrev = prev;
      subListHead = curr;
      // detach preceding node (reattach later to a reversed sublist)
      if (subListPrev) subListPrev.next = null;
    }
    if (i === right) {
      // we are at sublist end,
      // remember current node as sublist end,
      // and next one as one going after the sublist
      subListTail = curr;
      subListNext = curr.next;
      // detach sublist from the rest of the list,
      // reattach later when its reversed
      subListTail.next = null;
    }
    if (i >= left && i <= right) {
      // when we are inside our sublist,
      // perform reversal operation
      // use subPrev so our reversed sublist's tail points to null
      const next = curr.next;
      curr.next = subPrev;
      subPrev = curr;
      prev = curr;
      curr = next;
    } else {
      // if we are outside of our sublist boundaries just advance forward
      prev = curr;
      curr = curr.next;
    }
    ++i;
  }

  // at this point, subListTail is our reversed sublist head,
  // subListHead is our reversed sublist tail,
  // subListPrev is a node that precedes our sublist (if any)
  // subListNext is a node that goes directly after our sublist (if any)

  // if we had a part that precedes our sublist,
  // reconnect it with our reversed sublist
  if (subListPrev) {
    subListPrev.next = subListTail;
  }

  // reconnect the end of our reversed sublist with the rest of the list
  subListHead.next = subListNext;

  // if we have a node that precedes our sublist,
  // it means head of our resulting sublist is actually the original head
  // it means the sublist that we reversed starts at some point after the original head
  if (subListPrev) {
    return head;
  }

  // otherwise head of our resulting sublist is our reversed sublist head,
  return subListTail;
};
