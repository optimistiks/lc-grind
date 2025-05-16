/**
 * @param {string} digits
 * @return {string[]}
 */
var letterCombinations = function (digits) {
  const result = [];

  const mapping = {
    2: "abc",
    3: "def",
    4: "ghi",
    5: "jkl",
    6: "mno",
    7: "pqrs",
    8: "tuv",
    9: "wxyz",
  };

  const backtrack = (i, combo) => {
    if (i === digits.length) {
      if (combo.length > 0) {
        result.push(combo.join(""));
      }
      return;
    }

    const digit = digits[i];
    const letters = mapping[digit];

    for (const letter of letters) {
      combo.push(letter);
      backtrack(i + 1, combo);
      combo.pop();
    }
  };

  backtrack(0, []);

  return result;
};

/*
input:
    a string of digits each digit is from 2 to 9 incl
    a mapping of digits to letters
output:
    an array of strings, where each string is a string of letters,
    a possible representation of the input string

example: "23"
possible letter combos: ["ad", "ae", "af", "bd", "be", "bf", "cd", "ce", "cf"]

approach
we have n digits
for each digit we have 3 branches

so consider first letter for a digit, and continue
same for second and thiird
*/
