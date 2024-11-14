/**
 * @param {string[]} products
 * @param {string} searchWord
 * @return {string[][]}
 */
var suggestedProducts = function (products, searchWord) {
  products.sort();
  const trie = new Trie();
  products.forEach((product) => trie.insert(product));
  return trie.search(searchWord);
};

class Trie {
  root = {
    searchWords: [],
    children: {},
  };

  insert(word) {
    let current = this.root;
    for (let i = 0; i < word.length; ++i) {
      const char = word[i];
      if (!current.children[char]) {
        current.children[char] = {
          searchWords: [],
          children: {},
        };
      }
      current = current.children[char];
      if (current.searchWords.length < 3) {
        current.searchWords.push(word);
      }
    }
  }

  search(word) {
    let result = [],
      node = this.root;
    for (let i = 0; i < word.length; i++) {
      let char = word[i];
      if (!node.children[char]) {
        let temp = Array(word.length - i).fill([]);
        return [...result, ...temp];
      } else {
        node = node.children[char];
        result.push([...node.searchWords]);
      }
    }
    return result;
  }
}
