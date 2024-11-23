/**
 * @param {string} s
 * @return {number}
 */
var minFlips = function (s) {
  // So we have string s of length n, it consists of 1s and 0s.
  // We need to make this string alternating in a minimum number of type-2 ops.
  // The number of type-1 ops doesn't matter.
  // There are only 2 possible alternating strings of length n.
  // For example, for length 6, those strings are:
  // 101010
  // and
  // 010101
  // How do we determine the number of type-2 ops required to turn
  //      the initial string into one of the alternating?
  // So the type-2 op is to flip any character.
  // We need to flip a character if it's different from a character
  //      on the same position in the resulting alternating string.
  // Which means, the number of flips required is the number of differences.
  // So if we have a string 111000, and we want to turn it into 101010 and 010101,
  //      we need to compare them
  //  111000
  //      vs
  //  101010
  //  010101
  // Okay so now we need to perform a type-1 operation. The string 111000 will become 110001.
  // Now we again need to count the number of differences. The resulting string did not change,
  //      because the length did not change. So we need to turn 110001 into 101010.
  // So we took string 111000 and moved [1]11000 to the end 11000[1],
  //      the part that did not change is [11000]1,
  //      on the previous step we've already compared 11000 to 01010 and 10101,
  //      so this time we extend the alternating strings to have them lined up, so we don't have to recalculate the number of differences for 11000
  //      (in square brackets those are the digits that were there on the previous step but now they are not there)
  //  [1]110001
  //      vs
  //  [1]010101
  //  [0]101010
  // This trick allows us to reduce the time complexity from n^2 to n, because for each type-1 op we don't need to recalculate the whole string,
  // we just need to subtract the difference for the removed character, and add a difference for the appended character
  // Another trick is, to represent all possible type-1 op applications, we just take the whole string s and append it to the end of itself.
  // So if we have string s = 111000, we will actually work with 111000111000. Because if we take string s of length n, and apply the type-1 operation n times, we will get the string s again.
  // Same with two alternating strings, we make their length 2*n, so it lines up with the doubled s string.

  // save the length of the original string
  const n = s.length;
  // double the initial string (to account for all possible type-1 operations)
  s = s + s;

  // initialize two alternating strings (because for any string of length n, there can be only 2 alternating strings of length n)
  let alt1 = "";
  let alt2 = "";
  for (let i = 0; i < n * 2; ++i) {
    alt1 += i % 2 === 0 ? "0" : "1";
    alt2 += i % 2 === 0 ? "1" : "0";
  }

  // window left side pointer starts at 0
  let l = 0;
  // the number of differences with the first alternating string
  let diff1 = 0;
  // the number of differences with the second alternating string
  let diff2 = 0;
  // the result that we want to minimize
  let result = Number.POSITIVE_INFINITY;

  // move window right side pointer to the right
  for (let r = 0; r < n * 2; ++r) {
    if (s[r] !== alt1[r]) {
      // record the difference with alternating string 1
      diff1 += 1;
    }

    if (s[r] !== alt2[r]) {
      // record the difference with alternating string 2
      diff2 += 1;
    }

    if (r - l + 1 === n) {
      // at this point the length of the window is exactly n
      // and all the differences are accounted for
      // we update our result with the minimum of three
      result = Math.min(diff1, diff2, result);

      // now we need to move the left side pointer forward, so the window doesn't grow too large
      // but first we need to subtract the difference of the element at index l, if there was any
      if (s[l] !== alt1[l]) {
        // subtract the difference with alternating string 1
        diff1 -= 1;
      }

      if (s[l] !== alt2[l]) {
        // subtract the difference with alternating string 2
        diff2 -= 1;
      }

      // move the left side pointer forward
      // on the next iteration of the loop the right pointer will move to the right as well, and the window will be of size n again
      l += 1;
    }
  }

  return result;
};
