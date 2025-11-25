/**
 * @param {number} amount
 * @param {number[]} coins
 * @return {number}
 */
var change = function (amount, coins) {
  // recursion with memo
  // ------------------

  // const cache = Array.from({ length: coins.length }, () => Array.from({ length: amount + 1 }))

  // const dfs = (i, sum) => {
  //     if (sum > amount) {
  //         return 0
  //     }

  //     if (sum === amount) {
  //         return 1
  //     }

  //     if (i === coins.length) {
  //         return 0
  //     }

  //     if (cache[i][sum] != null) {
  //         return cache[i][sum]
  //     }

  //     const result = dfs(i + 1, sum) + dfs(i, sum + coins[i])

  //     cache[i][sum] = result

  //     return result
  // }

  // return dfs(0, 0)
  // ------------------

  // bottom up 2D dp table
  // ------------------

  /*
        0 1 2 3 4 5
    0(1)4 3 2 2 1 1
    1(2)1 1 0 1 0 1
    2(5)1 0 0 0 0 1
    3   0 0 0 0 0 1
    */

  // const dp = Array.from({ length: coins.length + 1 }, () => Array.from({ length: amount + 1 }, () => 0))

  // dp[coins.length][amount] = 1

  // for (let sum = amount; sum >= 0; --sum) {
  //     // sum: 5,4,3,2,1,0 for amount=5
  //     for (let i = coins.length - 1; i >= 0; --i) {
  //         // coin index 2, 1, 0 for coins.length === 3

  //         // include this coin
  //         const including = dp[i][sum + coins[i]] ?? 0
  //         // not include this coin
  //         const excluding = dp[i + 1][sum]

  //         dp[i][sum] = including + excluding
  //     }
  // }

  // return dp[0][0]
  // ------------------

  // 1D DP
  // ------------------

  const dp = Array.from({ length: amount + 1 }, () => 0);
  dp[0] = 1;

  for (let coin of coins) {
    // we have array where indexes are amounts from 0 to amount inclusive
    // array[0] is set to 1, others to 0
    // so at some amount i and coin
    // array[i] is the number of combinations that make up amount i without using the coin
    // array[i - coin] is the number of combinations that make up amount i - coin (possibly using this coin)
    // we need to sum up those values

    for (let sum = 0; sum <= amount; ++sum) {
      dp[sum] = dp[sum] + (dp[sum - coin] ?? 0);
    }
  }

  return dp[amount];

  // ------------------
};
