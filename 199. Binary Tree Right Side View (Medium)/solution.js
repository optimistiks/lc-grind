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
 * @return {number[]}
 */
var rightSideView = function (root) {
  const rightSide = [];

  const recHelper = (node, level) => {
    // because we are going right side first
    // we will always visit the rightmost element of a level first
    // which means
    // when level === rightSide length
    // the rightmost node is the current node
    // for example, when level === 0 and rightSide === 0,
    //      we are at root, so it's the rightmost node of the level 0
    //      then we recurse on root right
    //      with level === 1, and rightSide is 1
    //      so we add root.right as rightmost node of level 1
    //      when we visit root.left, level === 1, but rightSide.length === 2
    //      so we ignore that node

    if (node === null) {
      return;
    }

    if (level === rightSide.length) {
      rightSide.push(node.val);
    }

    if (node.right) recHelper(node.right, level + 1);
    if (node.left) recHelper(node.left, level + 1);
  };

  recHelper(root, 0);

  return rightSide;

  /* level order traversal (recursive) */
  /*
    const levelOrderTraversal = [];

    const recHelper = (node, level) => {
        if (node === null) {
            return;
        }

        if (!levelOrderTraversal[level]) levelOrderTraversal.push([]);

        levelOrderTraversal[level].push(node.val);

        recHelper(node.left, level + 1);
        recHelper(node.right, level + 1);
    }

    recHelper(root, 0)

    const result = levelOrderTraversal.map(level => level[level.length - 1]);

    return result;
    */
};

/*
REACTO

Repeat
input:
    root of a binary tree
output:
    an array of node values that represent a right side view,
    ordered from top to bottom

Approach
what about level by level BFS?
we can just take the rightmost child of every level?

*/
