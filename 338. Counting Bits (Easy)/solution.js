/**
 * @param {number} n
 * @return {number[]}
 */
var countBits = function (n) {
  if (n === 0) return [0];
  const dp = [0, 1];

  // even numbers have their 1s count equal to count of the number / 2
  // odd numbers have their 1s count equal to count of the number / 2, plus one
  // for example, binary representation of 7 is 111 (count = 3)
  // first we get count of 3 (floor(7 / 2)) which equals to 2 (binary = 11), and then plus one
  // binary representation of 4 is 100 (count = 1)
  // same as count of 2 (4/2), which is 1

  // this allows us to calculate the amount of 1s in each number
  // by iterating the number upwards, and having 0 and 1 as the base case

  // so first we have [0, 1] as the amount of 1s in 0 and 1 respectively
  // then we calculate count[2] as count[2/2] which makes it equal to count[1]
  // then we calculate count[3] as count[3/2] + 1 which makes it equal to count[1] + 1
  // and so on

  for (let num = 2; num <= n; ++num) {
    if (num % 2 === 0) {
      dp[num] = dp[num / 2];
    } else {
      dp[num] = dp[Math.floor(num / 2)] + 1;
    }
  }

  return dp;
};

// tc: O(n)
// sc: O(n)
