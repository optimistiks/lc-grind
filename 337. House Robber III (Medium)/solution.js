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
 * @return {number}
 */
var rob = function (root) {
  const result = robRec(root);
  return Math.max(...result);
};

// [includingRoot, excludingRoot]
function robRec(node) {
  if (!node.left && !node.right) {
    // if no children, then
    // how much can be robbed including root? the root value
    // how much can be robbed excluding root? 0, because there are no nodes except root
    return [node.val, 0];
  }
  // there is a left node, so let's see how much can be robbed in a subtree where left node is a root
  const [includingRootLeft, excludingRootLeft] = node.left
    ? robRec(node.left)
    : [0, 0];
  // there is a right node, how much can be robbed in a subtree where right node is a root
  const [includingRootRight, excludingRootRight] = node.right
    ? robRec(node.right)
    : [0, 0];

  // now calculate how much can be robbed using current node as root, excluding it and including it
  return [
    // including root, should use excluding from child trees
    node.val + excludingRootLeft + excludingRootRight,
    // excluding root, should take whatever is max from child trees
    Math.max(includingRootLeft, excludingRootLeft) +
      Math.max(includingRootRight, excludingRootRight),
  ];
}
