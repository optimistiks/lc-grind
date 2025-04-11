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
var reverseKGroup = function (head, k) {
  let l = head;
  let r = head;

  let newHead = null;
  let prevReversed = null;

  while (r !== null) {
    // move r k-1 times forward, so l is on the first node of the section of k nodes,
    // and r is on the last node of the section of k nodes
    for (let i = 0; i < k - 1; ++i) {
      if (r) r = r.next;
    }

    if (r === null) {
      // a leftover group of less than k nodes, do nothing with it
      break;
    }

    // save reference to the k+1 node
    const rightPartHead = r.next;
    // detach this section of k nodes to prepare it for reversion
    r.next = null;

    // reverse this section of k nodes
    const reversed = reverseList(l);
    // reversed.head is the head of the reversed section
    // reversed.tail is the tail of the reversed section

    // reconnect reversed section with the rest of the list
    reversed.tail.next = rightPartHead;

    // we may have a list we have reversed previously,
    // we need to reconnect it's tail with the head of the newly reversed section
    if (prevReversed) {
      prevReversed.tail.next = reversed.head;
      prevReversed = reversed;
    } else {
      // this is when we reverse our first section of k nodes
      // save reference to it's head it's what we are going to return
      newHead = reversed.head;
      prevReversed = reversed;
    }

    // move both l and r to the next section of the linked list
    l = rightPartHead;
    r = rightPartHead;
  }

  function reverseList(head) {
    let prev = null;
    let curr = head;

    while (curr) {
      const temp = curr.next;
      curr.next = prev;
      prev = curr;
      curr = temp;
    }

    return { head: prev, tail: head };
  }

  return newHead;
};

/*
REACTO

Repeat
given head of linked list
return head of a modified list
    where each group of k nodes is reversed

Example
1->2->3->4->5->null k=2
result: 2->1->4->3->5->null
group 1->2 is reversed, group 3->4 is reversed, leftover is left as is

Approach
reduce this problem to reverse n linked lists?

what if we move 2 pointers

        1->2->3->4->5->null
       lr
move r k-1 times forward
        1->null k=1
       lr   
save the leftover list r.next
detach linked list from the rest of the list r.next = null
head of the linked list we need to reverse: l
return from reverse: prev(new head), l (tail node)
we have a leftover right part saved, reconnect l.next = right part
we may have something on the left part too, left part

from the reversion of 2->1->null we have reference to 2 (head) and to 1(tail)
2->1->3->4->5->null
     lr
after we reversed 3->4 into 4->3->null we have 4(head) and 3(tail)
connect prev tail (1) to new head (4)

--- old ---
sublistTail=null,sublistHead=null
  1->2->3->4->5->null
l,r
move r k-1 times forward
  1->2->3->4->5->null
  l  r   
initialize sublistTail=l, sublistHead=r
reverse
<-1  2->3->4->5->null
    lr   
while loop stopped
<-1<-2  3->4->5->null
       lr
move r k-1 times forward
<-1<-2  3->4->5->null
        l  r
sublistTail.next = r (2->1->4)
2->1->4 3->4->5->null

*/
