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
var reverseList = function (head) {
  /* iterative */
  // let prev = null;
  // let curr = head;
  // let next = head?.next;

  // // at each iteration, set curr.next with prev
  // // we previously saved old curr.next to next
  // // shift everything forward by assigning next to curr
  // while (curr) {
  //     curr.next = prev;

  //     prev = curr;
  //     curr = next;
  //     next = curr?.next;
  // }

  // return prev;

  /* recursive */

  // if (!head) {
  //     return null;
  // }

  // const reverse = (prev, curr) => {
  //     if (curr === null) {
  //         return prev;
  //     }
  //     const next = curr.next;
  //     curr.next = prev;
  //     return reverse(curr, next);
  // }

  // return reverse(null, head)

  /* another recursive */
  const reverse = (node) => {
    if (node === null || node.next === null) {
      // if it's a last node or null, nothing to do here
      return node;
    }

    const result = reverse(node.next);
    // when node is A->B->null, second to last node
    // "result" is the last node B->null
    // what we do next is first put A in front of B B->A->B.... (loop)
    // then clear the loop for A B->A->null;
    // result contains the last node which is now the new head

    // node puts itself as a next node of it's next neighbor
    node.next.next = node;
    // node.next still points to that neighbor, creating a loop, so clear the loop
    node.next = null;

    return result;
  };

  return reverse(head);
};

/*
REACTO

Repeat
input:
    head: first ListNode of LL
output: 
    first ListNode of LL in reverse (former last node)

Example
1->2->3->null
3->2->1->null
1->null
1->null
null
null

Approach
so we have nodeA and nodeB where nodeA->nodeB
set nodeB.next to nodeA
set nodeA.next to whatever was in nodeB.next

A->B->C->D->null
set B.next = A; A.next = null

we have two detached lists
B->A->null
C->D->null

set C.next = B
C->B->A->null
D->null

set D.next = C

so once again
A->B->C->D->null

prev=null;
cur=A;
next = cur.next (B)

cur.next = prev (A->null; B->C->D->null;)

prev = cur (A)
cur = next (B)
next = cur.next (C)

cur.next = prev (B->A->null; C->D->null;)

prev = cur (B)
cur = next (C)
next = 

null

prev = null
curr = null
(curr is null, stop)

A->null
prev = null
cur = A
next = cur.next (null)

cur.next = prev

prev = cur (A)
cur = next (null)
next = cur.next (null)
(cur is null, stop)

Recursive:
base case
    if node.next = null
    node.next = prev

A->B->C->D->null

call(prev = null, curr = A->B->C->D->null)
    if curr.next === null
    else
        call(prev = curr (A->B->C->D->null), curr = curr.next (B->C->D->null))
            if curr.next === null
            else
                call(prev = curr (B->C->D->null), curr = curr.next (C->D->null))
                    if curr.next === null
                    else
                        call(prev = curr (C->D->null), curr = curr.next (D->null))
                            if curr.next === null (TRUE)
                                curr.next = prev; (D->C->D->C..... loop)
                                prev.next = null; (C->null (break loop))
                                return curr (D->C->null)
                        result = D->C->null
                        (prev = B->C->null, curr = C->null)
                        curr.next = prev; (C->B->C->... loop)
                        prev.next = null; (C->B->null break loop)
                        return result (D->C->B->null)
                result (D->C->B->null)
                (prev A->B->null, curr B->null)
                curr.next = prev; (B->A->B->... loop)
                prev.next = null; (B->A->null break loop)
                return result (D->C->B->A->null)
        result (D->C->B->A->null)
        (prev = null, curr = A->null)
        curr.next = prev (A->null)

call(prev = null, curr = A->B->C->D->null)
    if curr.next === null
    else
        call(prev = curr (A->B->C->D->null), curr = curr.next (B->C->D->null))
            if curr.next === null
            else
                call(prev = curr (B->C->D->null), curr = curr.next (C->D->null))
                    if curr.next === null
                    else
                        call(prev = curr (C->D->null), curr = curr.next (D->null))
                            if curr.next === null (TRUE)
                                curr.next = prev; (D->C->D->C..... loop)
                                return curr (D->C->D->C...)
                        result = D->C->D->C....
                        (prev = B->C->D->C->D...., curr = C->D->C....)
                        curr.next = prev; (C->B->C->B->C->... loop)
                        return result (D->C->B->C...)
                result (D->C->B->C...)
                (prev A->B->C->B..., curr B->C->B...)
                curr.next = prev; (B->A->B->... loop)
                return result (D->C->B->A->B...)
        result (D->C->B->A->B-A...)
        (prev = null, curr = A->B->A...)
        curr.next = prev (A->null)
        return D->C->B->A->null
        







*/
