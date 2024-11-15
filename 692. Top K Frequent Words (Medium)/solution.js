/**
 * @param {string[]} words
 * @param {number} k
 * @return {string[]}
 */
var topKFrequent = function (words, k) {
  // calculate word frequencies
  const freq = words.reduce((map, word) => {
    map.set(word, (map.get(word) ?? 0) + 1);
    return map;
  }, new Map());

  // create an array of buckets, where each index represents a frequency
  // max frequency that we can have is words.length
  // in order to have buckets[words.length] we need to set the buckets array length to words.length + 1
  // each bucket contains a trie
  const buckets = Array.from({ length: words.length + 1 }).map(
    () => new Trie()
  );

  // add words by frequency to the corresponding bucket
  words.forEach((word) => {
    buckets[freq.get(word)].add(word);
  });

  const result = [];

  // starting from the last bucket (most frequent) add words to result
  // so the way we have it, we have an array of buckets already sorted by frequency
  // and each bucket has a trie where words of the same frequency are sorted lexicographically
  for (let i = buckets.length - 1; i >= 0; --i) {
    if (result.length >= k) {
      break;
    }
    const words = [];
    buckets[i].dfs(buckets[i].root, "", words);
    result.push(...words);
  }

  return result.slice(0, k);
};

class TrieNode {
  constructor() {
    this.isWord = false;
    // the trick here is to have the trie children sorted lexicographically by default
    // we keep an array of children of length 26
    // and we calculate the index of a letter like this: "a".charCodeAt(0) - <ourLetter>.charCodeAt(0)
    // so for "a" it will equal to 0
    // and for "z" it will equal to 25
    // this way when we later run a dfs through the Trie
    // we will naturally encounter the words in a lexicographical order
    // we can reconstruct the letter from the index by doing String.fromCharCode("a".charCodeAt(0) + index)
    this.children = Array.from({ length: 26 });
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  // O(L) where L is the length of the word
  // O(W * L) for an array of words, where W is the number of words
  add(word) {
    let current = this.root;
    for (const char of word) {
      const code = char.charCodeAt(0) - "a".charCodeAt(0);
      if (!current.children[code]) {
        current.children[code] = new TrieNode();
      }
      current = current.children[code];
    }
    current.isWord = true;
  }

  //
  dfs(node, str, words) {
    if (node.isWord) {
      words.push(str);
    }
    node.children.forEach((item, index) => {
      if (item == null) {
        return;
      }
      const char = String.fromCharCode("a".charCodeAt(0) + index);
      this.dfs(item, str + char, words);
    });
  }
}
