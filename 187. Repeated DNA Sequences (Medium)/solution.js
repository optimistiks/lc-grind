// how many distinct characters are used in the string (our constant for the hash function)
const a = 4;
// characters mapped to numbers to use in the hash function
const values = {
  A: 1,
  C: 2,
  G: 3,
  T: 4,
};

/**
 * @param {string} s
 * @return {string[]}
 */
var findRepeatedDnaSequences = function (s) {
  // k is the length of the substrings we are looking for
  const k = 10;

  const results = [];

  // hash the initial [0, k) substring
  let hash = hashStr(s.slice(0, k), k);

  // store hashes in a map
  // the value of false means we've seen the hash once before
  // the value of true means we've seen the hash twice and added it to result
  const map = {};

  // iterate from k to s.length inclusively, because we look at substrings like so [k, i)
  for (let i = k; i <= s.length; ++i) {
    // left side of the sliding window (inclusive)
    let left = i - k;

    // right side of the sliding window (exclusive)
    let right = i;

    // if we have a hash saved with the "false" value, it means it's been encountered before,
    // but hasn't been included into the output
    if (map[hash] === false) {
      // our current sliding window is [left, right).
      results.push(s.slice(left, right));
      // true means hash was seen twice and it was added to the output list
      map[hash] = true;
    }

    // add the hash to the map of seen hashes (if not yet added)
    if (map[hash] == null) {
      // false value means it's seen, but hasn't been added to the output list
      map[hash] = false;
    }

    // new character to be included into sliding window
    const char = s[right];

    // recompute our hash, s[left] is the first element of the current sliding window
    // we're going to subtract it from the hash since this element will be leaving the window
    // and we will add the s[right] hash since it's the new element to be in the window
    hash = recomputeHash(hash, char, s[left], k);
  }

  return results;
};

/*
Polynomial rolling hash
H = (c1 * a^k-1) + (c2 * a^k-2) + ... + (ci * a^k-i) + ... + (ck-1 * a^1) + (ck * a^0)
"a" is some constant that is greater or equal to the number of possible unique nucleodites
"c1 ... ck" are the characters in the sequence
"k" is the substring length
*/

function hashChar(char, k, i) {
  return values[char] * Math.pow(a, k - i);
}

function hashStr(str, k) {
  let hash = 0;
  for (let i = 0; i < str.length; ++i) {
    hash += hashChar(str[i], k, i + 1);
  }
  return hash;
}

function recomputeHash(hash, add, remove, k) {
  // let's say the hash is Hash(AC) = Hash(A) + Hash(C)
  // and our nucleodites have numbers assigned
  // A=1 C=2 G=3 T=4
  // Hash(A) + Hash(B) = (1 * 4^1) + (2 * 4^0) = 6
  // Now lets say our sequence is changed from AC to CT
  // we need to properly recalculate our hash,
  // so that H(C) is accounted for as (2 * 4^1) and not as (2 * 4^0) as it was accounted for in the initial sequence
  // so what we do is we subtract the removed character hash, Hash(AC) - Hash(A)
  // and we multiply the reuslt by "a", (Hash(AC) - Hash(A)) * a
  // this will make sure that the remaining Hash(C) is calculated as (2 * 4^1)
  // so the full formula for updating the hash is
  // with a=4
  // Hash(CT) = ((Hash(AC) - Hash(A)) * 4) * Hash(T)
  return (hash - hashChar(remove, k, 1)) * a + hashChar(add, k, k);
}
