/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let minBuy = Infinity;
  let maxProfit = 0;

  for (let price of prices) {
    if (price > minBuy) {
      // sell
      maxProfit += price - minBuy;
      minBuy = price;
    } else {
      // no need to sell, we won't get any profit, it's better to update minBuy here
      // because price <= minBuy here
      minBuy = price;
    }
  }

  return maxProfit;
};

/*
    prices int[]
    prices[i] price of a stock on the ith day
    it is possible to sell and buy on the same day (or sell on one day and buy on another day)
    return maxProfit

    [7,1,2,3,5,3,6,4]

    v1: buy for 1 sell for 6 (profit 5) 

    v2: buy for 1 sell for 5 (profit 4), then buy for 3 sell for 6 (profit 3), maxProfit=7

    minBuy = Inf
    i=0, v=7
        if v > minBuy
            "sell": maxProfit += v - minBuy
            minBuy = v // we sold so we should buy at this price too
        else v < minBuy
            minBuy = v (7)

    i=1 v=1
        v < minBuy
        minBuy = v (1)

    i=2 v=2
        v > minBuy
        maxProfit += 2-1 (1)
        minBuy = 2 (2)

    i=3 v=3
        v > minBuy
        maxProfit += 3-2 (2)
        minBuy = 3 (3)
        
    [7,1,2,3,5,3,6,4]

    i=4 v=5
        v > minBuy
        maxProfit += 5-3 (4)

    

*/
