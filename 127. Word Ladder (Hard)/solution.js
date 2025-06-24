/**
 * @param {string} beginWord
 * @param {string} endWord
 * @param {string[]} wordList
 * @return {number}
 */
var ladderLength = function (beginWord, endWord, wordList) {
  const words = new Set(wordList);
  const visited = new Set();

  const queue = new Queue([[beginWord, 1]]);
  const start = "a".charCodeAt(0);
  const end = "z".charCodeAt(0);

  while (queue.size() > 0) {
    const [word, length] = queue.dequeue();

    if (word === endWord) {
      return length;
    }

    for (let index = 0; index < word.length; ++index) {
      for (let char = start; char <= end; ++char) {
        const candidate = word
          .split("")
          .toSpliced(index, 1, String.fromCharCode(char))
          .join("");
        if (words.has(candidate) && !visited.has(candidate)) {
          visited.add(candidate);
          queue.enqueue([candidate, length + 1]);
        }
      }
    }
  }

  return 0;
};

/*
REACTO

Repeat
given string beginWord
string endWord
wordList map of string: string

you can get from beginWord to endWord if you change one letter and the changed word is in wordList
return the length of the shortest transformation sequence, or 0 if not possible to transform

Example
if we have beginWord="hit"
we need to check words in wordList
we can try every letter from a to z at position 0
check if new word is in word list

Approach
so given a word, it only makes sense to replace the first letter with one of existing first letters
so maybe out of this wordList ["hot","dot","dog","lot","log","cog"]
you can do something like [[h,d,l,c],[o],[t,g]]

so enqueue begin word

dequeue word
get all candidates for pos 0
form a new word
exists in wordList? not visited?
enqueue new word
get all candidates for pos 1

Trie?
what if we build a trie out of wordList
then we take beginWord
    then we take letter at index 0
        replace letter with first child
            continue with the new word, index 1 and first child children
                base case: index out of bounds, either found or not found

*/
