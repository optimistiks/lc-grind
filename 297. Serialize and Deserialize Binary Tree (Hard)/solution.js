/**
 * Definition for a binary tree node.
 * function TreeNode(val) {
 *     this.val = val;
 *     this.left = this.right = null;
 * }
 */

/**
 * Encodes a tree to a single string.
 *
 * @param {TreeNode} root
 * @return {string}
 */
var serialize = function (root) {
  /* preorder traversal with placeholders for null */
  /*
    for example
                    1
            2               3
        4       5       6       7
    
    124nn5nn36nn7nn

    node 1
        left child node 2
            left child node 4
                left child null
                right child null
            right child node 5
                left child null
                right child null
        right child 3
            left child 6

    inorder
    n4n2n5n1n6n3n7n
    
    */
  /* iterative inorder (left-root-right) */
  /*
    const stack = [];
    let cur = root;
    while (cur !== null || stack.length > 0) {
        if (cur !== null) {
            stack.push(cur);
            cur = cur.left;
        } else {
            const node = stack.pop();
            console.log('node val', node.val);
            cur = node.right;
        }
    }
    */

  /* iterative preorder (root-left-right) */
  /*
    const stack = [];
    let cur = root;
    while (cur !== null || stack.length > 0) {
        if (cur !== null) {
            console.log('node val', cur?.val);
            stack.push(cur.right);
            cur = cur.left;
        } else {
            cur = stack.pop();
        }
    }
    */

  /* iterative postorder (left-right-root) */
  /*
    if (!root) return;
    const stack = [root];
    const visited = [false];

    while (stack.length > 0) {
        const node = stack.pop();
        const isVisited = visited.pop();

        if (isVisited) {
            console.log('node val', node.val);
        } else {
            stack.push(node);
            visited.push(true);

            if (node.right) {
                stack.push(node.right);
                visited.push(false);
            }

            if (node.left) {
                stack.push(node.left);
                visited.push(false);
            }
        }
    }
    */

  // call callback for null children as well
  const preorder = (root, cb) => {
    const stack = [];
    let cur = root;

    while (cur !== null || stack.length > 0) {
      if (cur !== null) {
        cb(cur);

        stack.push(cur.right);
        cur = cur.left;

        if (cur === null) {
          cb(cur);
        }
      } else {
        cur = stack.pop();

        if (cur === null) {
          cb(cur);
        }
      }
    }
  };

  const result = [];

  preorder(root, (node) => {
    if (node !== null) {
      result.push(`${node.val}`);
    } else {
      result.push("-");
    }
  });

  if (result.length === 0) {
    return "";
  }

  return result.join("^");

  /*
    ^1^2^_^9^_^_^3^4^_^_^5^_^_

    ptr at ^1 (new node (1), current = (1), stack [(1)])
    ptr at ^2 (new node (2), (1).left = (2), current = (2), stack [(1), (2)])
    ptr at ^_ (null, (2).left = null, current = null, stack[(1), (2)])
    ptr at ^9 (new node (9), current is null so pop, current = (2), (2).right = (9), [(1), (9)], current = (9))
    ptr at ^_ (null, (9).left = null, current = null, stack [(1), (9)])
    ptr at ^_ (null, current is null so pop, (9).right = null, stack [(1)])
    ptr at ^3 (new node (3), current is null so pop, current = (1), (1).right = (3))



    */

  return "";
};

/**
 * Decodes your encoded data to tree.
 *
 * @param {string} data
 * @return {TreeNode}
 */
var deserialize = function (data) {
  if (data === "") return null;

  const result = data.split("^");

  let ptr = 0;

  const stack = [];
  const dummy = new TreeNode(null);
  let current = dummy;

  while (current || stack.length > 0) {
    const val = result[ptr] === "-" ? null : parseInt(result[ptr]);
    const newNode = val === null ? null : new TreeNode(val);

    if (current) {
      current.left = newNode;
      if (current.left) stack.push(current.left);

      current = current.left;
    } else {
      current = stack.pop();

      current.right = newNode;
      if (current.right) stack.push(current.right);

      current = current.right;
    }

    ptr += 1;
  }

  return dummy.left;
};

/**
 * Your functions will be called as such:
 * deserialize(serialize(root));
 */
