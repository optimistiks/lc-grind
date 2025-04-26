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
 * @return {boolean}
 */
var isValidBST = function (root) {
  const isValidBSTHelper = (node) => {
    if (node === null) return { isValid: true, min: Infinity, max: -Infinity };

    const left = isValidBSTHelper(node.left);
    const right = isValidBSTHelper(node.right);

    // node.val should be greater than max value from left subtree
    // node.val should be less than min value from right subtree

    const isValid =
      left.isValid &&
      right.isValid &&
      node.val > left.max &&
      node.val < right.min;

    return {
      isValid,
      min: Math.min(left.min, right.min, node.val),
      max: Math.max(left.max, right.max, node.val),
    };
  };

  return isValidBSTHelper(root).isValid;
};

/*
[5,1,6,null,null,3,7]

                            5
            1                           6
                                3               7


                            5
                                            6
                                                        7
                                                                    8
                                                                3

max from left subtree should be less than node
min from right subtree should be greater than node

node === null return [true, INF, -INF] (isValid, min, max)
node === 3 
    both subtrees are valid, this node is valid
    return [true, 3, 3]
node === 8
    left subtree [true, 3, 3]
    right subtree [true, INF, -INF]
    8 is greater than left left max
    8 is less than right min
    return [true, 3, 8]
                                            

                    
recursion on 5
    recursion on 6
        recursion on 3
        (3 must be less than 6 because 6 its parent)
        (but 3 must be greater than )
*/
