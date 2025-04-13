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
 * @return {TreeNode}
 */
var invertTree = function (root) {
  if (root === null) return null;

  const temp = root.left;
  root.left = root.right;
  root.right = temp;

  invertTree(root.left);
  invertTree(root.right);

  return root;
};

/*
REACTO

Repeat
given binary tree
return root of inverted tree

Approach
how do you invert a single node tree?
(1)
do nothing

a 3 node tree
                  (1)
                (2) (3)
swap (1).left and (1).right

a 5 node tree

1
    2
        4
        5
    3
        6
        7

swap for 2, swap for 3, then swap for 1

so recurse until you find a a leaf node
"swap it" (do nothing), then return back up and continue swapping


swap(node)
    if node == null return null

    const temp = node.left;
    node.left = node.right;
    node.right = node.left;

    swap(node.left)

    swap(node.left)
    swap(node.right)


*/
