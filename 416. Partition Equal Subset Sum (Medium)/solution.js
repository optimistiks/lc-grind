/**
 * @param {number[]} nums
 * @return {boolean}
 */
var canPartition = function (nums) {
  if (nums.length < 2) return false;

  const sum = nums.reduce((sum, item) => sum + item, 0);

  if (sum % 2 !== 0) return false;

  const target = sum / 2;

  const dp = Array.from({ length: target + 1 }, () => false);

  // dp[sum]
  // a sum=0 is reachable when using 0 items from nums
  dp[0] = true;

  // [true, false, false ...] initially
  // i=0
  // value = 5
  // sum = 10
  // dp[10] true? no, dp[10-5] true? no
  // ...
  // sum = 5
  // dp[5] true? no, dp[5-5] true? yes, so dp[5] is now true
  // i=1
  // value = 5
  // sum = 10
  // dp[10] true? no, dp[10-5] true? no
  // i=2
  // value = 6
  // sum = 10
  // dp[10] true? yes, means 10 is reachable without including 6

  for (let i = 0; i < nums.length; ++i) {
    const value = nums[i];
    for (let sum = target; sum >= value; --sum) {
      dp[sum] = dp[sum] || dp[sum - value];
    }
  }

  return dp[target];
};

/*

REACTO

Repeat
given
    nums: int[]
return
    result: bool - true if nums can be partitioned into two subsets, where sum(subset1) === sum(subset2)

Example
nums = [1,5,11,5]
can be partitioned into [1,5,5] [11]
nums = [] false
nums = [1] false
nums = [1,2,3,5] false
nums = [1,1] true

Approach

[10, 10]
can this be partitioned? yes, can be checked in constant time

[10, 20]
can this be partitioned? yes, can be checked in constant time

let's say a new element comes in, 40
[10, 20, 40]
how do we check if it can be partitioned, without rechecking everything
we now total sum so far, total sum = 10 + 20 = 30
we also know the diff between subsets [10] and [20], diff = 10
so it is possible if new element === total sum, or new element === diff
if it's not possible
the sets we can make here are
[10, 20, 40] [] | [10, 20] [40] | [10] [20, 40] | [10, 40] [20] | [20, 40] [10]
we know only values 30 (total sum so far), 10 (diff so far), and 40 (new value)
we can add 30 and 40 to get 70
we can subtract 30 from 40 to get 10

let's say a new element comes in, 15
[10, 20, 40, 15]



 


*/
