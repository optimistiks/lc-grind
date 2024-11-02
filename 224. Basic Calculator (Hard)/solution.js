/**
 * @param {string} s
 * @return {number}
 */
var calculate = function (expression) {
  // so we have a stack, and an expression which is a string
  // we iterate one character from the expression at a time

  // so we need a variable (current number) and another (result) and another (sign)
  // and a stack

  const stack = [];
  let currentNumber = "";
  let sign = 1;
  let result = 0;

  for (const char of expression) {
    if (/\+|\-/.test(char)) {
      // we encountered a sign
      // before changing the sign variable,
      // compute the left part of expression with the currently active sign
      // left part means "currentNumber"
      // and update result
      // currentNumber should not be empty string
      // current number should be set to empty string after the calculation
      if (currentNumber !== "") {
        result += Number.parseInt(currentNumber) * sign;
      }
      currentNumber = "";
      sign = char === "-" ? -1 : 1;
    }
    if (/\(|\)/.test(char)) {
      // if we encounter open bracket
      // push current result and sign to stack
      // reset sign and result
      if (char === "(") {
        stack.push([result, sign]);
        currentNumber = "";
        sign = 1;
        result = 0;
      }

      // if we encounter a closing bracket
      // do we have a current number? compute result in brackets
      // pop from stack
      // combine result and sign from stack with the brackets result
      if (char === ")") {
        if (currentNumber !== "") {
          result += Number.parseInt(currentNumber) * sign;
        }
        currentNumber = "";
        sign = 1;
        const [prevResult, prevSign] = stack.pop();
        result = prevResult + result * prevSign;
      }
    }
    if (/\d/.test(char)) {
      currentNumber += char;
    }
  }

  if (currentNumber !== "") {
    result += Number.parseInt(currentNumber) * sign;
  }

  return result;
};
