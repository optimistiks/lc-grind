/**
 * // Definition for a _Node.
 * function _Node(val, neighbors) {
 *    this.val = val === undefined ? 0 : val;
 *    this.neighbors = neighbors === undefined ? [] : neighbors;
 * };
 */

/**
 * @param {_Node} node
 * @return {_Node}
 */
var cloneGraph = function (node) {
  const map = new Map();

  const clone = (node) => {
    if (map.has(node)) return map.get(node);

    const newNode = new _Node(node.val);
    map.set(node, newNode);

    newNode.neighbors = node.neighbors.map((neighbor) => clone(neighbor));

    return newNode;
  };

  if (node === null) {
    return null;
  }

  return clone(node);
};

/*
REACTO

Repeat
given
a node in a connected undirected graph
return
a deep copy of the graph
each node contains a value and a list of neighbor nodes

Example

Approach

start at a node
create a new node with the same value
now add all neighbors to the queue
    neighbor one
    create a new node
*/
