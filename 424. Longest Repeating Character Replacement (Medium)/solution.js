/**
 * @param {string} s
 * @param {number} k
 * @return {number}
 */
var characterReplacement = function (s, k) {
  const freq = Array(26).fill(0);

  // the result: max length of window with at most k replacements
  let maxLen = 0;

  // we either
  // increase the sliding window size by moving R forward
  // move the whole window forward by moving both L and R
  // we never decrease the window size

  // max frequency of some character seen in the current window
  let maxFreq = 0;

  let L = 0;

  for (let R = 0; R < s.length; ++R) {
    // update frequency of the character pointed at by R
    const idx = getCharIdx(s[R]);
    freq[idx] += 1;

    // update max frequency seen in current [L, R] window
    maxFreq = Math.max(maxFreq, freq[idx]);

    // find length of the current window
    const len = R - L + 1;

    // if we subtract maxFreq from len
    // we get an amount of characters that are NOT the most frequent character
    // we can replace them all if their amount is less than or equal to k

    if (len - maxFreq <= k) {
      // if we can replace them all, we can consider this window as a result
      maxLen = Math.max(maxLen, len);
    } else {
      // we can't replace them all, we need to move left pointer forward,
      // to try and increase the max frequent character and reduce frequency of other characters
      freq[getCharIdx(s[L])] -= 1;

      // our maxFreq may become invalid at this point
      // but we don't update it here because we don't care about maxFreq decreasing or staying the same
      // we only want it to grow, and it will be covered by the right pointer freq increment
      L += 1;
    }
  }

  return maxLen;
};

function getCharIdx(char) {
  const idx = char.charCodeAt(0) - "A".charCodeAt(0);
  return idx;
}

/*
tc: O(n)
sc: O(n) or O(1) if we consider alphabet size to be constant
*/

/*
REACTO

Repeat
given string s, integer k
string s - uppercase English characters
k denotes the maximum allowed number of operations
operation: choose any character, change to any other uppercase character ()

return: 
the length of the longest substring that consists of the same letter,
after performing at most k operations (can be 0, can be k, but no more than k)

Example
s=ABAB k=2
we can perform 2 replacements,
so if we replace two A with two B, we get BBBB, 
result = 4

s=AABABBA k=1
we can perform at most 1 replacement
without replacements, AA or BB is the largest substring
we can either replace B at index 2 with A, so we get AAAA
or A at index 3 with B, so we get BBBB

Approach
maybe we shouldn't simulate replacements at all
maybe we should count frequencies?
k means that we can decrease some frequency by k, while increasing some other frequency by k

AABBBCCCCD

A(0) - A(0)
A: 1
len=1

A(0) - A(1)
A: 2
len=2

A(0) - B(2)
A: 2
B: 1
len=3
len-maxFreq = 1
it means we have 1 other character
we can cover it with k
continue

A(0) - B(3)
A: 2
B: 2
len=4
len-maxFreq = 2
we can't cover it with k
start moving left pointer forward

A(1) - B(3)
A: 1
B: 2
len=3
len-maxFreq = 1
we have enough k

A(1) - B(4)
A: 1
B: 3
len=4
len-maxFreq = 2
not enough k

B(2) - B(4)
B:3
len=3
len-maxFreq = 0
no replacements needed

B(2) - C(5)
B:3
C:1
len=4
len-maxFreq = 1
enough k

B(2) - C(6)
B:3
C:2
len=5
len-maxFreq = 2
not enough

B(3) - C(6)
B:2
C:2
len=4
len-maxFreq=1
enough

B(3) - C(7)
B:2
C:3
len=5
len-maxFreq=2
not enough (move L)

B(4) - C(7)
B:1
C:3
len=4
len-maxFreq=1
enough (move R)

how do you express this in code
init l=0 r=0
increment freq
sometimes we don't move R
so while loop is better
when do we stop?
let's say R is at the last char
but L is at some other char
and we don't have enough K to cover replacements
we move L forward until we have enough
R stays at the last
we can allow L to reach the end too

what if we are at some L and R
where we can cover the replacements
and R is at the end

is there a need to move L without moving R?

AABBB k=1

A(0) - A(1)
move R, leave L

A(0) - B(2)
len=3 (new max len)
move R, leave L

A(0) - B(3)
len=4
not enough k
should we move L, or both L and R?
there is no point of moving just L, we will just be shrinking the window
moving both will reduce frequency of L and introduce a new character at R
a new character 


*/
