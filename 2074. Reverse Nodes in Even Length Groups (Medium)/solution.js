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
var reverseEvenLengthGroups = function (head) {
  if (!head.next) {
    return head;
  }

  // we skip the first node since it's an odd group 1, and start with the second node and the second group

  // this is the max number of nodes in a group we're currently iterating
  // it starts with 2, and then increments by 1 each time a group is fiished
  let currentGroupLength = 2;

  // this is the number of nodes we visited in the current group
  let currentGroupNodesCount = 0;

  // start node of the current group
  let currentGroupStart = head.next;

  // node that precedes the starting node of the current group
  let currentGroupPrev = head;

  let cursor = currentGroupStart;
  while (cursor) {
    // increment the number of nodes we've seen so far in a group
    currentGroupNodesCount += 1;

    // is it a last group
    // the last group is handled based on the number of nodes we've seen in it
    // even if it's a group that needs to have 5 nodes but only has 2, we reverse it
    const isLastGroup = cursor.next === null;

    // if we've seen all nodes in a gruop
    if (currentGroupLength === currentGroupNodesCount) {
      // if current group is an even group
      if (currentGroupLength % 2 === 0) {
        // reverse group, first node of the group is currentGroupStart,
        // a reversed group will be reattached to currentGroupPrev (a node that precedes the group)
        reverseGroup(
          currentGroupPrev,
          currentGroupStart,
          currentGroupNodesCount
        );
        // at this point, currentGroupStart is actually the end node of the reversed group
        // reset values to prepare for the next group iteration
        currentGroupPrev = currentGroupStart;
        currentGroupStart = currentGroupStart.next;
        currentGroupNodesCount = 0;
        currentGroupLength += 1;
        cursor = currentGroupStart;
      } else {
        // we've seen all nodes in a group, but the group is an odd group
        // so we don't reverse it and just reverse the values
        currentGroupPrev = cursor;
        currentGroupStart = cursor.next;
        currentGroupNodesCount = 0;
        currentGroupLength += 1;
        cursor = cursor.next;
      }
    } else {
      // not all nodes were seen in the group, but if we are at the last node of the linked list,
      // we need to check if the last group contains an even number of nodes
      if (isLastGroup && currentGroupNodesCount % 2 === 0) {
        // reverse the last group based on the actual amount of nodes in it
        reverseGroup(
          currentGroupPrev,
          currentGroupStart,
          currentGroupNodesCount
        );
        // advance the cursor, currentGroupStart is the last node of the reversed group, so it will end the while loop
        cursor = currentGroupStart.next;
      } else {
        // just advance the cursor
        cursor = cursor.next;
      }
    }
  }

  return head;
};

// reverse group of length nodes, starting from head,
// prev is the node that precedes the head node
// reattach reversed group to prev
function reverseGroup(prev, head, length) {
  if (prev) {
    prev.next = null;
  }

  let l = 0;
  let newPrev = null;
  let curr = head;

  while (curr && l < length) {
    const next = curr.next;
    curr.next = newPrev;
    newPrev = curr;
    curr = next;
    l += 1;
  }

  // at this point newPrev is the head of the reversed group
  // and head is the end node of the reversed group

  if (prev) {
    // reconnect the reversed group with the preceding node of the group
    prev.next = newPrev;
  }

  // reconnect the reversed group with the next node of the group
  head.next = curr;

  return newPrev;
}
