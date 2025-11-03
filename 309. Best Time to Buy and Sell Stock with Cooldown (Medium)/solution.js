/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  // let resultMaxProfit = 0

  // const rec = (i, minBuy, maxProfit) => {
  //     if (i === prices.length) {
  //         resultMaxProfit = Math.max(resultMaxProfit, maxProfit)
  //         return
  //     }

  //     const price = prices[i]

  //     if (price > minBuy) {
  //         // we sell at this price
  //         // and we skip the next (cooldown)
  //         const profit = price - minBuy
  //         const minBuy = Infinity
  //         rec(i + 2, minBuy, maxProfit + profit)
  //         // or we don't sell at this price
  //         rec(i + 1, Math.min(minBuy, price), maxProfit)
  //     } else {
  //         // we don't sell at this price
  //         rec(i + 1, Math.min(minBuy, price), maxProfit)
  //     }
  // }

  // rec(0, Infinity, 0)

  // return maxProfit

  // const dp = Array.from({ length: prices.length }, () => Array.from({ length: 3 }))

  // // dp[i][0] // bought for price[i]
  // // dp[i][1] // sold for price[i]
  // // dp[i][2] // cooldown at price[i]
  // dp[0][0] = -prices[0]
  // dp[0][1] = 0
  // dp[0][2] = 0

  // for (let i = 1; i < prices.length; ++i) {
  //     const price = prices[i]

  //     // I want to buy for this price
  //     // either check previous@cooldown and subtract price,
  //     // or ignore price and check previous@buy (means previous price was a better price to buy)
  //     // so I either take profit from the previous cooldown and buy at this price
  //     // or I skip this price, carrying over a previosu best price buy
  //     dp[i][0] = Math.max(dp[i - 1][0], dp[i - 1][2] - price)

  //     // I want to sell at this price, so add the price to the previous@buy
  //     // whatever was our profit at the previous best price buy, add this price to that, simulating a sell
  //     // so whatever is the previous best price buy, we might have sold it previously for a better price,
  //     // so consider that as well and take max
  //     dp[i][1] = Math.max(dp[i - 1][1], dp[i - 1][0] + price)

  //     // I want to have a cooldown at this price, meaning I need to check previous@sell
  //     // whatever our profit was at the previous sell, it remains as such during this cooldown
  //     dp[i][2] = dp[i - 1][1]
  // }

  // const result = dp[prices.length - 1][1]

  // // console.log(dp)

  // return result < 0 ? 0 : result

  let nextDayCanBuy = 0;
  let nextDayCanSell = 0;
  let dayAfterNextCanBuy = 0;

  for (let i = prices.length - 1; i >= 0; --i) {
    const price = prices[i];

    // what if I can buy at this price
    const thisDayCanBuy = Math.max(nextDayCanSell - price, nextDayCanBuy);
    // what if I can sell at this price
    const thisDayCanSell = Math.max(dayAfterNextCanBuy + price, nextDayCanSell);

    dayAfterNextCanBuy = nextDayCanBuy;
    nextDayCanBuy = thisDayCanBuy;
    nextDayCanSell = thisDayCanSell;
  }

  // initial day 0 - state "can buy"
  return nextDayCanBuy;
};

/*
[4,3,2,10,11,0,11]
at i=4 v=11 we can

    1   4   2   
b  -1   -1  -1      
s   0   3   
c   0   0   

buy stock for 4 (profit so far: -4)
sell stock for 4 (did not buy anything, so 0)
cooldown at 4 (0)

buy stock for 3
    check previous@cooldown: 0
    result = -3
    OR choose to ignore and take previous@buy
sell stock for 3
    check previous@buy
    result = -1
cooldown at 3
    check previous@sell
    0

buy stock for 2
    check previous@cooldown=0
    -2 (or ignore and take previous@buy)
sell stock for 2
    check previous@buy (-3)
    result = -1
cooldown at 2
    check previous@sell (-1)

[4,3,2,10,11,0,11]

buy stock for 10
    check previous@cooldown (-1)
    result = -11 
    what does this -11 mean? it means there was a cooldown at "2", meaning we sold at "3", meaning we bought at "4"
    so our maxProfit was -1 and now we bought for 10, result = -11
    I don't want to buy for 10,
    meaning I don't need to look at previous@cooldown
    I can look at previous@buy = -2
    meaning that I bought shares for 2, and ignored 10, so my profit is still -2
sell stock for 10
    look at previous@buy (-2)
    result = 8
cooldown at 10
    check previous@sell (-1)

buy stock for 11
    check previous@cooldown (-1) result=-12
    check previous@buy (-2) result=-2
    choose result=-2
sell stock for 11
    check previous@buy (-2)
    result=9
cooldown at 11
    check previous@sell (8)



    

*/
