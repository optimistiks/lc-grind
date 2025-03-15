/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
  // if we sort the array
  // then we can lock the first element
  // and solve 2 sum (sorted) for the rest of the array
  // since the array is sorted, we can skip duplicates
  // so for given i
  // set j to i+1
  // set k to last
  // check if j+k equals to negative i
  // reduce or increase sum as appropriate
  // skip duplicates (check previous)

  nums.sort((a, b) => a - b);
  console.log("sorted", nums);

  const result = [];

  function twoSum(i) {
    let left = i + 1;
    let right = nums.length - 1;

    while (left < right) {
      if (left > i + 1 && nums[left] === nums[left - 1]) {
        // console.log('skip sum', nums[i], nums[left], nums[right], i, left, right)
        left += 1;
        continue;
      }

      const sum = nums[left] + nums[right] + nums[i];
      // console.log('check sum', nums[i], nums[left], nums[right])

      if (sum > 0) {
        right -= 1;
      } else if (sum < 0) {
        left += 1;
      } else {
        // console.log('push sum', [nums[i], nums[left], nums[right]])
        result.push([nums[i], nums[left], nums[right]]);
        left += 1;
        right -= 1;
      }
    }
  }

  for (let i = 0; i < nums.length - 2; ++i) {
    if (nums[i - 1] === nums[i]) {
      continue;
    }
    twoSum(i);
  }

  return result;
};

/*
REACTO

Repeat
we have an integer array
we need to return an array of triplets
that contains all triplets that sum up to 0
numbers in a triplets should be unique

Example
[1,-2,3,4,5,1]
[[1,-2,1]]

Approach
can we just brute force
lock first number
    start inner loop with second element
        start inner loop with third element
            check if sum to 0
            inner loop walks until the end

*/
