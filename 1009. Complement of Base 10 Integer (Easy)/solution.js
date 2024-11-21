/**
 * @param {number} n
 * @return {number}
 */
var bitwiseComplement = function (n) {
  /*
 Calculate the number of bits required to store n. 
 We can get this by rounding down log2(n) and adding 1
 For example, 42 is 101010 (requires 6 bits)
 */
  let numBits = Math.floor(Math.log2(n)) + 1;
  if (numBits < 0) numBits = 1;
  /*
    Create a bit mask that we will XOR against.
    It should have the same number of bits, but all bits should be set to 1.
    So for 42, we will need 111111 (63)
    The formula is 2^numBits -1 1
    2^6 - 1 = 63
    */
  let mask = Math.pow(2, numBits) - 1;
  /*
    Flip all occurences of 0 into 1, and 1 into 0
    Because of how XOR works, and because we know our mask is all 1s,
    every 0 in the source number will become 1 (because 0 XOR 1 is 1)
    and every 1 in the source number will become 0 (because 1 XOR 1 is 0)
    */
  return n ^ mask;
};
