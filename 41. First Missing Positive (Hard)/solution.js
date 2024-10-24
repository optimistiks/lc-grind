/**
 * @param {number[]} nums
 * @return {number}
 */
var firstMissingPositive = function (nums) {
  // we're going to apply cyclic sort
  // we only apply it to items between 1 and n, to keep the O(n)
  // we ignore items that are less than 0, as well as items that are greater than nums.length
  // this way we will place items in a way that value === index - 1
  // so item with value 1 will end up at index 0, value 2 at index 1 and so on
  // so after we do that, it will be easy to find the first missing positive element
  // it will be the first case when value !== i-1 (the missing value will be i+1)
  // so for example we end up with an array [1,2,-5,4]
  // 1 === 0+1, 2 === 1+1, -5 !== 2+1
  // first mismatch is at index 2, we should have value 3 at index 2, not -5
  let i = 0;
  const n = nums.length;

  while (i < n) {
    const value = nums[i];
    const indexOfValue = i;
    const correctIndexOfValue = value - 1;

    const isValuePositive = value > 0 && value <= n;
    const isIndexCorrect = indexOfValue === correctIndexOfValue;
    const isValueAtCorrectIndexTheSame = value === nums[correctIndexOfValue];

    if (isValuePositive && !isIndexCorrect && !isValueAtCorrectIndexTheSame) {
      const tmp = nums[indexOfValue];
      nums[indexOfValue] = nums[correctIndexOfValue];
      nums[correctIndexOfValue] = tmp;
    } else {
      i += 1;
    }
  }

  // find first index with incorrect value
  const missing = nums.findIndex((element, index) => element !== index + 1);

  // edge case when there is no missing element found
  // it means that for every index in the array, a correct element is at that index
  // example of such array: [1,2,3,4,5]
  // in this case, the first missing positive element is the element that goes after the last
  // so in the example case, it will be value 6 (array.length + 1)
  if (missing === -1) {
    return nums.length + 1;
  }

  // convert index to missing value by adding 1
  return missing + 1;
};
