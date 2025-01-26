/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
  /*
    so if we just go through the string one by one
    if we see an opening bracket, we add it to a stack
    if we see a closing bracket, we don't add it to the stack,
    instead, we pop from the stack, and compare the two brackets,
    they should form a matching pair
    if they don't, the string is invalid
    */
  const pairs = {
    "{": "}",
    "[": "]",
    "(": ")",
  };

  const stack = [];

  for (const bracket of s) {
    if (pairs[bracket]) {
      // push opening bracket
      stack.push(bracket);
    } else {
      // take previous bracket from the stack (should be opening)
      const otherBracket = stack.pop();
      // compare the matching closing bracket of the bracket from the stack
      // with the current bracket (that should be closing)
      if (pairs[otherBracket] !== bracket) {
        return false;
      }
    }
  }

  return stack.length === 0;
};

/*
both TC and SC is O(n)
*/
