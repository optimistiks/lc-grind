/**
 * @param {number[]} nums
 * @return {number[]}
 */
var singleNumber = function (arr) {
  if (arr.length === 2) return arr;
  // first, we xor all the numbers
  // it will cancel out all duplicates
  // we will be left with distinct1 ^ distinct2 (let's call it distinctXOR)
  // this distinctXOR "on" bits indicate bits that are different in both numbers
  // at least 1 bit is different since those are distinct numbers
  // now we can differentiate the initial numbers by one of those bits that are "on" in distinctXOR
  // we can take any bit but the rightmost is easier
  // so how can we make a binary number where only the rightmost "on" bit in distinctXOR is "on"?
  // first we calculate distinctXOR-1 (it will turn the rightmost bit to 0, and all bits that follow to 1)
  // for example, (1010100 - 1) = 1010011
  // second we calculate distinctXOR & (distinctXOR-1) (it will leave only those bits "on" that are "on" in both distinctXOR and distinctXOR-1)
  // third we calculate (distinctXOR & (distinctXOR-1)) ^ distinctXOR (it will set all bits to 0 except for the rightmost "on" bit in distinctXOR)
  // let's call the result of the third step as mask
  // now we iterate the original numbers again,
  // and we initialize two variables b1 and b2 to 0,
  // and we xor the original numbers that have the mask bit "on" with b1,
  // and the numbers that have the mask bit "off" with b2
  // so in each variable we will cancel out the duplicates, and each variable will end up holding a distinct number
  // how do we understand with which variable to xor?
  // we do arr[i] & mask, a nonzero result would indicate that mask bit is "on" in the number,
  // a zero result would indicate that the mask bit is "off" in the number
  // O(n) time, O(1) mem

  const distinctXOR = arr.reduce((value, num) => value ^ num, 0);
  const mask = (distinctXOR & (distinctXOR - 1)) ^ distinctXOR;
  const distinct = arr.reduce(
    (values, num) => {
      if ((num & mask) > 0) {
        values[0] = values[0] ^ num;
      } else {
        values[1] = values[1] ^ num;
      }
      return values;
    },
    [0, 0]
  );

  return distinct;
};
