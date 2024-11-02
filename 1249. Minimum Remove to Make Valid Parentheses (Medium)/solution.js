/**
 * @param {string} s
 * @return {string}
 */
var minRemoveToMakeValid = function (s) {
  const split = s.split("");
  const stack = [];

  for (let i = 0; i < split.length; ++i) {
    const char = split[i];
    if (
      char === ")" &&
      stack.length > 0 &&
      stack[stack.length - 1][0] === "("
    ) {
      // if we encounter a closing bracket, but the top of the stack is opening bracket
      // then we dont add the closing one into the stack, and we pop the opening one off the stack
      // indicating that this is a valid bracket pair
      stack.pop();
    } else if (char === "(" || char === ")") {
      // otherwise we push a bracket with it's index into the stack
      stack.push([char, i]);
    }
  }

  for (const [_, index] of stack) {
    split[index] = "";
  }

  return split.join("");
};
