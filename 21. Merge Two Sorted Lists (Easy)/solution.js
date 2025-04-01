/**
 * Definition for singly-linked list.
 * function ListNode(val, next) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.next = (next===undefined ? null : next)
 * }
 */
/**
 * @param {ListNode} list1
 * @param {ListNode} list2
 * @return {ListNode}
 */
var mergeTwoLists = function (list1, list2) {
  const head = new ListNode(Number.NEGATIVE_INFINITY, null);

  let prev = head;
  let cur1 = list1;
  let cur2 = list2;

  while (cur1 && cur2) {
    if (cur1.val < cur2.val) {
      prev.next = cur1;
      cur1 = cur1.next;
    } else {
      prev.next = cur2;
      cur2 = cur2.next;
    }
    prev = prev.next;
  }
  if (cur1) prev.next = cur1;
  if (cur2) prev.next = cur2;
  return head.next;
};
