class TrieNode {
  constructor() {
    this.children = new Map();
    this.isWord = false;
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode();
  }

  add(word) {
    let curr = this.root;

    for (const letter of word) {
      if (!curr.children.has(letter)) {
        curr.children.set(letter, new TrieNode());
      }
      curr = curr.children.get(letter);
    }

    curr.isWord = true;
  }
}

/**
 * @param {character[][]} board
 * @param {string[]} words
 * @return {string[]}
 */
var findWords = function (board, words) {
  const visited = Array.from({ length: board.length }, () =>
    Array(board[0].length).fill(false)
  );

  const trie = new Trie();

  words.forEach((word) => {
    trie.add(word);
  });

  const result = new Set();

  const findWordRec = (node, x, y, word) => {
    if (visited[x][y]) return;

    if (node.isWord && !result.has(word)) {
      result.add(word);
    }

    visited[x][y] = true;

    const offsets = [
      [-1, 0],
      [1, 0],
      [0, 1],
      [0, -1],
    ];

    offsets.forEach((offset) => {
      const newX = x + offset[0];
      const newY = y + offset[1];

      if (board[newX] == null || board[newX][newY] == null) {
        return;
      }

      const letter = board[newX][newY];

      if (node.children.has(letter)) {
        findWordRec(node.children.get(letter), newX, newY, `${word}${letter}`);
      }
    });

    visited[x][y] = false;
  };

  for (let x = 0; x < board.length; ++x) {
    for (let y = 0; y < board[x].length; ++y) {
      const letter = board[x][y];

      if (trie.root.children.has(letter)) {
        findWordRec(trie.root.children.get(letter), x, y, `${letter}`);
      }
    }
  }

  return Array.from(result);
};

/*
REACTO

Repeat
Given m x n board of characters
and a list of words
return all words that exist on board

a word exists on board if it can be constructed from cells that are horizontally or vertically adjacent
and a cell can only be used once

Approach


trie: [b] -> [u] -> [s] -> [b] -> [e] -> [d]

find b in board at x,y
    recurse([b], x, y, "b")
        is [b] visited? no
        is [b] word? no
        mark [b] visited
        obtain 4 neighbors of x,y
        for each neighbor (let's say [u])
            does it exist in [b].children? 
            yes?
                recurse([u], x1, y1, "bu")
                    is [u] visited? no
                    is [u] word? no
                    mark [u] visited
                    obtain 4 neighbors of x1, y1 (let's say [s])
                        does it exist in [u].children? yes
                        recurse([s], x2, y2, "bus")
                            is [s] visited? no
                            is [s] word? (let's say yes? add it to result and continue)
                            mark [s] visited
                            obtain 4 neighbors of [s]
                            (let's say first neighbor is [b])
                            does exist in [s].children
                            recurse([b], x3, y3, "busb")
                                is [b] visited? YES,return
                            lets say another [b]
                            recurse([b], x4, y4, "busb")
                                ...fast forward
                                recurse([d], xK, yK, "busbed")
                                    is [d] visited? no
                                    is [d] word? yes, add to result
                                    nothing exists in [d].children
                            ... we are inside recurse([s], x2, y2, "bus") call
                            UNMARK [s] as visited


                    





so we have a trie with words
let's say we find the root letter of the trie at mxn
root letter have one child letter
we inspect mxn neighbors and find new mxn



can a trie be used?

we could build a trie out of words list

or,

let's say we are searching for bus
we  find a grid cell b
it has 4 neighboring cells
so it's like a trie node with 4 children
but a letter can be duplicates

what if we need to find a single word
- find first letter of the word in the grid
- look for second letter by checking neighbors of the first
- look for third letter by checking neighbors of the neighbors of the first
- we found a letter



*/
