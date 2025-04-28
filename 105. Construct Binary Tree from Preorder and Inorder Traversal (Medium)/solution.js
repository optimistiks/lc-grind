/**
 * Definition for a binary tree node.
 * function TreeNode(val, left, right) {
 *     this.val = (val===undefined ? 0 : val)
 *     this.left = (left===undefined ? null : left)
 *     this.right = (right===undefined ? null : right)
 * }
 */
/**
 * @param {number[]} preorder
 * @param {number[]} inorder
 * @return {TreeNode}
 */
var buildTree = function (preorder, inorder) {
  // for every val in inorder,
  // it's whole left subtree is to the left of the val
  // and it's whole right subtree is to the right of the val

  // first val in preorder is the root
  // second val is it's left child
  // third val may be either the left child left child
  // but if the left child has inorder of length zero
  // then the third val is the right child of the root

  let ptr = 0;

  const buildRec = (inorder) => {
    if (inorder.length === 0) return null;

    const val = preorder[ptr];
    const index = inorder.indexOf(val);

    const node = new TreeNode(val);
    ptr += 1;

    node.left = buildRec(inorder.slice(0, index));
    node.right = buildRec(inorder.slice(index + 1));

    return node;
  };

  return buildRec(inorder);
};

/*
preorder =
[3,9,20,15,7]
inorder =
[9,3,15,20,7]
queue [[null, 1]]
used[1] true
node = Node(3)
head = node
queue.push([node, 0, left])
queue.push([node, 2, right])
queue [[node,0,left], [node,2,right]]
used[0] true
node = Node(9)
parent.left = node
*/

/*
REACTO
given two int arrays, preorder, inorder
    two traversals of a binary tree
return the head of the reconstructed tree

Example
preorder: root first, then left right
inorder: left, root, right

just preorder is not enought, for example 3 4 5 can be
    3
4       5

or it can be
    3
null    4
    null    5

just inorder is not enough, 3 4 5 can be
    4
3       5

or it can be
    3
null    5
    4

so we can use preorder to determine root
    3
4       5
preorder: 345
inorder: 435

preorder[0] 3
3 is root
find 3 in inorder
...

        3
9               20
        15              7
preorder = [3,9,20,15,7], inorder = [9,3,15,20,7]
root 3 (preorder[0])
find 3 in inorder
children 9 and 20
node 20
find 20 in preorder
children 15 and 7
node 15
what if mark nodes as "used"
so when we are in node 15
left is 3 and right is 20

Approach
maybe queue?
init queue with index preorder and index inorder

dequeue
create node

maybe recursive?

used = map()
rec(index of preorder[0] in inorder)
    if (inorder[index] == null || used[index]) return null

    const val = inorder[index]
    node = createNode(val)
    used[index] = true

    node.left = createNode(inorderIndex - 1)
    node.right = createNode(inorderIndex + 1)

    return node;

rec(index of preorder[0] in inorder)



*/
