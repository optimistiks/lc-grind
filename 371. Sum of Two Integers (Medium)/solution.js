/**
 * @param {number} a
 * @param {number} b
 * @return {number}
 */
var getSum = function (a, b) {
  // if we imagine binary addition
  // we write 0 when there is 0-0 or 1-1 (because carry), otherwise 1
  // it is XOR
  // to handle carry, we use AND
  // because we carry 1 when there is 1-1, otherwise 0
  // but carry 1 means one goes one position to the left
  // so we do zero fill left shift once
  // then we combine XOR and AND result to get the final sum
  // and we check if we still have a carry we need to handle
  let result = a ^ b;
  while (a & b) {
    const carry = (a & b) << 1;
    a = result;
    b = carry;
    result = a ^ b;
  }
  return result;
};
