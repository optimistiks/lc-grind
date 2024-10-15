/**
 * @param {number[][]} costs
 * @return {number}
 */
var twoCitySchedCost = function (costs) {
  // create an array of cost differences and sort it ascending
  const diffs = costs.map(([costA, costB]) => costA - costB);
  diffs.sort((a, b) => a - b);

  // get a sum of all costs to city A (like we sent all people to city A)
  let sumA = costs.reduce((sum, [costA]) => sum + costA, 0);

  // since we are actually sending the second half of people (by diffs) to city B
  // subtract their differences (think refunds) from the sumA
  for (let i = diffs.length / 2; i < diffs.length; ++i) {
    sumA -= diffs[i];
  }

  return sumA;
};
