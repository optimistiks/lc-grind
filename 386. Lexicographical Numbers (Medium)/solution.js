/**
 * @param {number} n
 * @return {number[]}
 */
var lexicalOrder = function (n) {
  const result = [];
  const trie = new Trie();
  for (let i = 1; i <= n; ++i) {
    trie.insert(i.toString());
  }

  printRec(trie.root, "", result);

  return result;
};

function printRec(node, word, result) {
  if (word) {
    result.push(Number.parseInt(word));
  }
  Object.keys(node.children).forEach((key) => {
    printRec(node.children[key], `${word}${key}`, result);
  });
}

class Trie {
  constructor() {
    this.root = new TrieNode();

    // inserting string in a trie
    this.insert = function (word) {
      let node = this.root;
      for (let cIdx = 0; cIdx < word.length; cIdx++) {
        let c = word[cIdx];
        if (!node.children[c]) {
          node.children[c] = new TrieNode();
        }
        // update the node as we move to the next character
        node = node.children[c];
      }
      // set isString as true when all the string characters have been added
      node.isString = true;
    };
  }
}

class TrieNode {
  constructor() {
    this.children = {};
    this.isString = false;
  }
}
