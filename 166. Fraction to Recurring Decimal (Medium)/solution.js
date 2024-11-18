/**
 * @param {number} numerator
 * @param {number} denominator
 * @return {string}
 */
var fractionToDecimal = function (numerator, denominator) {
  // dividend / numerator - делимое
  // divisor / denominator - делитель
  // quotient / ration - частное
  if (numerator === 0) {
    return "0";
  }

  let result = "";

  if ((numerator < 0) ^ (denominator < 0)) {
    result = "-";
    numerator = Math.abs(numerator);
    denominator = Math.abs(denominator);
  }

  const quotient = numerator / denominator;
  let remainder = (numerator % denominator) * 10;

  result += toInteger(quotient).toString();

  if (remainder === 0) {
    return result;
  }

  result += ".";

  const map = {};

  while (remainder != 0) {
    const remainderStr = String(remainder);

    if (map[remainderStr]) {
      const remainderLen = map[remainderStr];
      const left = result.substring(0, remainderLen);
      const right = result.substring(remainderLen, result.length);
      result = left + "(" + right + ")";
      return result;
    }

    map[remainderStr] = result.length;
    const quotient = remainder / denominator;
    result += toInteger(quotient).toString();
    remainder = (remainder % denominator) * 10;
  }

  return result;
};

function toInteger(x) {
  x = Number(x);
  return x < 0 ? Math.ceil(x) : Math.floor(x);
}

/*
tc: O(pd) 
where pd is the lowest denominator we can get after simplifying the expression numerator/denominator
for example, for 8/666 pd=333, for 593/17 pd=17

This is because we will encounter at most pd remainders in our calculations, and therefore, 
pd iterations of the loop will be completed in the worst case.
*/
