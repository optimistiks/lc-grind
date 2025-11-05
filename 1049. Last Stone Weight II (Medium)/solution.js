/**
 * @param {number[]} stones
 * @return {number}
 */
var lastStoneWeightII = function (stones) {
  const sumWeights = stones.reduce((acc, stone) => acc + stone);
  // we want to have two groups of stones, ideally with equal weight, or minimum weight
  const halfSum = Math.floor(sumWeights / 2);
  // is there a subset of stones that sums up to halfSum? or at least as close to it as possible?
  // if there is a subset of stones of weight halfSum, it means they will cancel out another halfSUm of weight
  // from the other half
  // so what is left is TotalSum - HalfSum * 2 is our remaining stone weight

  // 2D DP
  // we want to find out if sets of stones are possible of weight from 0 to halfSum included
  // it is possible to form a subset of weight 0 out of 0 stones
  // [] dp[0][0] = true
  // [2,7,4,1,8,1]
  // [2]
  // dp[1][2] can include 2 and dp[0][0] is also possible
  // const dp = Array.from(
  //     { length: stones.length + 1 },
  //     () => Array.from(
  //         { length: halfSum + 1 },
  //         () => false
  //     )
  // )

  // for (let i = 0; i <= stones.length; ++i) {
  //     // an empty subset can always exist (sums up to 0)
  //     dp[i][0] = true
  // }

  // for (let i = 1; i <= stones.length; ++i) {
  //     const stone = stones[i - 1]
  //     for (let j = halfSum; j >= 0; --j) {
  //         // if we include stone into consideration,
  //         // there is a subset that sums up to j IF
  //         // without this stone there was already a subset
  //         // OR there was a subset that sums up to j - stone
  //         // we go backwards to not include the same stone twice
  //         dp[i][j] = dp[i - 1][j] || (j - stone >= 0 && dp[i - 1][j - stone])
  //     }
  // }

  // // last row of dp row is basically this
  // // all stones considered,
  // // is there a subset that sums up to every value from 0 to halfSum?
  // // if dp[stones.length][value] is true, there is a subset from all stones that sums up to value
  // let minLeftover = Infinity
  // for (let s = halfSum; s >= 0; --s) {
  //     if (dp[stones.length][s]) {
  //         minLeftover = Math.min(minLeftover, sumWeights - s * 2)
  //     }
  // }

  // return minLeftover

  // 1D DP
  // initial dp row represents "when no stones are considered"
  let dpRow = Array.from({ length: halfSum + 1 }, () => false);
  // when no stones are considered, a sum of 0 can still be reached with an empty subset
  dpRow[0] = true;

  for (let i = 0; i < stones.length; ++i) {
    // consider stones up to and including i
    const stone = stones[i];

    const newDpRow = Array.from({ length: halfSum + 1 }, () => false);
    // sum of 0 is always reachable with an empty subset
    newDpRow[0] = true;

    for (let s = halfSum; s >= 0; --s) {
      // a sum s is reachable with some subset if
      // a sum s is reachable with stones not including i (previous dp row)
      // or a sum s-stone is reachable in a previous dp row
      newDpRow[s] = dpRow[s] || (stone <= s && dpRow[s - stone]);
    }

    dpRow = newDpRow;
  }

  // extract all reachable weights, get the maximum of them
  const maxReachableSum = Math.max(
    ...dpRow.map((_, index) => index).filter((sum) => dpRow[sum] === true)
  );
  // this is the closest we can get to one half of stones weighing halfSum
  // meaning it will cancel out another such max value from the remainder of the total weight
  // the rest is the stone that will remain after all the merges

  return sumWeights - maxReachableSum * 2;
};

/*
REACTO

Repeat
given
    stones int[i] stone[i] weight of ith stone

each turn, choose any two stones with weights x and y x <= y, and combine them
    if x == y the stones are gone
    if x < y stone weight x is gone, stone weight y has now weight y - x

return smallest possible weight of the last stone or 0 if no stones remain



*/
