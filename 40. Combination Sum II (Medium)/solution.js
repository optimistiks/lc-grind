/**
 * @param {number[]} candidates
 * @param {number} target
 * @return {number[][]}
 */
var combinationSum2 = function (candidates, target) {
  const results = [];

  candidates.sort((a, b) => a - b);

  function backtrack(i, combo, sum) {
    if (sum > target) {
      return;
    }

    if (sum === target) {
      results.push([...combo]);
      return;
    }

    if (i === candidates.length) {
      return;
    }

    const val = candidates[i];

    combo.push(val);
    backtrack(i + 1, combo, sum + val);

    // when we exclude, we exclude all repeated numbers
    // so usage of the same number but in different positions
    // is covered in the include branch
    combo.pop();
    while (candidates[i] === val) {
      i += 1;
    }
    backtrack(i, combo, sum);
  }

  backtrack(0, [], 0);

  return results;
};

/*
REACTO

Repeat
given candidates (numbers array)
    and target (number)
output all distinct combinations of candidates that sum up to target
one candidate only can be used once

Example
[2,5,2,1,2] target=5
[[1,2,2],[5]]

Approach
i=0
include [i=0]
    i=1
    include [i=0,i=1]
    exclude [i=0]
exclude []
    i=1
    include [i=1]
    exclude []

[10,1,2,7,6,1,5]
i=3
include [..., i=7]

[2,5,2,1,2]
sorted
[1,2,2,2,5]
i=0
incl [i=0]
    i=1
    incl [i=0,i=1]
        i=2
        incl [i=0,i=1,i=2]
        excl [i0,i=1]
    excl [i=0]
    excl all repeated
excl []
*/
