/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @param {number} n
 * @return {ListNode}
 */
var removeNthFromEnd = function (head, n) {
  const dummy = new ListNode(null, head);

  // initialize L and R at "0th" node
  let L = dummy;
  let R = dummy;

  // move R two steps forward, so the distance between L and R is n
  // for example, if n=2, L will be at "0th" dummy node, and R will be and 2nd node
  for (let i = 0; i < n; ++i) {
    R = R.next;
  }

  // move L and R simultaneously forward until R reaches the last node
  // the last node is the 1st node from the end
  // and since the distance between L and R is n
  // L will be at the nth+1 node from the end
  // so the node we need to remove (nth node from the end) will be at L.next
  while (R.next) {
    L = L.next;
    R = R.next;
  }

  // connect nth+1 node from the end with nth-1 node from the end,
  // essentially removing the nth node
  L.next = L.next.next;

  // having dummy node is helpful when we have a list of size 1
  // in this case, L will be at the dummy node, and R will be at the first node (also last)
  // so by removing the node we set dummy next to null
  // so we don't need to handle this special case separately
  // (case when we need to delete the first node of the list, or when n === size)

  return dummy.next;
};

/*
REACTO

Repeat
input: head of a linked list
output: head of a linked list with removed nth node from the end

Example
given 1->2->3->4->5->null, 2
- 2nd node from the end is 4
return 1->2->3->5->null

given 1->null, 1
- 1st node from the end is 1
return null

given 1->2->3->null, 3
- 3rd node from the end is 1
return 2->3->null

given 1->2->3->null, 1
- 1st node from the end is 3
return 1->2->null

Approach
sz = size of the linked list
an nth node from the end is sz - n + 1 node from the start
example
given 1->2->3->null, 1
1st node from the end is node 3
3-1+1 = 3 (3nd node from the start)
3rd node from the start is node 3
I wonder if we should instead just get a previous node
sz - n
3 - 1 = 2 (2nd node from the start is followed by the 3rd node, the one we need to delete)

1->2->3->4->5->null, 3
3rd node from the end is 3
sz = 5
5-3 = 2
2nd node from the start is followed by the node we need to delete

1->null, 1, sz=1
1-1=0
nothing precedes the node we need to delete

what if we treat sz-n as a number of jumps
so if sz=0, no jumps are made, 
but if no jumps are made, and prev is null, curr is head
we need to connect prev with curr.next to delete a node
it would be nice if prev would be a dummy node
in this case we could return dummy.next as new head

1->null, 1, sz=1

is there a way to avoid calculating the size of the list
what if we initialize 
slow=0
fast=n-1

1->2->3(del)->4->5->null, 3
s     f
1->2->3->4->5->null, 3
   s        f


1->2->3->4->5(del)->null, 1
s  f     
1->2->3->4->5(del)->null, 1
   s  f   
1->2->3->4->5(del)->null, 1
      s  f            
1->2->3->4->5(del)->null, 1
         s  f         

1->2->3->4->5(del)->null, 2
s     f   
1->2->3->4->5(del)->null, 2
   s     f
1->2->3->4->5(del)->null, 2
      s     f         
1->2->3->4->5(del)->null, 2
         s  f         

so if we make distance between s and f equal to n
and then move them simultaneously
as soon as f reaches the last element (1st from the end)
s would land on an nth + 1 from the end, so s.next is the nth element

1->null, 1
dummy node?

dummy->1->null
sf      
jump one time because n=1
dummy->1->null
s      f      
f will not move anymore since it's the last node
connect s.next with f.next return dummy.next

dummy->1->2->3->null, n=2
s         f
dummy->1->2->3->null
       s     f


*/
