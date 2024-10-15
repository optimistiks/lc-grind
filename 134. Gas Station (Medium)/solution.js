/**
 * @param {number[]} gas
 * @param {number[]} cost
 * @return {number}
 */
var canCompleteCircuit = function (gas, cost) {
  // calculate total gas we can get
  const totalGas = gas.reduce((acc, amount) => acc + amount, 0);
  // calculate total gas we will spend
  const totalCost = cost.reduce((acc, amount) => acc + amount, 0);

  // the route requires more gas than it provides, can't make a loop
  if (totalCost > totalGas) {
    return -1;
  }

  // at this point we know there is one unique solution

  // start at station 0 with 0 gas
  let start = 0;
  let currGas = 0;

  // iterate gas stations starting with 0
  for (let i = 0; i < gas.length; ++i) {
    // update curr gas by adding gas from the station, and subtracting the travel cost
    currGas = currGas + gas[i] - cost[i];
    // if currGas is negative, we can't reach this station from whatever station we started from
    if (currGas < 0) {
      // if we cant reach station i+1 from start, we cant reach it from anywhere between start and i
      // try starting from i+1 station
      currGas = 0;
      start = i + 1;
    }
  }

  return start;
};
