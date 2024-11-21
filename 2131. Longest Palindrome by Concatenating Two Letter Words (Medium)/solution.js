/**
 * @param {string[]} words
 * @return {number}
 */
var longestPalindrome = function (words) {
  let length = 0;
  let central = false;

  const map = {};

  // count repeating words
  words.forEach((word) => {
    map[word] = (map[word] ?? 0) + 1;
  });

  Object.keys(map).forEach((word) => {
    // if this specific word is a palindrome?
    const isPalindrome = word[0] === word[1];
    if (isPalindrome) {
      // if yes, how many such words do we have
      if (map[word] % 2 === 0) {
        // we have even number of such words - we can use all of them in the final palindrome
        length += map[word];
      } else {
        // odd number of such words? we can use all of them except one,
        length += map[word] - 1;
        // and we can use the leftover word as a central part
        central = true;
      }
      // if this specific word is not a palindrome, it can only be part of the final palindrome,
      // if it's reverse is present
      // but to make sure we don't do this calculation twice (second time when we meet the reverse)
      // we do the gt than check (this way the logic will run for ab, but not for ba)
    } else if (word[1] > word[0] && map[word[1] + word[0]]) {
      // we know the reverse is present
      // we take the min count from the counts of word and it's reverse
      length += 2 * Math.min(map[word], map[word[1] + word[0]]);
    }
  });

  return length * 2 + (central ? 2 : 0);
};
