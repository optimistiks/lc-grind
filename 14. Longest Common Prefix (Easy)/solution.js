/**
 * @param {string[]} strs
 * @return {string}
 */
var longestCommonPrefix = function (strs) {
  const trie = new Trie();
  strs.forEach((str) => trie.add(str));
  return trie.longestCommonPrefix();
};

class Trie {
  root = { isWord: false, children: {}, length: 0 };
  add(word) {
    let current = this.root;
    for (let i = 0; i < word.length; ++i) {
      const char = word[i];
      if (!current.children[char]) {
        current.children[char] = { isWord: false, children: {}, length: 0 };
        current.length += 1;
      }
      current = current.children[char];
    }
    current.isWord = true;
  }
  longestCommonPrefix() {
    let current = this.root;
    let prefix = "";
    while (!current.isWord && current.length === 1) {
      const key = Object.keys(current.children)[0];
      prefix += key;
      current = current.children[key];
    }
    return prefix;
  }
}
