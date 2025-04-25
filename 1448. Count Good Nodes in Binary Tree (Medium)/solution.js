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
var goodNodes = function (root) {
  let count = 0;

  const recHelper = (node, max) => {
    if (node === null) return;

    if (node.val >= max) {
      count += 1;
    }

    recHelper(node.left, Math.max(max, node.val));
    recHelper(node.right, Math.max(max, node.val));
  };

  recHelper(root, Number.NEGATIVE_INFINITY);

  return count;
};

/*
REACTO

Repeat
input:
    root of a binary tree
output:
    a number
        the number of good nodes in the tree
            a good node X is a node
            where on the path from tree root to X
            there are no nodes greater than X

Example
root(3) - child(1) - child_child(3)
root(3) is a good node because a path to itself
child(1) is NOT a good node, because in the path (3) - (1) there is a node (3) > (1)
child_child(3) is a good node, because on the path (3) - (1) - (3) there are no nodes greater than 3

Approach
maybe dfs?

when we are at node X
we want to know the max node along the path we've already covered
if X >= MAX, X is a good node
continue further with updated max


*/
