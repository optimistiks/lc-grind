/**
 * @param {number[]} bills
 * @return {boolean}
 */
var lemonadeChange = function (bills) {
  let fives = 0;
  let tens = 0;

  for (let i = 0; i < bills.length; ++i) {
    const bill = bills[i];
    if (bill === 5) {
      fives += 1;
    } else if (bill === 10) {
      tens += 1;
      fives -= 1;
    } else if (tens > 0) {
      tens -= 1;
      fives -= 1;
    } else {
      fives -= 3;
    }
    if (fives < 0) {
      return false;
    }
  }

  return true;
};
