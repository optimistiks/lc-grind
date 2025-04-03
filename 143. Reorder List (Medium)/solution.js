/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} head
 * @return {void} Do not return anything, modify head in-place instead.
 */
var reorderList = function (head) {
  let slow = head;
  let fast = head.next;

  while (fast && fast.next) {
    slow = slow.next;
    fast = fast.next.next;
  }

  // because we start fast at node 1, not node 0
  // in both odd length and even length cases
  // slow will land at the node in front of the half we need to reverse
  // odd case: 1->2->3->4->5->6->7->null, slow will land at 4
  // even case: 1->2->3->4->5->6->null, slow will land at 3

  // now reverse

  let prev = null;
  let cur = slow.next;

  // detach the half we're going to reverse
  slow.next = null;
  // so now A->B->C(slow)->D(cur)->E->F->null
  // is
  // A->B->C(slow)->null and D(cur)->E->F->null

  // reverse the last half
  while (cur) {
    const next = cur.next;

    cur.next = prev;

    prev = cur;
    cur = next;
  }

  // at the end of the loop, prev is the head of the reversed list

  // now merge

  let ptr1 = head;
  let ptr2 = prev;

  while (ptr1 && ptr2) {
    const oldPtr1Next = ptr1.next;

    ptr1.next = ptr2;

    ptr1 = ptr1.next;
    ptr2 = oldPtr1Next;
  }

  return head;
};

/*
REACTO

Repeat
input:
    head of a linked list
output:
    head of a reordered linked list
    such as
    L0->L1->...->Ln-1->Ln
    becomes
    L0->Ln->L1->Ln-1->L2->Ln-2
    so do we just reverse the second half
    A0->B1->C2->Dn-2->En-1->Fn
    L0->Ln->L1->Ln-1->L2->Ln-2
    A->F->B->E->C->D
    F E D is a reversed half, which is later merged with the first half
    odd case:
    A(0)->B(1)->C(2)->D(3)->E(n-2)->F(n-1)->G(n)->null
    result:
    A->G->B->F->C->E->D
    G->F->E is a reversed half
    so in odd case of len 7, 
    if we move slow and fast pointers
    A->B->C->D->E->F->G->null
  f,s
    A->B->C->D->E->F->G->null
       s  f
    A->B->C->D->E->F->G->null
          s     f
    A->B->C->D->E->F->G->null
             s        f
    s will stop at node d
    let's see for even case
    A->B->C->D->E->F->null
  f,s
    A->B->C->D->E->F->null
       s  f
    A->B->C->D->E->F->null
          s     f
    A->B->C->D->E->F->null
             s        f
    s will land at the first node of the half to be reversed
    in odd case s will land at the node in front of the first node of the half to be reversed

    dummy->A->B->C->D->E->F->null
    f      s
    dummy->A->B->C->D->E->F->null
            f,s
    dummy->A->B->C->D->E->F->null
                 s  f
    dummy->A->B->C->D->E->F->null
                    s     f
    dummy->A->B->C->D->E->F->null
    f      s

    A->B->C->D->E->F->null
    f  s     
    A->B->C->D->E->F->null
          sf 
    A->B->C->D->E->F->null
             s  f          

    A->B->C->D->E->F->null
    s  f     
    A->B->C->D->E->F->null
       s     f   
    A->B->C->D->E->F->null
          s        f  


    A->B->C->D->E->F->G->null
    s  f
    A->B->C->D->E->F->G->null
       s     f
    A->B->C->D->E->F->G->null
          s        f
    A->B->C->D->E->F->G->null
             s           f

    // even case len=6
    // when f,s start at 0
    A->B->C->D->E->F->null
   f,s
    // f goes: 0, 2, 4, 6(null)
    // s goes: 0, 1, 2, 3(second mid node)
    // when s start at 0, f start at 1
    A->B->C->D->E->F->null
    s  f
    // f goes: 1, 3, 5(last node)
    // s goes: 0, 1, 2(first mid node)
    here we want s to make 3 jumps, not 4
    so we make f make 3 jumps by moving it to 1
    because it makes 4 jumps when it starts at 0, and ends at null
    so it will make only 3 jumps when starts at 1

    // odd case len=7
    // when f,s start at 0
    A->B->C->D->E->F->G->null
   f,s
    // f goes: 0, 2, 4, 6(last node)
    // s goes: 0, 1, 2, 3(mid node)
    // when s start at 0, f start at 1
    A->B->C->D->E->F->G->null
    s  f
    A->B->C->D->E->F->G->null
       s     f
    A->B->C->D->E->F->G->null
          s        f
    A->B->C->D->E->F->G->null
             s            f
    // f goes: 1, 3, 5, (7(null))
    // s goes: 0, 1, 2, 3
    so in odd case, we want s to make 4 jumps
    f must do 4 jumps as well
    it makes 4 jumps when it starts from 0 (lands at last node)
    and it also makes 4 jumps when it starts from 1 (lands at null)

    A->B->C->null 
    p1
    D->E->F->null
    p2

    oldP1Next = p1.next (B->C->null)
    p1.next = p2 (A->D->E->F->null) 

    p1 = p1.next (A->D(p1)->E->F->null)
    p2 = oldP1Next (B->C->null)

    oldP1Next = p1.next (E->F->null)
    p1.next = p2 (A->D->B->C->null)

    p1 = p1.next (A->D->B(p1)->C->null)
    p2 = oldP1Next (E->F->null)

    oldP1Next = p1.next (C->null)
    p1.next = p2 (A->D->B->E->F->null)

    p1 = p1.next (A->D->B->E(p1)->F->null)
    p2 = oldP1Next (C->null)

    oldP1Next = p1.next (F->null)
    p1.next = p2 (A->D->B->E->C->null)

    p1 = p1.next (A->D->B->E->C(p1)->null)
    p2 = oldP1Next (F->null)

    oldP1Next = p1.next (null)
    p1.next = p2 (A->D->B->E->C->F->null)

    p1 = p1.next (F->null)
    p2 = oldP1Next (null)

    // size 1 example
    A->null
    s  f
    loop doesnt run
    // now reverse
    prev = null
    cur = slow.next (null) 
    slow.next = null (no effect)
    loop doesnt run

    // size 2 example
    A->B->null
    s  f
    loop doesnt run
    // now reverse
    prev = null
    curr = slow.next (B->null)
    slow.next = null (detached A->)
    curr.next = prev (B->null)
    prev = curr
    curr = next (null)
    stop
    so we have detached A->null and B->null
    // now merge
    A->null
   p1
    B->null
   p2

   next = p1.next (null)
   p1.next = p2 (A->B->null)

   p1 = p1.next (null)
   p2 = next (null)

   // size 3 example
   A->B->C->null
   s  f
   A->B->C->null
      s     f
   loop stop
   // now reverse
   prev = null
   curr = s.next (C->null)
   s.next = null (detached A->B->null)
   while curr
        next = curr.next (null)

        curr.next = prev (C->null)
        prev = curr; (C->null)
        curr = next
    stop (C->null)
    // merge
    A->B->null
    p1
    C->null
    p2

    next = p1.next (B->null)
    p1.next = p2 (A->C->null)

    p1 = p1.next (C->null)
    p2 = next (B->null)
    
    next = p1.next (null)
    p1.next = p2 (A->C->B->null)

    // example len 4
    A->B->C->D->null
    s  f 
    A->B->C->D->null
       s     f 
    // reverse
    prev = null
    curr = s.next (C->D->null)
    s.next = null (A->B->null)

    D(prev)->C->null

    A->B->null
    p1
    D->C->null
    p2

    make A->D->C->null and B->null
    shift p1 A->D(p1)->C->null B(p2)->null
    make A->D->B->null
    shift p1 A->D->B(p1)->null C(p2)->null




*/
