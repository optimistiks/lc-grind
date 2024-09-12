/**
 * @param {number} n
 * @return {boolean}
 */
var isHappy = function (n) {
  // initialize slow pointer with n
  let slow = n;
  // initialize fast pointer with sum of squares of digits of n
  let fast = sumOfDigits(n);

  // if fast === 1 we know n is happpy
  // if fast === slow we know n is not happy, there is a cycle
  while (fast !== 1 && fast !== slow) {
    // advance slow 1 step forward
    slow = sumOfDigits(slow);
    // advance fast 2 steps forward
    fast = sumOfDigits(sumOfDigits(fast));
  }

  return fast === 1;
};

function sumOfDigits(num) {
  let sum = 0;
  let digit = 0;
  let n = num;

  do {
    // extract last digit of the number n
    digit = n % 10;
    // extract the rest of the number n (without last digit)
    n = Math.floor(n / 10);
    // add square of last digit to num
    sum += Math.pow(digit, 2);
    // so we calculate the sum of squares of digits by going right to left
    // starting from the last digit
  } while (n > 0);

  return sum;
}
