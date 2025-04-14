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
var maxDepth = function (root) {
  const maxDepthRec = (node) => {
    if (node === null) return 0;
    return 1 + Math.max(maxDepthRec(node.left), maxDepthRec(node.right));
  };
  return maxDepthRec(root);
};

/*
REACTO

Repeat
given: root of binary tree
return: number indicating maximum depth (longest part from root to leaf)

Example

Approach
what if we use DFS
let curr = root
let stack = []
while (curr || stack)
    if (curr) {

    } 
    else {

    }
if tree is
            5
        4       6
    3     4.5 5.5   7
inorder is 3 4 4.5 5 5.5 6 7
cur 5
stack push [5]
cur = cur.left (4)
stack push cur [5,4]
cur = cur.left (3)
stack push cur [5,4,3]
cur is null, so pop
cur = stack.pop() (3)
print(3) ---> 3
cur = cur.right;
(next the while loop will push cur to the stack, and proceed to cur.left, thus processing the left subtree of the right child)

*/
