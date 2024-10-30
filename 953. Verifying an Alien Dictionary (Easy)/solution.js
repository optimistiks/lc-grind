/**
 * @param {string[]} words
 * @param {string} order
 * @return {boolean}
 */
var isAlienSorted = function (words, order) {
  const foundChars = {};

  for (let i = 0; i < order.length; ++i) {
    foundChars[order[i]] = i;
  }

  let exit = false;

  for (let i = 0; i < words.length - 1; ++i) {
    const wordA = words[i];
    const wordB = words[i + 1];

    const minLen = Math.min(wordA.length, wordB.length);

    let found = false;
    for (let j = 0; j < minLen; ++j) {
      const charA = wordA[j];
      const charB = wordB[j];

      if (charA !== charB) {
        found = true;
        // console.log('found first mismatch', charA, 'and', charB, 'when comparing', wordA, 'and', wordB)
        if (foundChars[charA] > foundChars[charB]) {
          exit = true;
        }
        break;
      }
    }

    if (!found && wordB.length < wordA.length) {
      // console.log('did not found mismatch', wordA, 'and', wordB)
      exit = true;
      break;
    }
  }

  if (exit) {
    return false;
  }

  return true;
};
