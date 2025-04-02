/**
 * Definition for singly-linked list.
 * function ListNode(val) {
 *     this.val = val;
 *     this.next = null;
 * }
 */

/**
 * @param {ListNode} head
 * @return {boolean}
 */
var hasCycle = function (head) {
  let slow = head;
  let fast = head;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;

    if (slow === fast) {
      return true;
    }
  }

  return false;
};

/*
REACTO

Repeat
input:
    head: ListNode
output:
    boolean, true if there is a cycle, otherwise false

Example
1->2->3->4->null false
1->2(k)->3->4->k true

Approach
s = head
f = head

f = f.next.next
s = s.next

if (s === f) return true

while loop condition

1(f)->2->null
while (fast && fast.next)
(if fast is at the last node, it won't proceed because fast.next === null)
(if fast is at the second to last node, it will proceed because fast.next.next = null)

1->2->3->4->5->null
f,s
1->2->3->4->5->null
   s  f
1->2->3->4->5->null
      s     f
      
1->2->3->4->5->6->null
f,s
1->2->3->4->5->6->null
   s  f
1->2->3->4->5->6->null
      s     f
f === 5->6->null

*/
