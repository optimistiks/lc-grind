/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} nums
 * @return {TreeNode}
 */
var sortedArrayToBST = function (nums) {
  return helper(nums, 0, nums.length - 1);
};

function helper(nums, left, right) {
  if (left > right) {
    return null;
  }
  // index of the mid element
  var p = Math.floor((left + right) / 2);
  // make this mid element some subtree root node
  var root = new TreeNode(nums[p], null, null);
  // repeat the same for each of the two halves of the array
  root.left = helper(nums, left, p - 1);
  root.right = helper(nums, p + 1, right);
  return root;
}
