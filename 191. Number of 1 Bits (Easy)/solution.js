/**
 * @param {number} n
 * @return {number}
 */
var hammingWeight = function (n) {
  // we do n & (n-1) until n is 0
  // for example n is 10 (1010)
  // n-1 is 9 (1001)
  // n & (n-1) is 10 & 9, is 8 (1000)
  // so we got rid of one 1
  // now n is 8 (1000)
  // n-1 is 7 (0111)
  // n & (n-1) is 8 & 7, is 0 (0000)

  console.log(n);
  let count = 0;
  while (n !== 0) {
    n &= n - 1;
    count += 1;
  }

  return count;
};
