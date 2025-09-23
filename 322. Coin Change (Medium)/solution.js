/**
 * @param {number[]} coins
 * @param {number} amount
 * @return {number}
 */
var coinChange = function (coins, amount) {
  // let result = Infinity;

  // const rec = (amount, choices) => {
  //     if (amount < 0) return;

  //     if (amount === 0) {
  //         result = Math.min(choices.length, result);
  //         return;
  //     }

  //     for (let coin of coins) {
  //         rec(amount - coin, [...choices, coin]);
  //     }
  // }

  // rec(amount, []);

  // if (result === Infinity) return -1;

  // return result;

  const dp = Array.from({ length: amount + 1 }, () => Infinity);

  // start from a minimal subproblem, what is the fewest number of coins to represent amount 0? the answer is 0
  dp[0] = 0;

  for (let coin of coins) {
    // second subproblem would equal to coin, third to coin+1 and so on until amount
    for (let target = coin; target <= amount; ++target) {
      const prevResult = dp[target - coin];
      // prevResult will be a value if target-coin value was previously reached
      // or Infinity if target-coin value is unreachable
      dp[target] = Math.min(dp[target], prevResult + 1);
      // so let's say our coins are [5, 1]
      // [0] = 0, then [5] will be 1, then [6] will be Infinity because [1] is unreachable with coin 5
      // but later we are at coin 1, [0] = 0, [1] = 1, then we reach [5] and it has value 1 so it stays,
      // then we reach [6] but in this case with coin 1 we can reach it with 1 + [5] so we overwrite Infinity
    }
  }
  return dp[amount] === Infinity ? -1 : dp[amount];
};

/*

REACTO

Repeat
    Given
        coins: int[] - coins of different denominations, coins[i] is a denomination of coin i
        amount: int
    Return
        answer: int - the smallest number of coins that make up the amount (if amount cannot be made up with given coins, return -1)
    
    The quantity of each coin is unlimited

Example
coins = [1, 2, 5]
amount = 11
answer = 3 (2 coins of 5, one coin of 1)

Approach
what if we have just one coin
coins = [5, 9]
amount = 11

amount=11, coins=[5, 9], choices=[]
    if amount === 0:
        we've reached exactly the amount
        update result with choices.length if choices.length < result
    if amount < 0:
        we couldn't reach exactly the amount and there is no point proceeding
        return
    for coin in coins
        recursion(amount - coin, coins, choices.push(coin))   


for the amount 0, what is the minimum number of coins? The answer is 0
for the amount 1, what is the minimum number of coins?
    we need to iterate coins
        let's say coin=1
        leftover = 0
        result = 1 + results[leftover]


for the amount of 20, what is the minimum number of coins?
    iterate coins [2,3,5]
        coin = 2
        leftover = 18
        result = results[leftover] + 1
        // results[leftover] contains minimum number of coins to reach 18
        // for example, this result is 10.
        // should we record it to results[20] ? yes only if results[20] is empty, or the value there is larger than this new result
        ...
        coin = 5
        leftover = 15
        result = results[leftover] + 1
        // now result is 4
        // results[20] already have value 10 from coin=2
        // we overwrite it because 4 < 10






Code

Test

Optimize

*/
