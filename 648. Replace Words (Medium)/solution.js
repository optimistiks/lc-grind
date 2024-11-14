/**
 * @param {string[]} dictionary
 * @param {string} sentence
 * @return {string}
 */
var replaceWords = function (dictionary, sentence) {
  const trie = new Trie();
  dictionary.forEach((word) => trie.insert(word));
  const newSentence = sentence
    .split(" ")
    .map((word) => trie.replace(word))
    .join(" ");
  return newSentence;
};

class Trie {
  constructor() {
    this.root = new TrieNode();
    // inserting string in a trie
    this.insert = function (word) {
      let node = this.root;

      // iterate over each character in the word we want to insert
      for (let cIdx = 0; cIdx < word.length; cIdx++) {
        let c = word[cIdx];
        // if the character doesn't belong to any child of the
        // current trie node, then create a new trie node for
        // this character as a child of the current node
        if (!node.children[c]) {
          node.children[c] = new TrieNode();
        }

        // move to the child of the current node
        // (either already present or just added)
        node = node.children[c]; // update the node as we move to the next character
      }
      // set flag endOfWord to TRUE to indicate we've reached
      // the end of inserted word
      node.endOfWord = true;
    };

    // this function replaces each word in the sentence with
    // the smallest word from the dictionary
    this.replace = function (word) {
      let curr = this.root;
      // iterate over each dictionary word along
      // with the index of that character
      for (let i = 0; i < word.length; i++) {
        let c = word[i];
        // if the character doesn't belong to the current node's children,
        // then return the word
        if (!curr.children[c]) return word;

        // move to the child of the current node
        // corresponding to the current character
        curr = curr.children[c];

        // when the flag endOfWord becomes TRUE, this means
        // we've reached the end of word in the trie. If this is the
        // case, then return this word
        if (curr.endOfWord) return word.substring(0, i + 1);
      }
      return word;
    };
  }
}

class TrieNode {
  constructor() {
    this.children = {};
    this.endOfWord = false;
  }
}
