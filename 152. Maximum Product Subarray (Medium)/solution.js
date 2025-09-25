/**
 * @param {number[]} nums
 * @return {number}
 */
var maxProduct = function (nums) {
  let max = -Infinity;

  let currMax = 1;
  let currMin = 1;

  // in normal Kadane's, curr represents max sum of a subarray up to including j,
  // it may be from 0 to j, or it may be just j if j > sum[0, j-1]
  // but here we also want min product up to including j, and max product
  // so for example -2, 3, -4
  // at -2, max product seen so far is -2, min product is also -2, and best product is -2
  // at 3, we have 3 candidates
  //  just 3
  //  3 * max_product (-2) = -6
  //  3 * min_product (-2) = -6
  // so max product seen so far is just 3
  // min is -6
  // now -4
  // 3 candidates
  //  just -4
  // -4 * max_product (-6) = 24
  // -4 * min_product (-6) = 24
  // so max product seen so far becomes 24, min product remains -6
  // and 24 is our answer

  for (let num of nums) {
    const maybeMax = currMax * num;
    const maybeMin = currMin * num;

    currMax = Math.max(num, maybeMax, maybeMin);
    currMin = Math.min(num, maybeMax, maybeMin);

    max = Math.max(max, currMin, currMax);
  }

  return max;
};

/*

REACTO

REPEAT
    given
        nums int[] 
    output
        find subarray int[] - a subarray of nums that have the largest product
        return that product

EXAMPLE
    [2,3,-2,4]
    a product of the whole array is 2*3*-2*4 -60
    we can't just drop -2 and use the rest, it won't be contigious
    so use [2,3] = 6

APPROACH
    example   [5, -6, 2, -6]
    answer is [5, -6, 2, -6]

    start at 5
        include in subarray
            recurse(prod=5, i=1)
        exclude
            recurse(prod=1, i=1)


    what if at some step j
    we consider product to be one of
        nums[j]
        nums[j] * maximum seen so far
        nums[j] * minimum seen so far
        
[5, -6, 2, -6]
so for example at step 5
    [5]
    at -6, max seen so far 5 and min also 5
    so -6, -6*5, -6*5
    current is -30, max is 5, min is -30
    at 2
    current is -60, max is 5, min is -60
    at -6
    current is 360

[5, -6, 2]
at 5
current = 5
update max = 5, min = 5
at -6
current = -6
update max = 5, min = -6
at 2



CODE

TEST

OPTIMIZE

*/
