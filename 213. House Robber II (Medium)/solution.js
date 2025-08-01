/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  if (nums.length === 1) {
    return nums[0];
  }
  /*
    at each house we store 2 values now instead of one
    first value tells us max value we can rob at this house, including the very first house
    second value tells us max value we can rob at this house, excluding the very first house
    at the end,
    we need two values
    one that is at the last house, but excludes the first house (we cannot include both first and last)
    and the other is at the second to last house, that includes the first house (and excludes last by definition)
    and take max value of them
    */
  const dp = [
    [0, 0],
    [nums[0], 0],
  ];

  for (let i = 1; i < nums.length; ++i) {
    const value = nums[i];

    const temp = dp[1];

    const excludingCurrent = dp[1];

    const prev = dp[0];
    const includingCurrent = [value + prev[0], value + prev[1]];

    const final = [
      Math.max(excludingCurrent[0], includingCurrent[0]),
      Math.max(excludingCurrent[1], includingCurrent[1]),
    ];

    dp[0] = temp;
    dp[1] = final;
  }

  return Math.max(dp[1][1], dp[0][0]);
};

/*
REACTO

Repeat
given
    array int[] of size n, where int[i] is money in ith house
return
    int, the maximum amount of money that can be robbed
conditions
    cannot rob adjacent houses
    house n is neighbor of house 1

Example
[2,3,2]
result=3
cannot rob 2 and 2 because they are adjacent (first and last)

Approach
[2,3,2]
(0,0), (2,0)
at 3
include
    3 + (0,0) (3,3)
exclude
    (2,0)
win (3,3)
at 2
include
    2 + (2,0) = (4,2)
exlude (3,3)
win (4,3)

so we have (0,0) (2,0) (3,3) (4,3)
maybe we should take value that includes last, but omits first (here it's 3 in (4,3))
and value that exludes last, but includes 1st (here it's 3 in (3,3))

[1,2,3]
(0,0) (1,0)
at 2
include 
    2 + (0,0) = (2,2)
exlude
    (1,0)
(0,0) (1,0) (2,2)
at 3
include
    3 + (1,0) = (4,3)
exclude
    (2,2)
(4,3)
(0,0) (1,0) (2,2) (4,3)
value that includes last but omits first is 3 in (4,3)
value that includest first but omits last is 2 in (2,2)




*/
