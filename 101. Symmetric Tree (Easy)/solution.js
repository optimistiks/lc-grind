/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} root
 * @return {boolean}
 */
var isSymmetric = function (root) {
  const queue = [root.left, root.right];

  while (queue.length > 0) {
    const a = queue.shift();
    const b = queue.shift();
    const isSame = (a === null && b === null) || (a && b && a.val === b.val);
    if (!isSame) {
      return false;
    }
    if (a && b) {
      queue.push(a.left, b.right, a.right, b.left);
    }
  }

  return true;
};
