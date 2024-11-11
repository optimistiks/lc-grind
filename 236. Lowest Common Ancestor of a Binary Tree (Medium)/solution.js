/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */
/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  // if node is one of the nodes
  // we set "mid"
  // but returned value is either left or right
  // so 3 variables, left mid right

  let result = null;

  function lowestCommonAncestorRec(node) {
    if (node === null) {
      return false;
    }

    // common ancestor: mid AND left, mid AND right, left AND right

    // mid - if this node is one of the nodes we're looking for
    const mid = node.val === p.val || node.val === q.val;

    // left - if node we're looking for is somewhere the left subtree
    const left = lowestCommonAncestorRec(node.left);

    // right - if node we're looking for is somewhere in the right subtree
    const right = lowestCommonAncestorRec(node.right);

    // found - whether or not any condition is fulfilled that makes current node the result
    const found = (mid && left) || (mid && right) || (left && right);

    if (found && !result) {
      result = node;
    }

    return left || right || mid;
  }

  lowestCommonAncestorRec(root, p, q);

  return result;
};
