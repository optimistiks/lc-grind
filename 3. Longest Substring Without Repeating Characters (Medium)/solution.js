/**
 * @param {string} s
 * @return {number}
 */
var lengthOfLongestSubstring = function (s) {
  const set = new Set();
  let l = 0;
  let maxLen = 0;

  for (let r = 0; r < s.length; ++r) {
    if (!set.has(s[r])) {
      set.add(s[r]);
    } else {
      while (set.has(s[r])) {
        set.delete(s[l]);
        l += 1;
      }
      set.add(s[r]);
    }
    maxLen = Math.max(maxLen, r - l + 1);
  }

  return maxLen;
};

/*
tc: 
we have outer loop O(n)
inner loop
it makes at most n iterations spread across all iterations of outer loop
so O(2n) O(n)
sc: O(n) hash set

optimization: instead of a set with characters, keep a map char: index,
when duplicate is encountered, jump to map[duplicate] + 1 
(so skip all characters in range [L, index of duplicate])
*/

/*
REACTO

Repeat
given a string s
return a number
which indicates the length of the longest substring without duplicates

Example
"abcabcbb"
the longest substring without duplicates is "abc"

"bbbbb"
the longest substring without duplicates is b

Approach
start left=0, right=0
hash set

add 0 to hash set
move right forward right=1
str[1] not in hash set?
    add str[1] to hash set
    move right forward right=2

if we encounter some i where str[i] is already in a hash set
it means we have
[substring without duplicates][1st duplicate][the rest of the string]
 L                             R    

what if
substring without duplicates is length=2
then duplicate of s[0]
then the rest of the string without duplicates of length=5
the largest length will then be
the rest of the string 5
plus the duplicate char 6
plus the remainder of the first substring (minus the first char str[0] which is a duplicate) 7
total 7
if we just move L to R, we will get 6

so instead of just moving, what we can do?
move left pointer forward and remove the corresponding char from set
until we remove the duplicate
while set.has(s[r]) 
    set.delete(s[l])
    l += 1

we are considering substrings, not subsequences,
so it is safe to move L to R
we can't move L just forward +1 because
    it may not remove a duplicate
    if it does, it reduces the length of the string

pwwkew

l=0(p), r=0(p)
hash set []
add p to hash set [p]
move r forward

l=0(p), r=1(w)
hash set [p]
add w to hash set [p, w]
move r forward

l=0(p), r=2(w)
has set [p, w]
w already in the hash set!
move L to R, empty the hash set, add w, move right forward

l=2(w), r=3(k)

*/
