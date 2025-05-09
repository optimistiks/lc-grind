/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permute = function (nums) {
  function backtrack(i) {
    if (i === nums.length) {
      return [[]];
    }

    const perms = backtrack(i + 1);
    const newPerms = [];
    const val = nums[i];

    for (const perm of perms) {
      for (let j = 0; j <= perm.length; ++j) {
        newPerms.push(perm.toSpliced(j, 0, val));
      }
    }

    return newPerms;
  }

  return backtrack(0);
};

/*
REACTO

Repeat
nums integer[]
return permutations integer[][] in any order

Example
[1,2,3]
[] [3] [2,3] [3,2] [1,2,3] [2,1,3] [2,3,1] [1,3,2] [3,1,2] [3,2,1]

Approach

rec
    const perm = rec(i=1) // collect all permutations of the subarray
                    const perm = rec(i=2)
                                    const perms = rec(i=3)
                                                    i out of bounds, return [[]] 
                                    // perms === [[]]
                                    for each perm in perms
                                        for i=0 to i=perm.len
                                            create a new perm with num inserted at i

rec(i=0)
*/
