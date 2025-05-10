/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsetsWithDup = function (nums) {
  nums.sort((a, b) => a - b);

  const result = [];

  const backtrack = (i, subset) => {
    if (i === nums.length) {
      result.push([...subset]);
      return;
    }

    const val = nums[i];

    subset.push(val);
    backtrack(i + 1, subset);

    subset.pop();
    while (nums[i] === val) {
      i += 1;
    }
    backtrack(i, subset);
  };

  backtrack(0, []);

  return result;
};

/*
REACTO

Repeat
input: nums integer[] (may contain duplicates)
ouput: integer[][] that contains all possible distinct subsets

Example
[1,2,2]
[] [1] [2] [1,2] [1,2,2] [2,2]

Approach
i=0
consider [i=0]
rec(i=1)
    consider [i=0, i=1]
    rec(i=2)
        consider [i=0,i=1,i=2]
        rec(i=3)
        no-consider [i=0,i=1]
        rec(i=3)
    no-consider [i=0]
    rec(i=2)
        consider [i=0,i=2]

no-consider []
rec(i=1)



*/
