/**
 * @param {number[]} numbers
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (numbers, target) {
  let left = 0;
  let right = numbers.length - 1;

  while (left < right) {
    const sum = numbers[left] + numbers[right];
    if (sum > target) {
      // we need to reduce the sum by moving the right pointer left
      right -= 1;
    } else if (sum < target) {
      // we need to increase the sum by moving the left pointer forward
      left += 1;
    } else {
      return [left + 1, right + 1];
    }
  }
};

/*
tc: O(n)
sc: O(1)
*/

/*
REACTO

Repeat
we are given a 1-indexed array of integers, osrted in non-decreasing order
find two numbers that add up to specific target

return the indices, added by one as a tuple

Example

[2,3,4] target=6
items are 2 and 4 at indexes 0 and 2
result is [1,3]

Approach

left at first element
right at last element

sum left and right

if sum greater than the target
    we dont' need to move the left pointer. moving the left pointer forward will increase the sum, because of the sorted array
    we need to move the right pointer, reducing the sum
if sum less than the target
    we dont need to move the right pointer, it will decrease the sum
    move the left pointer to increase the sum
move pointers until they meet or until we reach sum

Code
*/
