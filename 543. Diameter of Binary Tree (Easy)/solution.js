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
var diameterOfBinaryTree = function (root) {
  let result = 0;

  const diameterRec = (node) => {
    // null node - length 0 (no edges)
    if (!node) return 0;
    // leaf node with no children - length 1 (incoming edge from parent)
    if (!node.left && !node.right) return 1;

    const leftLen = diameterRec(node.left);
    const rightLen = diameterRec(node.right);

    // update result by summing together two lengths
    // for a node with two leaf children it will be 2 (1 + 1)
    // because height of a left or right subtree includes the edge coming from parent
    result = Math.max(result, leftLen + rightLen);

    // for a path coming from a parent node, only largest of current paths makes sense
    // add +1 for an incoming edge from parent
    return Math.max(leftLen, rightLen) + 1;
  };

  diameterRec(root);

  return result;
};

/*
what about height of the left and right subtree
and sum it up

node null
length L 0 
length R 0
length 0

node leaf
length L 0
length R 0
length 0

node non-leaf (children leaves)
length L = 0
length R = 0
length = L + R + 1

node non-leaf (children non-leaves)
length L = X
length R = Y
length = 
*/
