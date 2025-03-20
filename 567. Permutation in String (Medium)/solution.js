/**
 * @param {string} s1
 * @param {string} s2
 * @return {boolean}
 */
var checkInclusion = function (s1, s2) {
  // solution that uses two frequency maps
  // one is frequency map of s1
  // the other is frequency map of sliding window of size s1.length in s2
  // keep track of matches count
  // if matches === 26 we found a valid substring
  // meaning all alphabet characters have equal frequencies in the current sliding window

  if (s1.length > s2.length) {
    return false;
  }

  const idx = (char) => {
    return char.charCodeAt(0) - "a".charCodeAt(0);
  };

  const s1Freq = Array(26).fill(0);
  const windowFreq = Array(26).fill(0);

  for (let i = 0; i < s1.length; ++i) {
    s1Freq[idx(s1[i])] += 1;
    // s2 is longer than s1
    // so first i positions in s2 is our initial sliding window of size s1.length
    windowFreq[idx(s2[i])] += 1;
  }

  let matches = 0;
  for (let i = 0; i < 26; ++i) {
    if (windowFreq[i] === s1Freq[i]) {
      matches += 1;
    }
  }

  console.log({ matches, windowFreq, s1Freq });

  let L = 0;

  // the initializing for loop stopped at index s1.length - 1
  // so our initial sliding window is [0, s1.length - 1]
  // continiue with the next index s1.length
  for (let R = s1.length; R < s2.length; ++R) {
    if (matches === 26) {
      return true;
    }

    // handle incrementing of R
    // increment frequency of the char pointed at by new R
    const charIdxR = idx(s2[R]);
    windowFreq[charIdxR] += 1;

    if (s1Freq[charIdxR] === windowFreq[charIdxR]) {
      // after incrementing we have equal values,
      // it means its a new match
      matches += 1;
    } else if (s1Freq[charIdxR] + 1 === windowFreq[charIdxR]) {
      // after incrementing, the value equals the opposite value + 1
      // it means we HAD a match, but we no longer have a match
      matches -= 1;
    }

    // handle incrementing of L
    // decrement frequency of char pointed at by L
    // because we are about to move L forward by 1
    // so that character will fall out of the sliding window
    const charIdxL = idx(s2[L]);
    windowFreq[charIdxL] -= 1;

    if (s1Freq[charIdxL] === windowFreq[charIdxL]) {
      // after decrementing, we have equal values
      // it means a new match
      matches += 1;
    } else if (s1Freq[charIdxL] - 1 === windowFreq[charIdxL]) {
      // if after decrementing, our value equals the opposing value - 1
      // it means there WAS a match
      matches -= 1;
    }

    L += 1;
  }

  return matches === 26;

  // my solution
  // seems like O(n), O(1)
  // because inner while loop only moves n times across all iterations of the outer loop
  // and hash map is O(26) at most

  /*
    const map = new Map();
    for (let i = 0; i < s1.length; ++i) {
        map.set(s1[i], (map.get(s1[i]) ?? 0) + 1);
    }

    let L = 0;

    for (let R = 0; R < s2.length; ++R) {
        const char = s2[R];

        if (!map.has(char)) {
            // R points at s2[R] and it does not exist in s1
            // it means we can discard everything between L and R
            // and move L to R + 1
            // but we need to restore frequencies first
            while (L < R) {
                map.set(s2[L], map.get(s2[L]) + 1);
                L += 1;
            }

            // now L is at R
            // we don't care about s2[R] because it doesnt exist in s1
            // but R will be moved forward at the next iteration of the for loop
            // so we move L forward manually

            L += 1
        } else {
            // s2[R] exists in s1
            // but we ran out of frequencies
            // move L forward until we get one frequency of s2[R] back
            while (map.get(char) === 0) {
                map.set(s2[L], map.get(s2[L]) + 1);
                L += 1;
            }

            map.set(char, map.get(char) - 1);

            // at any point if our window becomes of size s1, 
            // it means it is a valid window
            // because we extend it only in valid cases
            if (R - L + 1 === s1.length) {
                return true;
            }
        }
    }

    return false
    */
};

/*
REACTO

Repeat
given strings s1 s2
return boolean

true if s2 _contains_ a permutation of s1
otherwise false

permutation: all characters of s1, maybe in different order
s2 can contain other characters
so permutation of s1 is a substring of s2, not s2 itself

Example
s1 = "ab", s2 = "eidbaooo"
possibilities: ab, ba
s2 contains permutation of s1: "ba"

s1 = "oabid", s2 = "eidbaooo"
idbao is a valid permutation of oabid
idbao is contained in s2
true

Approach
we should probably make a set map of all characters in s1
so we can check if a character is in set in O(1)
a valid substring is 
    a substring of s2 where for each character of a substring set.has(char) is true

initialize L=0 R=0 (on s2)
if s2[R] not in set
    move both L and R L=1 R=1
if s2[R] is in set
    move R L=0 R=1

L=1 R=1
in set

L=1 R=2
in set

L=1 R=3
in set

how do we determine that we found one?
window size (R - L + 1) === s1.length
if true, return true

L=1 R=4
not in set

what should we do with L and R?
L=1 R=3 was valid, but not enough length
L=1 R=4 is invalid
everything before R=4 can be discarded, it seems

L=5 R=5

duplicate letters?
so we should have a map of frequencies?

ok so build map initally of char: frequency

L=0, R=0
s1[R] in map? decrement
L=0, R=1
s1[R] in map, >0? decrement

what if not in map, or freq is 0

is there a reason to shrink the window? probably not
is there a reason to increase the window, if window size === s1.size, probably not

so what if not in map
we can move R+=1 and L to R, because s2[R] does not exist in s1

what if in map, but frequency is 0
we need to move L forward until frequency is >0



*/
