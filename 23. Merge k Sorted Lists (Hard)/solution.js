/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode[]} lists
 * @return {ListNode}
 */
var mergeKLists = function (lists) {
  const nodeMinPq = new MinPriorityQueue((node) => node.val);

  for (const list of lists) {
    if (list) nodeMinPq.enqueue(list);
  }

  const dummy = new ListNode(null, null);

  let current = dummy;
  while (nodeMinPq.size() > 0) {
    const minNode = nodeMinPq.dequeue();
    current.next = minNode;
    current = current.next;
    if (minNode.next) nodeMinPq.enqueue(minNode.next);
  }

  return dummy.next;
};

/*
REACTO

Repeat
given: k linked lists, each sorted ASC
output: single linked list created by merging all linked lists, sorted ASC

Example
1->3->5->null
0->10->20->null
2->4->6->null
0->1->2->3->4->5->6->10->20->null

so if we initialize k pointers
we would want to find min
(first node)
then next min

min heap?
initialize min heap with first k nodes
then as nodes leave the heap, move pointer and get new node


*/
