/**
 * @param {string[][]} equations
 * @param {number[]} values
 * @param {string[][]} queries
 * @return {number[]}
 */
var calcEquation = function (equations, values, queries) {
  // keys are variables
  // values are tuples: [parent variable, weight of the connection]
  const parents = {};

  const find = (x) => {
    // path compression should update weights by multiplying
    /*
            find(a)
                parents[a][0] is not a (its b,2)
                call find(parents[a][0]) same as find(b)
                find(b)
                   parents[b][0] is not b (its c,3) 
                   call find(parents[b][0]) same as find(c)
                   find(c)
                        parents[c][0] is c,1
                        return c,1
                    we got c,1 and we have c,3
                    update weight by 3*1 = 3
                we got c,3 and we have b,2
                replace b,2 with c,6
        */
    if (parents[x][0] !== x) {
      const [parent, weight] = find(parents[x][0]);
      parents[x] = [parent, parents[x][1] * weight];
    }
    return parents[x];
  };

  const union = (x, y, weight) => {
    const [xParent, xWeight] = find(x);
    const [yParent, yWeight] = find(y);
    if (xParent === yParent) {
      return;
    }
    parents[xParent] = [yParent, (weight * yWeight) / xWeight];
  };

  equations.forEach((eq) => {
    eq.forEach((x) => {
      if (!parents[x]) {
        parents[x] = [x, 1];
      }
    });
  });

  equations.forEach((eq, idx) => {
    const [x, y] = eq;
    const weight = values[idx];
    union(x, y, weight);
  });

  return queries.map(([x, y]) => {
    if (!parents[x] || !parents[y]) {
      return -1;
    }
    const [xParent, xWeight] = find(x);
    const [yParent, yWeight] = find(y);
    if (xParent !== yParent) {
      // x and y are in different connected components
      // it means it is not possible to determine x/y value with our given equations
      return -1;
    }
    return xWeight / yWeight;
  });
};
