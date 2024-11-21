/**
 * @param {number} n - a positive integer
 * @return {number} - a positive integer
 */
var reverseBits = function (n) {
  let result = 0;

  for (let i = 0; i < 32; ++i) {
    // make room for new bit (adds 0 bit from the right)
    result = result << 1;

    // take rightmost bit from n
    // it will set all bits to 0, except for the last one, which will be set to 1 if it equals to 1 in n
    let rightMostBit = n & 1;

    // merge bits from rightMostBit and result
    result = rightMostBit | result;

    // add 0 bit from the left (drops the rightmost bit we've just processed)
    n = n >> 1;
  }

  return result >>> 0;
};
