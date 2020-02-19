/**
 * @param {number} num
 * @return {number}
 */
var numberOfSteps = function (num) {
  var steps = 0;
  while (num !== 0) {
    steps += 1;
    num % 2 === 0 ? (num /= 2) : (num -= 1);
  }
  return steps;
};
