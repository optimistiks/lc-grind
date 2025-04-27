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
 * @param {number} k
 * @return {number}
 */
var kthSmallest = function (root, k) {
  // maintain a max queue of length k
  // to keep k minimums in there
  const queue = new MaxPriorityQueue();

  const dfs = (node) => {
    if (node === null) return;

    if (queue.size() !== k) {
      // fill up the queue until size k
      queue.enqueue(node.val);
    } else if (node.val < queue.front()) {
      // if current value is smaller than the max in the queue
      // it means the max in the queue is definitely does not belong to the group of k smallest elements
      // so replace it with the current node value
      queue.dequeue();
      queue.enqueue(node.val);
    }

    dfs(node.left);
    dfs(node.right);
  };

  dfs(root);

  // the back of the queue is the min element, the front is the kth min
  return queue.front();
};

/*
REACTO

Repeat
given:
    root of a BST, integer k
output:
    a BST node value which is a kth smallest value (1 indexed) in the whole tree

Example
    2
1       3
1st smallest node is 1
3rd smallest is 3

Approach
so we could just do inorder traversal?
and get the kth element?
in O(n)?
OR we could use a heap somehow

if heap len is k
then  heap can be k max elements
or k min elements
since we need kth smallest, we need k min elements?
how do we do that?
lets say we have heap [x]
another element Y
[x,y]
[x,y,z]

new element comes - but heap is full
x is max element, then y, then z
if new element t is larger than x, should we even add it?
what if it's smaller than x?
replace x with t
[t,y,z]

add 5, add 3, add 6
[6,5,3]
add 2
pop 6, add 2
[5,3,2]
add 4
pop 5, add 4
[4,3,2]
pop 4, add 1
[3,2,1]







*/
