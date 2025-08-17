/**
 * @param {string} s
 * @return {number}
 */
var numDecodings = function (s) {
  const memo = new Map();

  const rec = (i) => {
    if (memo.has(i)) {
      return memo.get(i);
    }

    if (i >= s.length) {
      return 1;
    }

    if (s[i] === "0") {
      return 0;
    }

    let ans = rec(i + 1);

    const dd = parseInt(`${s[i]}${s[i + 1]}`);

    if (dd >= 10 && dd <= 26) {
      ans += rec(i + 2);
    }

    memo.set(i, ans);

    return ans;
  };

  return rec(0);

  // // fill indexes 0 and 1 in dp
  // // index 1 in dp refers to index 0 in s
  // const dp = [1]
  // if (s[0] === "0") dp.push(0)
  // else dp.push(1)

  // for (let i = 2; i <= s.length; ++i) {
  //     // single digit decode
  //     // if this is a valid single digit,
  //     // the number of ways we decoded to previous char is the number of ways to decode to this char
  //     // hence dp.push(dp[i - 1])
  //     if (s[i - 1] === "0") dp.push(0)
  //     else dp.push(dp[i - 1])
  //     // double digit decode
  //     // if this char and a previous char is a valid double digit
  //     // combine it with the number of ways the up-to-previous-char substring was reached
  //     const dd = parseInt(`${s[i - 2]}${s[i - 1]}`)
  //     if (dd >= 10 && dd <= 26) dp[i] += dp[i - 2]
  // }

  // return dp[s.length]
};
