/**
 * @param {number[]} prices
 * @return {number}
 */
var maxProfit = function (prices) {
  let minBuy = Infinity;
  let maxProfit = 0;

  for (let price of prices) {
    // try to sell at price
    maxProfit = Math.max(maxProfit, price - minBuy);
    // try to buy at price
    minBuy = Math.min(minBuy, price);
  }

  if (maxProfit < 0) {
    return 0;
  }

  return maxProfit;
};

/*
    prices: int[]
    price[i] is a price of a given stock on the ith day
    return int max profit achievable when buying on one day and selling on the different day

    example
    [7,1,5,3,6,4]
    answer: buy on day 2 (index=1, price=1) and sell on day 5 (index=4, price=6) profit=6-1

    approach
    keep track of min buy price and max sell price?

    buy at 7 minBuy=7

    sell at 1, maxProfit=-6 maxSell=1
    buy at 1 minBuy=1

    sell at 5, maxProfit=4, maxSell=5
    buy at 5, minBuy=1 (unchanged)

    sell at 3, maxProfit=4 (Unchanged) maxSell=5 (unchanged)
    buy at 3, minBuy=3 (unchanged)

    sell at 6, maxProfit=5, maxSell=6
    buy at


*/
