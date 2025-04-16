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
var isBalanced = function (root) {
  const isBalancedRec = (node) => {
    if (node === null) return [true, 0];

    const [isLeftBalanced, leftDepth] = isBalancedRec(node.left);
    const [isRightBalanced, rightDepth] = isBalancedRec(node.right);

    const currentNodeDepth = Math.max(leftDepth, rightDepth) + 1;

    if (!isLeftBalanced || !isRightBalanced) {
      return [false, currentNodeDepth];
    }

    return [Math.abs(leftDepth - rightDepth) < 2, currentNodeDepth];
  };

  const [isBalanced] = isBalancedRec(root);

  return isBalanced;
};

/*
REACTO

Repeat
given root of a binary tree
return boolean, true if tree is height-balanced, false otherwise
height-balanced: every node left and right subtree height difference is less than 2

Example

Approach
given a node
get it's left subtree depth
get it's right subtree depth

DFS
leaf node (left=null, right=null)
left depth = 0 (base case null)
right depth = 0 (base case null)
compare
return maxDepth(l, r) + 1

a node with 2 children
left depth 1
right depth 1



*/
