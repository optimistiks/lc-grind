class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }

  has(child) {
    return this.children.has(child);
  }

  get(child) {
    return this.children.get(child);
  }

  add(child) {
    this.children.set(child, new TrieNode());
    return this.children.get(child);
  }

  getChildrenList() {
    return Array.from(this.children.values());
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(word) {
    let curr = this.root;

    for (const letter of word) {
      if (!curr.has(letter)) {
        curr = curr.add(letter);
      } else {
        curr = curr.get(letter);
      }
    }

    curr.isWord = true;
  }

  search(word) {
    // usually each letter of the word
    // results in a single possible next node (where we will search for the next letter)
    // by introducing "."
    // we make it possible that we should consider every child of a node
    // and a following "."
    // will make it so we need to consider every child of every child
    // so "current" is not a node, but a list of N nodes
    /*
        we start at [root] (essentially single node)
        then if we meet ".", new "current" is [...root.children]
        then if we meet another "." new "current" is a flattened list of all children
        then if we meet a letter, we only leave nodes that have that letter
        */
    let curr = [this.root];

    for (const letter of word) {
      if (letter === ".") {
        curr = curr.flatMap((node) => node.getChildrenList());
      } else {
        curr = curr
          .filter((node) => node.has(letter))
          .map((node) => node.get(letter));
      }
    }

    return curr.length > 0 && curr.some((node) => node.isWord);
  }
}

var WordDictionary = function () {
  this.trie = new Trie();
};

/**
 * @param {string} word
 * @return {void}
 */
WordDictionary.prototype.addWord = function (word) {
  this.trie.add(word);
};

/**
 * @param {string} word
 * @return {boolean}
 */
WordDictionary.prototype.search = function (word) {
  return this.trie.search(word);
};

/**
 * Your WordDictionary object will be instantiated and called as such:
 * var obj = new WordDictionary()
 * obj.addWord(word)
 * var param_2 = obj.search(word)
 */

/*
approach: same as trie, but handle dots as in, iterate all?

*/
