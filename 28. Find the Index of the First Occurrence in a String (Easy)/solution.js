/**
 * @param {string} haystack
 * @param {string} needle
 * @return {number}
 */
var strStr = function (haystack, needle) {
  let hPtr = 0;
  let nPtr = 0;

  while (hPtr < haystack.length) {
    let temp = hPtr;

    while (nPtr < needle.length && haystack[hPtr] === needle[nPtr]) {
      hPtr += 1;
      nPtr += 1;
    }

    if (nPtr === needle.length) {
      return temp;
    } else {
      nPtr = 0;
      hPtr = temp + 1;
    }
  }

  return -1;
};

/*
REACTO

Repeat
input: two strings: needle, haystack
return integer
    index of the first occurrence of needle in haystack
    -1 if not found

can we use two pointers?
needlePtr=0
haystackPtr=0

if match, move both

if mismatch

or I could split the initial string into pieces of needle.length, and store them in a hash map

*/
