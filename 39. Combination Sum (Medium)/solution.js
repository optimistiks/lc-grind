/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum = function (candidates, target) {
  const result = [];

  function backtrack(i, combo, sum) {
    if (sum > target) return;

    if (sum === target) {
      result.push([...combo]);
      return;
    }

    if (i === candidates.length) return;

    const val = candidates[i];

    combo.push(val);
    backtrack(i, combo, sum + val);

    combo.pop();
    backtrack(i + 1, combo, sum);
  }

  backtrack(0, [], 0);

  return result;
};

/*
REACTO

Repeat
given
    an array of distinct integers - candidates
    an integer - target
output an array of arrays of numbers
    where each array is a unique combination of numbers from candidates that sums to target
    unique means frequency of at least one choice is different
    for example: [2,2,1,1] and [2,2,2] are unique because of frequency of 2

Example
[2,3,6,7] target=7
[7] [3,2,2]

Approach
recurse(i=0, [], 0)
    if sum > target return
    if sum === target add combo
    recurse(i, [...combo, nums[i]], sum + nums[i])
    // here we recursed on the same element multiple times (X times)
    // so recurse on i+1
    // we added current element to sum, and moved to the next one
    // so X+1 frequency of the current element
    // here we recursed on i+1 with X and Y frequencies of preceding elements
    recurse(i+1, combo, sum)
    // stop including 

*/
