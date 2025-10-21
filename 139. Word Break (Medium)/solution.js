/**
 * @param {string} s
 * @param {string[]} wordDict
 * @return {boolean}
 */
var wordBreak = function (s, wordDict) {
  /* Top down with memo
    const set = new Set(wordDict)
    const cache = new Map()
    const check = (i) => {
        if (cache.has(i)) {
            return cache.get(i)
        }
        let result = false
        if (i < s.length) {
            for (let word of set) {
                if (s.slice(i, i + word.length) === word && check(i + word.length)) {
                    result = true
                }
            }
        } else {
            result = true
        }
        cache.set(i, result)
        return result
    }
    return check(0)
    */

  /* Bottom up */
  const set = new Set(wordDict);
  const dp = Array.from({ length: s.length + 1 }, () => false);
  dp[s.length] = true;

  for (let i = s.length - 1; i >= 0; --i) {
    for (let word of set) {
      const startsWith = s.startsWith(word, i);
      dp[i] = dp[i] || (startsWith && dp[i + word.length]);
    }
  }

  return dp[0];
};

/*

if check answers the question
does string starting from index i segment?
what would be our dp table

maybe we could start from the end
so if s.length = 8
dp[8] is true
then at 7
iterate words, and slice from 7 to the word length

*/
