/**
 * @param {number[][]} richer
 * @param {number[]} quiet
 * @return {number[]}
 */
var loudAndRich = function (richer, quiet) {
  // we know quiet values are unique so it's safe to make a map keyed by quiet value
  const quietMap = quiet.reduce((acc, val, idx) => {
    acc[val] = idx;
    return acc;
  }, {});

  // make adjacency list representation of peoples graph
  // from top to bottom it goes from less rich to more rich
  const adjList = {};
  quiet.forEach((_, index) => {
    adjList[index] = [];
  });
  richer.forEach(([a, b]) => {
    // a is richer than b
    adjList[b].push(a);
  });

  const result = {};
  // node is a person A
  // this function looks at this persons quiet, as well as all descendant (richer) persons quiet
  // it returns a person with a lowest quiet value among all descendant person and this person A
  // so for person A the result can be (x, A) it means this person A has the lowest quiet value
  // or it can be (x, B) meaning some person B among descendants has the lowest value
  // so the result can be result[A] = A or result[A] = B
  const dfs = (node) => {
    if (result[node] != null) {
      return quiet[result[node]];
    }
    const children = adjList[node];
    if (children.length === 0) {
      result[node] = quietMap[quiet[node]];
      return quiet[node];
    }
    const intermediateResults = children.map((child) => dfs(child));
    console.log(
      "person",
      node,
      "min(",
      quiet[node],
      ...intermediateResults,
      ")"
    );
    const minQuiet = Math.min(...intermediateResults, quiet[node]);
    result[node] = quietMap[minQuiet];
    return minQuiet;
  };
  quiet.forEach((_, index) => {
    dfs(index);
  });
  // Replace this placeholder return statement with your code
  return quiet.map((_, i) => result[i]);
};
