/**
 * @param {number[]} days
 * @param {number[]} costs
 * @return {number}
 */
var mincostTickets = function (days, costs) {
  /* recursive with memo */
  // ---------------------
  // const cache = Array.from({ length: days.length })

  // const rec = (dayIndex) => {
  //     if (dayIndex === days.length) {
  //         return 0
  //     }

  //     if (cache[dayIndex] != null) {
  //         return cache[dayIndex]
  //     }

  //     // first, calculate using 1-day pass
  //     let minCost = costs[0] + rec(dayIndex + 1)

  //     // second, try using 7-day pass, fast forward 7 days
  //     // a 7 day pass allows travel on days 1 2 3 4 5 6 7
  //     // so we need to find first day >= current day + 7 (so for day 1 it would be 8)
  //     let skip7DaysIndex = dayIndex
  //     while (skip7DaysIndex < days.length && days[skip7DaysIndex] < days[dayIndex] + 7) {
  //         skip7DaysIndex += 1
  //     }

  //     minCost = Math.min(minCost, costs[1] + rec(skip7DaysIndex))

  //     // third, try using 30-day pass, fast forward 30 days
  //     let skip30DaysIndex = dayIndex
  //     while (skip30DaysIndex < days.length && days[skip30DaysIndex] < days[dayIndex] + 30) {
  //         skip30DaysIndex += 1
  //     }

  //     minCost = Math.min(minCost, costs[2] + rec(skip30DaysIndex))

  //     cache[dayIndex] = minCost

  //     return minCost
  // }

  // return rec(0)
  // ---------------------

  /* dp 1D */
  // ---------------------
  /*
    we iterate dp backwards
    at some dp[i] we check dp[i + 1] for 1-day pass
    for 7 day pass and 30 days pass we fast forward i until we find the next day, or end of the array 
    */
  const dp = Array.from({ length: days.length }, () => 0);

  for (let i = days.length - 1; i >= 0; --i) {
    const day = days[i];

    // 1-day pass
    let minCost = costs[0] + (dp[i + 1] ?? 0);

    // 7-day pass
    let skip7Days = i;
    while (skip7Days < days.length && days[skip7Days] < day + 7) {
      skip7Days += 1;
    }

    minCost = Math.min(minCost, costs[1] + (dp[skip7Days] ?? 0));

    // 30-day pass
    let skip30Days = i;
    while (skip30Days < days.length && days[skip30Days] < day + 30) {
      skip30Days += 1;
    }

    minCost = Math.min(minCost, costs[2] + (dp[skip30Days] ?? 0));

    dp[i] = minCost;
  }

  return dp[0];
  // ---------------------
};
