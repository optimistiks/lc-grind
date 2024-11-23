/**
 * @param {number[]} nums
 * @return {number[]}
 */
var findDisappearedNumbers = function (nums) {
  let i = 0;
  // apply cyclic sort
  while (i < nums.length) {
    // we are at current index i
    // we know that the value at nums[i]
    //      is supposed to be at index nums[i] - 1
    const curPos = i;
    const expectedPos = nums[i] - 1;
    // if it is true (current position equals to expected position)
    // we just move i forward
    if (curPos === expectedPos) {
      i += 1;
    } else {
      // if current position is not expected position
      // first we check for a duplicate
      // a duplicate is when there is already a value at the expected position
      // that is the same as the value at current position
      // swapping them will lead to nothing, so we just move i forward
      if (nums[expectedPos] === nums[curPos]) {
        i += 1;
      } else {
        // otherwise we swap the values at current and expected position
        // and we don't move i forward
        // so on the next iteration we check this swapped number for it's correct position
        const temp = nums[expectedPos];
        nums[expectedPos] = nums[curPos];
        nums[curPos] = temp;
      }
    }
  }

  const result = [];

  for (let i = 0; i < nums.length; ++i) {
    const curNum = nums[i];
    const expectedNum = i + 1;
    if (curNum !== expectedNum) {
      result.push(expectedNum);
    }
  }

  return result;
};
