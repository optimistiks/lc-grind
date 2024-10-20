/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {string[]}
 */
var wordBreak = function (s, wordDict) {
  // so the idea of the bottom up solution is
  // that we have a 2d dp array,
  // where dp[i] is an array of all possible sentences that can be formed from an ith prefix of s
  // where ith prefix of s is a substring of s from index 0 to index i [0, i)
  // we also add a 0th element to the dp which is an "empty string" prefix,
  // with the value of [""], since the only sentence you can make out of an empty string is an empty string
  const dp = Array(s.length + 1)
    .fill()
    .map(() => []);
  dp[0] = [""];
  // now we are going to iterate prefixes of s
  // (first char, then first two chars, then first 3 chars, etc)
  for (let i = 1; i <= s.length; ++i) {
    const prefix = s.slice(0, i);
    const prefixSentences = [];
    // next we are going to iterate suffixes of prefix
    // so if our prefix is "vega" we need to check "vega", "ega", "ga", "a"
    for (let j = 0; j < prefix.length; ++j) {
      const suffix = prefix.slice(j);
      // now we need to check if our suffix of the prefix is one of the words
      for (let w = 0; w < wordDict.length; ++w) {
        const word = wordDict[w];
        if (suffix === word) {
          // if our suffix is the actual word, what we need to do is
          // we need to take solution of the previous subproblem
          // which is going to be "all sentences that can be build with prefix"
          // where prefix is what's remaining to the left of the suffix
          // so if our prefix is "vega" (i=4), and we're currently checking suffix "ga" (j=2)
          // and "ga" is a valid word, we need to take all sentences that can be formed with prefix "ve"
          // that solution will be at dp[2] because "ve" is a prefix at [0, 2)
          prefixSentences.push(
            ...dp[j].map((sentence) => (sentence + " " + word).trim())
          );
        }
      }
    }
    dp[i] = prefixSentences;
  }
  return dp[s.length];
};

// tc:
// outer loop: runs s.length times
// first inner loop: runs at most s.lengh times (so already n*n ?)
// second inner loop runs w times
// third inner loop (map) - runs "number of sentences in a solution" times
// number of sentences in a solution = 2^n (the number of valid sentences for each prefix doubles every time a character is added to the prefix)
// so overall it's O(n^2*(w+2^n))
// sc: O(2^n) because of the number of valid sentences
