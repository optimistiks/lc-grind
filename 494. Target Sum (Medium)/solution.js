/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number}
 */
var findTargetSumWays = function (nums, target) {
  // recursive with memo
  // -------------------

  // const sum = nums.reduce((acc, item) => acc + item)

  // const cache = Array.from({ length: nums.length }, () => Array.from({ length: sum + 1 }))

  // const dfs = (i, sum) => {
  //     if (i === nums.length) {
  //         return target === sum ? 1 : 0
  //     }

  //     if (cache[i][sum] != null) {
  //         return cache[i][sum]
  //     }

  //     const result = dfs(i + 1, sum - nums[i]) + dfs(i + 1, sum + nums[i])

  //     cache[i][sum] = result

  //     return result
  // }

  // return dfs(0, 0)

  // -------------------

  // 2D DP
  // -------------------

  // const sum = nums.reduce((acc, item) => acc + item)

  // if (sum < Math.abs(target)) return 0

  // const dp = Array.from({ length: nums.length + 1 }, () => Array.from({ length: sum + 1 }, () => 0))

  // // with empty subarray there is 1 way to reach sum 0
  // dp[nums.length][0] = 1

  // for (let i = nums.length - 1; i >= 0; --i) {
  //     const num = nums[i]
  //     // increase our subarray by 1 num, so if it was [],
  //     // now it is [5] for example input such as [1,2,3,4,5]
  //     for (let s = 0; s <= sum; ++s) {
  //         // can we build an expression that evaluates to s,
  //         // while looking at subarray [i...nums.length-1]
  //         // we can with num if we can build s - num without
  //         // so for example, s=3 [2,5] num=2
  //         // s + num = 5 (could we evaluate to 5 previously without num?)
  //         // s - num = 1 (could we eval to 1 previously without num?)
  //         // so for example, s=7 [2,5] num=2
  //         // s + num = 9
  //         // s - num = 5

  //         // if we previously could evaluate to s - num then now we can use +num to evaluate to s
  //         // if we previously could evaluate to s + num then now we can use -num to evaluate to s
  //         // [1] s=1 num=1 s-num=0 we could previously ([]) evaluate to 0 so now we can evaluate to 1 with +1
  //         //               s+num=2 we could not previously ([]) evaluate to 2 so now we cannot evaluate to 1 with -1
  //         dp[i][s] = (dp[i + 1][Math.abs(s + num)] || 0) +
  //             (dp[i + 1][Math.abs(s - num)] || 0)
  //     }
  // }

  // // console.log(dp)

  // return dp[0][Math.abs(target)]

  // -------------------

  // 1D DP
  // -------------------

  // const sum = nums.reduce((acc, item) => acc + item)
  // if (sum < Math.abs(target)) return 0

  // // row representing subarray []
  // let dpRow = Array.from({ length: sum + 1 })
  // // sum 0 reachable with empty subarray
  // dpRow[0] = 1

  // for (let i = nums.length - 1; i >= 0; --i) {
  //     const num = nums[i]
  //     // new dp row repsenting subarray from nums[i] to nums[nums.length - 1] inclusive
  //     const newDpRow = Array.from({ length: sum + 1 })
  //     for (let s = 0; s <= sum; ++s) {
  //         // can we build an expression that evaluates to s using the current subarray?
  //         // s - num = x, if we can build an expression that evaluates to x with previous subarray
  //         // s + num = y, if we can build an expression that evaluates to y with previous subarray
  //         newDpRow[s] = (dpRow[Math.abs(s - num)] || 0) + (dpRow[Math.abs(s + num)] || 0)
  //     }
  //     dpRow = newDpRow
  // }

  // return dpRow[Math.abs(target)]

  // -------------------

  // 1D DP V2
  // -------------------

  const sum = nums.reduce((acc, item) => acc + item);
  if (sum < Math.abs(target)) return 0;

  // this represents a dp row for an empty subarray
  // the only expression we can build with an empty subarray evaluates to 0
  let dp = new Map();
  dp.set(0, 1);

  for (let i = nums.length - 1; i >= 0; --i) {
    const num = nums[i];
    // our current subarray is from nums[i] to nums[nums.length - 1] inclusive

    // we should now iterate all the values we could evaluate to with our previous subarray
    // using those values, we will be able to determine what values we can evaluate to with our current subarray

    const newDp = new Map();

    for (let [s, count] of dp) {
      // we may have negative and positive s in the dp
      // when we have negative s, adding a num to it may result in the same value as,
      // for example, when substracting the same num from the same but positive s
      // and vice versa, so we need to check if we already have something in newDp
      newDp.set(s - num, (newDp.get(s - num) ?? 0) + count);
      newDp.set(s + num, (newDp.get(s + num) ?? 0) + count);
    }

    // console.log('i=', i, nums.slice(i))
    // console.log('prev dp', Array.from(dp.entries()))
    // console.log('new dp', Array.from(newDp.entries()))

    dp = newDp;
  }

  return dp.get(target) ?? 0;

  /*
   */

  // -------------------
};
