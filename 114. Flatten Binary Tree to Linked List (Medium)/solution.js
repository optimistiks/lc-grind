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
 * @return {void} Do not return anything, modify root in-place instead.
 */
var flatten = function (root) {
  // start at root node
  let current = root;

  // end loop when we arrive at null
  // current only shifts to the right (current always becomes current.right, never current.eft)
  while (current) {
    // find right most in the left subtree
    let next = current.left;
    // move right from the left node if there is a left node
    while (next && next.right) {
      next = next.right;
    }

    // if there is a rightmost node in the left subtree,
    // move right subtree of the current node to the right of the rightmost node
    // move left subtree of the current node to the right of the current node
    // nullify left child of the current node
    if (next) {
      next.right = current.right;
      current.right = current.left;
      current.left = null;
    }

    // shift to the next right node
    current = current.right;
  }

  return root;
};
