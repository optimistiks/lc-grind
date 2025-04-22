/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * @param {TreeNode} root
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {TreeNode}
 */
var lowestCommonAncestor = function (root, p, q) {
  /* recursive solution utilizing BST property */
  /* when both p and q are greater than the node -> search right */
  /* when both p and q are smaller than the node -> search left */
  /* 
    when both of those conditions are false 
    it means we are either at split node (p is on one side, q is on the other side)
    or we at node that is either p or q, and the other one is on either side
    in both cases the node we are currently at is the lca
    */
  if (p.val < root.val && q.val < root.val) {
    return lowestCommonAncestor(root.left, p, q);
  } else if (p.val > root.val && q.val > root.val) {
    return lowestCommonAncestor(root.right, p, q);
  } else {
    return root;
  }

  /* recursive solution I came up with */
  /*
    let lca = null;

    const lcaRec = (node) => {
        if (node === null) {
            return { pFound: false, qFound: false }
        } else if (node === p) {
            const { qFound } = lcaRec(q.val < node.val ? node.left : node.right);
            if (qFound && !lca) {
                lca = node;
            }
            return { pFound: true, qFound }
        } else if (node === q) {
            const { pFound } = lcaRec(p.val < node.val ? node.left : node.right);
            if (pFound && !lca) {
                lca = node;
            }
            return { pFound, qFound: true }
        } else {
            const { qFound } = lcaRec(q.val < node.val ? node.left : node.right);
            const { pFound } = lcaRec(p.val < node.val ? node.left : node.right);
            if (qFound && pFound && !lca) {
                lca = node;
            }
            return { qFound, pFound }
        }
    }

    lcaRec(root);

    return lca;
    */
};

/*
REACTO

Repeat
given root (binary search tree), p and q (two nodes from the bst)
output a node which is a LCA of p and q
    LCA: lowest node in tree that has both p and q as descendants (a node can be a descendant of itself)

Example

Approach
find p and q?
for example, recursion
some node
    if (p < node) search p in left subtree 
    else search p in right subtree
    if (q < node) search q in left subtree
    else search q in the right subtree

    if node is q or p, and found q or p, this node is LCA


*/
