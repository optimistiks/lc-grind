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
var maxPathSum = function (root) {
  let max = -Infinity;

  const maxPathSumRec = (node) => {
    if (node === null) return 0;

    const leftSum = maxPathSumRec(node.left);
    const rightSum = maxPathSumRec(node.right);

    const sumBothBranches = leftSum + rightSum + node.val;
    const sumSingleBranch = Math.max(leftSum, rightSum) + node.val;
    const sumJustRoot = node.val;

    max = Math.max(max, sumBothBranches, sumSingleBranch, sumJustRoot);

    return Math.max(sumSingleBranch, sumJustRoot);
  };

  maxPathSumRec(root);

  return max;
};

/*
REACTO

Repeat
given
    root of a binary tree
return
    a number
        a maximum path sum of all paths
            a path is a sequence of connected nodes without loops
            doesnt need to pass through the root

Example
                        -10
                    9           20
                            15      7
max sum path is 15-20-7

Approach
so for each node we have max sum path of the left and right subtree
we can either sum them by including the root
or we can pass a largest one up

so if we are at node null, sum is 0
if we are at leaf node with val X with no children:

const leftSum = recurse(node.left) (0)
const rightSum = recurse(node.right) (0)

const includingRoot = leftSum + rightSum + X
const excludingRoot = max(leftSum, rightSum) + X

return max(leftSum, rightSum) + X

if we are at node with some children

const leftSum = recurse(node.left) (will be max sum of one of the branches + node.left)


*/
