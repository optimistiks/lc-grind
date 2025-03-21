/**
 * @param {string} s
 * @param {string} t
 * @return {string}
 */
var minWindow = function (s, t) {
  if (t.length > s.length) {
    return "";
  }

  // what if initial frequencies are frequencies of t
  // and when R moves forward and encounters a match we subtract
  // so a valid substring is when all keys are 0
  // when L moves forward, and leaves a match, we add
  // so lets say { A: 1, B: 1, C: 1 }
  // as R moves forward, we reach { A: 0, B: 0, C: 0 }
  // valid window
  // now start moving L forward (leaves A)
  // { A: 1, B: 0, C: 0}
  // invalid
  // now move R forward
  // encounters more B, but not A
  // { A: 1, B: -2, C: 0 }
  // the window has two more Bs than necessary
  // before: [A][C]YU[B]
  // after:     [C]YU[B]D[B]K[B]FG
  // if we have an A after
  // [C]YU[B]D[B]K[B]FG[A]
  // this would be a valid string, we can't shrink it anymore
  // so valid if no value is positive

  // so initial { A: 1, B: 1, C: 2 }
  // total=4
  // what if we subtract as we find matches
  // R found A, total=3
  // R found B, total=2
  // R found C, total=1
  // R found C, total=0 (valid) { A: 0, B: 0, C: 0 }
  // L left A, total=1 (invalid) { A: 1, B: 0, C: 0 }
  // R found another B, { A: 1, B: -1, C: 0 }, B is negative, dont update total
  // R found another B, { A: 1, B: -2, C: 0 }, B is negative, dont update total
  // R found A, { A: 0, B: -2, C: 0 }, total=0 (valid)
  // L left B, { A: 0, B: -1, C: 0 }, B is negative, don't update total
  // L left B, { A: 0, B: 0, C: 0 }, B is 0, don't update total
  // L left B, { A: 0, B: 1, C: 0 }, B is 1,  update total (total=1)

  // initialize frequency map of t, for example { A: 1, B: 1, C: 2 } for "ABCC"
  const tFreq = new Map();
  for (let i = 0; i < t.length; ++i) {
    const char = t[i];
    tFreq.set(char, (tFreq.get(char) ?? 0) + 1);
  }

  // total amount of characters to match, counting duplicates as well
  let total = t.length;

  // max window size is s.length, we have to minimize it
  let minSize = null;
  let minLR = null;

  let L = 0;
  for (let R = 0; R < s.length; ++R) {
    const char = s[R];

    // if char is present in t
    if (tFreq.has(char)) {
      // we just found a character "char" that exists in t
      // if we haven't yet found all characters "char"
      // reduce total by one, indicating that we need to find one less character in total
      // what if we found all "char", but keep finding them?
      // what if we found all C from ABCC but there are more that keep coming?
      // we don't reduce total, because those extra C don't affect the validity of the window
      // it may contain more than two C, but not less
      // however we will keep decrementing their frequency, so tFreq["C"] may be negative
      // this is to keep track of them when they leave the window
      // so we can increment total back to 1 when there is only one C left
      if (tFreq.get(char) > 0) {
        total -= 1;
      }
      tFreq.set(char, tFreq.get(char) - 1);
    }

    if (total === 0) {
      // the window is valid, we should try and minimize it now
      // we will be moving L forward while total remains 0
      // when some character that does not exist in t leaves the window, we don't do anything
      // when some character leaves that exists in t,
      //      we increment it's frequency
      //      if after incrementing, the frequency stays 0 or negative,
      //      we still have enough of that character in the window, so don't update total, the window is still valid
      //      but if after incrementing, the frequency goes to 1
      //      it means now we need to find one of that character to make window valid again
      //      so increment total by 1
      while (total === 0) {
        const lChar = s[L];

        if (tFreq.has(lChar)) {
          tFreq.set(lChar, tFreq.get(lChar) + 1);

          if (tFreq.get(lChar) > 0) {
            total += 1;
          }
        }

        L += 1;
      }

      // +2 because we've just invalidated the window
      // it was valid on a previous element, so instead of usual +1 we do +2
      const maybeNewMinSize = R - L + 2;
      if (minSize === null || maybeNewMinSize < minSize) {
        minSize = maybeNewMinSize;
        minLR = [L - 1, R + 1];
      }
    }
  }

  if (minSize === null) {
    return "";
  }

  return s.slice(minLR[0], minLR[1]);
};

/*
REACTO

Repeat
input: two strings, s (length m), t (length n)

return a substring of s
such that
every character in t, including duplicates, is included in the substring
the substring length should be minimum

Example
Input: s = "ADOBECODEBANC", t = "ABC"
substring "BANC" in is is of length 4, and it includes all letters of t

Approach
what's a brute force approach?
consider every substring of s
of every length from t.length to s.length
for every substring, check what characters it includes

what about frequency map of t
map { character: frequency }

L=0, R=0
if s[R] in t
    update frequency map
R=1
if s[R] in t
    update frequency map
move R forward until we find all characters of t

as soon as we found all, 
start minimizing window by moving L forward

and updating frequencies back if necessary
stop moving L forward when window is invalid
then start moving R forward again

so when R moves forward, and encounters a letter that is in t
it needs to decrement it's frequency (in the current window)
when left moves forward, it increments

we need a way to check if the window is valid

build a frequency map of t
build a frequency map of initial window of size t.length of s

for example, for t=ABC, s=ADOBECODEBANC it's 

ABC { A: 1, B: 1, C: 1, ...rest of the letters: 0 }
ADO { A: 1, B: 0, C: 0, ...rest of the letters: 0, O: 1 }

matches: 1 (A)

next window is ADOB
update frequency map with B


so for example our t is ABC, our window is ADOBEC
it's valid
start moving L forward
DOBEC
now it's invalid
start moving 

*/
