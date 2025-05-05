/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var subsets = function (nums) {
  const result = [];

  function backtrack(i, subset) {
    if (i === nums.length) {
      result.push([...subset]);
      return;
    }

    const val = nums[i];

    // continue building with val included
    subset.push(val);
    backtrack(i + 1, subset);

    // backtrack and continue building with val excluded
    subset.pop();
    backtrack(i + 1, subset);
  }

  backtrack(0, []);

  return result;
};

/*
Time complexity: total number of subsets fron an array of size n is 2^n
(because for each element we make two decisions: include or not include)
a subset size is bounded by n, so building one subset can take n time,
so 
n * 2^n

Space complexity: for the current subset array is O(n)
*/

/*
REACTO

Repeat
given 
    integer array of unique numbers
output
    an array of array of nums
    all possible distinct subsets of input

Example
[1,2,3]
[] [1] [2] [3] [1,2] [1,3] [2,3] [1,2,3]

Approach
recursion
    i=0
    include:
    rec([1])
        i=1
        include:
        rec([1,2])
            i=2
            include:
            rec([1,2,3])
                i=3 - out of bounds 
                add 
            not include:
            rec([1,2])
                i=3 - out of bounds
                add
        not include:
        rec([1])
            i=2
            include
            rec([1,3])
                i=3 - out of bounds
                add
            not include
            rec([1])
                i=3 - out of bounds
                add
    not include:
    rec([])
        i=1

*/
