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
 * @param {number[]} queries
 * @return {number[]}
 */
var treeQueries = function (root, queries) {
  const heights = {};
  const depths = {};

  const dfs = (node, depth) => {
    if (!node) {
      // for leaf nodes we do dfs(left) and dfs(right) despite the fact that they don't have left and right
      // so we can do Math.max(-1, -1) + 1 = 0 on the leaf node parent
      return -1;
    }
    // depth is just a level, 0 is top, height of the tree - 1 at the bottom
    depths[node.val] = depth;
    // height is like depth but bottom-up, leaf node is 0, root node is height - 1
    const height =
      Math.max(dfs(node.left, depth + 1), dfs(node.right, depth + 1)) + 1;
    heights[node.val] = height;
    // if we at some node, and we know it's depth and height, we can know the height of the whole tree by just looking at this node
    return height;
  };

  // run dfs on the tree, populating heights and depths, storing height and depth for each node
  dfs(root, 0);

  // group nodes by depth, node is a tuple [height, val]
  const depthGroups = {};
  for (const [data, depth] of Object.entries(depths)) {
    depthGroups[depth] = depthGroups[depth] ?? [];
    depthGroups[depth].push([heights[data], parseInt(data)]);
  }

  // sort depth groups by height descending
  Object.keys(depthGroups).forEach((depth) => {
    depthGroups[depth].sort(([heightA], [heightB]) => heightB - heightA);
  });

  // the idea here is using the fact that the tree is reverted back to it's original state after each query
  // so the only thing we care about is the two highest nodes at each depth
  // because there can be only two cases
  // the node we are removing is the highest on it's depth (1)
  // the node we are removing is not the highest on it's depth (2)
  // (1): the depth of the tree would then be equal to height of the second highest + depth of the second highest
  // (2): the depth of the tree would then be equal to height of the highest + depth of the highest
  // if the tree didn't revert, we would have to update our two highest nodes at each depth

  const result = [];

  for (const q of queries) {
    const depth = depths[q];
    if (depthGroups[depth].length === 1) {
      result.push(depth - 1);
    } else if (depthGroups[depth][0][1] === q) {
      result.push(depthGroups[depth][1][0] + depth);
    } else {
      result.push(depthGroups[depth][0][0] + depth);
    }
  }

  return result;
};
