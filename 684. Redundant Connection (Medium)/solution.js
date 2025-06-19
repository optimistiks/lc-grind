/**
 * @param {number[][]} edges
 * @return {number[]}
 */
var findRedundantConnection = function (edges) {
  const adjList = new Map();

  edges.forEach(([a, b]) => {
    if (!adjList.has(a)) adjList.set(a, new Set());
    if (!adjList.has(b)) adjList.set(b, new Set());

    adjList.get(a).add(b);
    adjList.get(b).add(a);
  });

  const visited = new Set();
  const parents = new Map();

  let cycleStart = null;

  const dfs = (node) => {
    visited.add(node);
    for (const neighbor of adjList.get(node)) {
      if (neighbor === parents.get(node)) continue;

      parents.set(neighbor, node);

      if (visited.has(neighbor)) {
        if (cycleStart === null) cycleStart = neighbor;
        break;
      }

      dfs(neighbor);
    }
  };

  dfs(1);

  const cycleNodes = new Set([cycleStart]);
  let node = parents.get(cycleStart);
  while (node !== cycleStart) {
    cycleNodes.add(node);
    node = parents.get(node);
  }

  for (let i = edges.length - 1; i >= 0; --i) {
    const edge = edges[i];
    if (cycleNodes.has(edge[0]) && cycleNodes.has(edge[1])) {
      return edge;
    }
  }

  return [];
};

/*
REACTO

Repeat
a tree is an undirected connected graph with no cycles 
given edges of length n, edges is [a, b][] where [a, b] is an edge between a and b
return an edge that can be removed to make the graph a tree

Example

Approach
run dfs, mark visited, first edge that leads us to an already visited node is the edge that can be removed

1)
create adj list, each node is recorded twice
2)
create an array of size n for visited
3)
start dfs from node 0
mark node as visited
find it's neighbors
for each neighbor, start dfs
(from a neighbor, we can loop back to parent node - how to prevent that?)
maybe pass a parent node?

*/
