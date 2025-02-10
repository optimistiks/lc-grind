/**
 * @param {string[]} tokens
 * @return {number}
 */
var evalRPN = function (tokens) {
  /*
    iterate tokens
    check if token is an operator
         if yes
             pop 2 times from stack (a and b)
             perform operation on a and b
             push result to stack
         if no
             push to stack
     at the end we should have one element in the stack, which is the result
    */

  const stack = [];

  const operations = {
    "+": (a, b) => a + b,
    "-": (a, b) => a - b,
    "*": (a, b) => a * b,
    "/": (a, b) => Math.trunc(a / b),
  };

  for (const token of tokens) {
    if (!operations[token]) {
      stack.push(token);
    } else {
      const b = Number.parseInt(stack.pop());
      const a = Number.parseInt(stack.pop());
      stack.push(operations[token](a, b));
    }
  }

  return Number.parseInt(stack.pop());
};

/*
tc: O(n) iterate input once, push pop O(1)
sc: O(n) stack could have all the input stored in it
*/
