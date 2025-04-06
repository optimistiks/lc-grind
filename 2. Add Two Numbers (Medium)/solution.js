/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} l1
 * @param {ListNode} l2
 * @return {ListNode}
 */
var addTwoNumbers = function (l1, l2) {
  const dummy = new ListNode(null, null);

  let p1 = l1;
  let p2 = l2;
  let pResult = dummy;
  let carry = null;

  while (p1 || p2) {
    let sum = (p1?.val ?? 0) + (p2?.val ?? 0);

    if (carry) {
      sum += carry;
      carry = null;
    }

    let val = sum;

    if (val >= 10) {
      val = sum % 10;
      carry = 1;
    }

    pResult.next = new ListNode(val, null);
    pResult = pResult.next;

    if (p1) p1 = p1.next;
    if (p2) p2 = p2.next;
  }

  if (carry) {
    pResult.next = new ListNode(carry, null);
  }

  return dummy.next;
};

/*
REACTO

Repeat
given
    two linked lists size > 0
    they represent two non-negative integers
    with each node being that integer's digit
    in reverse order
return
    sum of integers represented similarly
no leading zeros except 0

Example
2->4->3->null represents number 342
5->6->4->null represents number 465
342+465 = 807
return 8->0->7->null

Approach
how do we sum numbers
342
465

first we sum the last digit
342
465
  7

then second to last

1  (carry)
342
465
 07

342
465
807

so it seems our digits aligned properly
we just need to manage carry?

2->4->3->null
p1
5->6->4->null
p2

p1+p2 = 7, create new node 7
move p1 and p2

2->4->3->null
   p1
5->6->4->null
   p2

p1+p2 = 10
sum >= 10
    create new node sum % 10 
    carry 1 (a variable)?
move p1 and p2

2->4->3->null
      p1
5->6->4->null
      p2

p1+p2 = 7 (carry not null, add carry, set carry to null)
update carry if necessary

last step if carry not null

2->4->3->null
p1
5->null
p2

342
  5
  7

2->4->3->null
   p1
5->null
   p2 

*/
