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
var verticalTraversal = function (root) {
  const queue = [[root, 0, 0]];
  const result = [];
  const map = {};

  let min = 0;
  let max = 0;

  while (queue.length > 0) {
    const [node, col, depth] = queue.shift();

    map[col] = map[col] ?? [];
    map[col].push([node, col, depth]);

    min = Math.min(min, col);
    max = Math.max(max, col);

    if (node.left) {
      queue.push([node.left, col - 1, depth + 1]);
    }

    if (node.right) {
      queue.push([node.right, col + 1, depth + 1]);
    }
  }

  for (let col = min; col <= max; ++col) {
    map[col].sort(([nodeA, , depthA], [nodeB, , depthB]) =>
      depthA === depthB ? nodeA.val - nodeB.val : depthA - depthB
    );
    result.push(map[col].map(([node]) => node.val));
  }

  return result;
};
