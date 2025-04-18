/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {TreeNode} p
 * @param {TreeNode} q
 * @return {boolean}
 */
var isSameTree = function (p, q) {
  const isSameRec = (nodeA, nodeB) => {
    if (nodeA === null && nodeB === null) return true;
    if (nodeA === null || nodeB === null) return false;
    if (nodeA.val !== nodeB.val) return false;
    return (
      isSameRec(nodeA.left, nodeB.left) && isSameRec(nodeA.right, nodeB.right)
    );
  };
  return isSameRec(p, q);
  /*
    const queue = new Queue();
    queue.enqueue([p, q]);

    while (queue.size() > 0) {
        const [nodeA, nodeB] = queue.dequeue();

        if (nodeA === null && nodeB === null) continue;

        if (nodeA === null || nodeB === null) return false;

        if (nodeA.val !== nodeB.val) return false;

        queue.enqueue([nodeA.left, nodeB.left]);
        queue.enqueue([nodeA.right, nodeB.right]);
    }

    return true;
    */
};

/*
REACTO

Repeat
given two tree roots
return boolean
    true if trees are identical (structurally and value-wise)
    false otherwise

approach
compare level by level
run bfs on two trees, one queue, pop two at a time
if no node, push null
bfs:
queue = [root1, root2]
while queue
    node1 = queue.dequeue()
    node2 = queue.dequeue()
    queue.enqueue(node.right)
    queue.enqueue(node.left)
    ([right, left])
*/
