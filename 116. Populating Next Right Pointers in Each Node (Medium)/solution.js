/**
 * // Definition for a _Node.
 * function _Node(val, left, right, next) {
 *    this.val = val === undefined ? null : val;
 *    this.left = left === undefined ? null : left;
 *    this.right = right === undefined ? null : right;
 *    this.next = next === undefined ? null : next;
 * };
 */

/**
 * @param {_Node} root
 * @return {_Node}
 */
var connect = function (root) {
  // we traverse the tree level by level by using two variables,
  // left and current

  // left is always the leftmost element of the current level,
  // current starts the same as left, but moves right along the level

  // so the algorithm is
  // root is left, current
  // current.left.next = current.right
  // current.next is null, shift level
  // make root.left next, current

  // current.left.next = current.right
  // current.next is not null
  // so current.right.next = current.next.left
  // make current current.next
  // current.left.next = current.right
  // current.next is now null, shift level

  let left = root;
  let current = root;

  // when we are at root, current and left are both the root
  // so we connect the children current.left.next = current.right
  // then we shift down, make left child root (current), and make left child of left child (left)
  // then we repeat, connecting children, but now, instead of shifting down
  // we check if current.next is defined, because we might have connected it to something at the previous step

  while (left) {
    if (current.left) {
      current.left.next = current.right;
    }
    if (current.next) {
      if (current.right) {
        current.right.next = current.next.left;
      }
      current = current.next;
    } else {
      left = left.left;
      current = left;
    }
  }

  return root;
};
