/**
 * @param {number[][]} isConnected
 * @return {number}
 */
var findCircleNum = function (isCityConnected) {
  // so we have all nodes in an array [1,2,3,4,5]
  // there is also union rank and path compression
  // every item is a node that is a parent of itself (so, disconnected)
  // then we start iterating the grid
  // and for every connected A and B, we call union(A, B)
  // so what union does it calls find(A) and find(B) that returns parents
  // then it puts parent with less rank under parent with most rank
  // what find does it finds recursively until we find a parent of itself
  // find does path compression, so when we find C that is a parent of A (possibly through B)
  // we force set A as direct parent of C

  // parents[i] = x, where x is a parent of node i
  const parents = Array.from({ length: isCityConnected.length }, (_, i) => i);
  const ranks = Array.from({ length: isCityConnected.length }, () => 0);

  // find top level parent of node
  const find = (node) => {
    if (parents[node] !== node) {
      parents[node] = find(parents[node]);
    }
    return parents[node];
  };

  const union = (a, b) => {
    const parentA = find(a);
    const parentB = find(b);
    if (parentA === parentB) {
      return;
    }
    const rankA = ranks[parentA];
    const rankB = ranks[parentB];
    if (rankA >= rankB) {
      parents[parentB] = parentA;
      ranks[parentA] += 1;
    } else {
      parents[parentA] = parentB;
      ranks[parentB] += 1;
    }
  };

  for (let i = 0; i < isCityConnected.length; ++i) {
    for (let j = 0; j < isCityConnected.length; ++j) {
      if (isCityConnected[i][j]) {
        union(i, j);
      }
    }
  }

  const uniqueParents = parents.reduce(
    (acc, parent) => acc.add(find(parent)),
    new Set()
  );

  return uniqueParents.size;
};
