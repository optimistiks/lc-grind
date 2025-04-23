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
 * @return {number[][]}
 */
var levelOrder = function (root) {
  if (root === null) return [];

  const queue = new Queue([[root]]);
  const result = [];

  while (queue.size() > 0) {
    const level = queue.dequeue();
    result.push(level.map((node) => node.val));

    const children = level
      .flatMap((node) => [node.left, node.right])
      .filter((node) => node !== null);
    if (children.length > 0) {
      queue.enqueue(children);
    }
  }

  return result;
};

/*
REACTO

Repeat
input
    root - root node of a binary tree
return
    an array of arrays of numbers
    where each array is a traversal of the tree level from left to right

Example

                        1
                2               3
            4       5       6       7
output [[1], [2,3], [4,5,6,7]]

Approach
BFS
queue
init queue [root]
while queue is not empty
    remember queue length
    dequeue queue length elements
        while dequeuing, enqueue their children 
*/
