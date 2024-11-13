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
 * @return {number[][]}
 */
var zigzagLevelOrder = function (root) {
  if (!root) {
    return [];
  }

  const dq = [root];
  const result = [];
  let reverse = false;

  while (dq.length > 0) {
    result.push([]);
    const size = dq.length;
    for (let i = 0; i < size; ++i) {
      if (reverse) {
        const node = dq.pop();
        result[result.length - 1].push(node.val);
        if (node.right) {
          dq.unshift(node.right);
        }
        if (node.left) {
          dq.unshift(node.left);
        }
      } else {
        const node = dq.shift();
        result[result.length - 1].push(node.val);
        if (node.left) {
          dq.push(node.left);
        }
        if (node.right) {
          dq.push(node.right);
        }
      }
    }
    reverse = !reverse;
  }

  return result;
};
