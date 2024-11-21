/**
 * @param {number[][]} stones
 * @return {number}
 */
var removeStones = function (stones) {
  const ranks = {};
  const parents = {};

  const find = (v) => {
    if (parents[v] == null) {
      parents[v] = v;
    }
    if (parents[v] !== v) {
      parents[v] = find(parents[v]);
    }
    return parents[v];
  };

  const union = (a, b) => {
    const aParent = find(a);
    const bParent = find(b);

    if (aParent === bParent) {
      return;
    }

    const aParentRank = ranks[aParent] ?? 0;
    const bParentRank = ranks[bParent] ?? 0;

    if (aParentRank >= bParentRank) {
      // a outranks, make a parent of b
      parents[bParent] = aParent;
      ranks[aParent] = aParentRank + 1;
      ranks[bParent] = bParentRank;
    } else {
      // b outranks, make b parent of a
      parents[aParent] = bParent;
      ranks[aParent] = aParentRank;
      ranks[bParent] = bParentRank + 1;
    }
  };

  const offset = 100000;

  for (const s of stones) {
    const x = s[0];
    const y = s[1];
    union(x, y + offset);
  }

  const groups = new Set();
  Object.keys(parents).forEach((key) => {
    groups.add(find(key));
  });

  return stones.length - groups.size;
};
