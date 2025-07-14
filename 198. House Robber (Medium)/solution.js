/**
 * @param {number[]} nums
 * @return {number}
 */
var rob = function (nums) {
  // initialize dp as follows
  // dp[0] is maxRobbed when no houses are present - so 0
  // dp[1] is maxRobbed when only first house is present - so 1
  const dp = [0, nums[0]];

  // now start from the second house
  // for each house, we can rob them or not
  // if we rob them, take the house value, and add value from DP that does not include the preceding house
  // if we don't rob them, take only value from DP that includes previous house
  // and find max of those two values
  // so dp[2] would mean maxRobbed when both first and second house are present
  // but since we only need two maxRobbed values, one with previous house included, and one with previous house not included
  // we keep the dp of size 2

  for (let i = 1; i < nums.length; ++i) {
    const maxRobbed = Math.max(nums[i] + dp[0], dp[1]);
    const temp = dp[1];
    dp[1] = maxRobbed;
    dp[0] = temp;
  }

  return dp[1];
};

/*
REACTO

Repeat
given
    nums integer[] where nums[i] is the amount of money in a house i
return
    integer - maximum amount of money that can be robbed without alerting
    alert - two adjacent houses are robbed

Example
[1,2,3,1]
we can rob
    1 (if we rob 1, we cannot rob 2)
        3 (1-3)
        1 (1-1)
    2
        1
    
Approach
for each house, we have a decision - rob or not rob
    1
        rob
            sum = 1 + rob([3,1])
                3
                    rob
                        sum = 3 + rob([])
                    not
                        sum = 0 + rob([1])
                            1
                                rob
                                    sum = 1 + rob([])
                                not rob
                                    sum = 0 + rob([])
        not 
            sum = 0 + rob([2,3,1])
                2
                    rob
                        sum = 2 + rob([1])
                    not rob
                        sum = 0 + rob([3,1])

[1,2,3,1]
i=0
max = Math.max(arr[i] + max(i + 2), max(i + 1))
[,,,1,0]
// max robbed when 0 houses left = 0 (i = len)
// max robbed when only last house left = 1 (i = len-1)
i = len-2
    Math.max(arr[i] + dp[i + 2], dp[i + 1])
    // so we take value of house i, and take value from dp[i+2]
    // OR we take value from dp[i+1]

can we do from the front?
[0,1]
0 = max robbed when no houses are present
1 = max robbed when only first house is present
i=2
    Math.max(arr[i] + dp[i - 2], dp[i-1])


*/
