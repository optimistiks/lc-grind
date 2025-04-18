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
 * @param {TreeNode} subRoot
 * @return {boolean}
 */
var isSubtree = function (root, subRoot) {
  const isSameRec = (nodeA, nodeB) => {
    if (nodeA === null && nodeB === null) return true;
    if (nodeA === null || nodeB === null) return false;
    if (nodeA.val !== nodeB.val) return false;
    return (
      isSameRec(nodeA.left, nodeB.left) && isSameRec(nodeA.right, nodeB.right)
    );
  };

  const dfs = (node) => {
    if (node === null) return false;
    if (isSameRec(node, subRoot)) return true;
    return dfs(node.left) || dfs(node.right);
  };

  return dfs(root);
};

/*
REACTO
Repeat
given two roots, root and subRoot
return true if there is a subtree in root same is subRoot

Approach
similar to same tree problem
compare structure level by level
or maybe dfs
but now
start at root
if not, start at children

same tree recursive dfs?
same(node1, node2)
    both are null: return true
    just one is null: return false
    value mismatch: return false
    return 


*/
