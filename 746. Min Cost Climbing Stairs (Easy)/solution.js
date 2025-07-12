/**
 * @param {number[]} cost
 * @return {number}
 */
var minCostClimbingStairs = function (cost) {
  /* solution from the bottom stair, moving upwards */
  // so the cost of reaching stair 0 and stair 1 is 0
  const dp = [0, 0];
  // because we can reach them from the ground directly
  // now we can calculate min cost of reaching stair 2
  // it's cost of stair 1 + it's min cost OR cost of stair 2 and it's min cost
  // now we need to have one "fake" step after the last
  // it's our top, so we can calculate the min cost of reaching it from last and second-to-last stair

  for (let curr = 2; curr <= cost.length; ++curr) {
    // price to reach cost is price of previous or second previous stair,
    // plus that stair's price
    const currCost = Math.min(cost[curr - 1] + dp[1], cost[curr - 2] + dp[0]);
    const temp = dp[1];
    dp[1] = currCost;
    dp[0] = temp;
  }

  return dp[1];

  /* solution from the top stair, moving downwards */

  // initialize dp as min cost of reaching the top from second-to-last stair
  // (which is the cost of the stair itself, because we can step over the last stair)
  // and min cost of reaching the top from the last stair
  // (which is the cost of the stair itself)
  // by knowing this, we can calculate min cost of reaching the top from third-to-last stair
  // and discard the min cost of reaching the top from the last stair
  // because to calculate the min cost of reaching the top from fourth-to-last stair
  // we only need to know min costs of third-to-last and second-to-last
  // const dp = [cost[cost.length - 2], cost[cost.length - 1]];

  // let curr = cost.length - 2;

  // while (curr > 0) {
  //     const currCost = cost[curr - 1] + Math.min(...dp);
  //     const temp = dp[0];
  //     dp[0] = currCost;
  //     dp[1] = temp;
  //     curr -= 1;
  // }

  // return Math.min(...dp);
};

/*
REACTO

Repeat
given
    cost integer[] cost[i] is a price of stepping on ith step
    you can step 1 or 2 steps 
        by extension, you can start with step 0 or step 1
return
    integer min cost to reach the top

Example

[10,15,20]
(we start here)[10,15,20]

we can go 10-15-20-top
          10-15-top
          10-20-top
          15-20-top
          15-top (this is the min cost)

Approach
    minPrice(10) (get min price of reaching the top from step 10)
        10 + minPrice(15) (get min price of reaching the top from step 15)
            15 + minPrice(20)
                20 + 0 (top reached)
                (record 20 as min cost of reaching the top from stair 20)
            15 + 0 (top reached)
            (35 vs 15, record 15 as min cost of reaching the top from stair 15)
        10 + minPrice(20)
            (minPrice of reaching the top from step 20 is already known)
        (25 vs 30, record 25 as min cost of reaching the top from step 10)
    minPrice(15)
        it's already known, 

what about bottom up?
what can we prefill
10,15,20]
    we can prefill the min cost of reaching the top from last stair and second-to-last cell
    [15, 20]
    now start at third-to-last and descend
        minCost of reaching the top from third to last is min(minCost(thirdToLast+1), minCost(thirdToLast+2))
            thirdToLast + min(15, 20)
            10 + 15 = 25
            so min cost of reaching the top from 10 is 25
            now we can have
            [minCostOfReachingTheTopFromThirdToLast,minCostOfReachingTheTopFromSecondToLast]

            
    
*/
