function thirdMax(nums: number[]): number {
  // we're going to maintain an array of maximum elements (in descending order)
  // so max[0] is the maximum element, max[1] is the second maximum, and so on
  const max: number[] = [];
  for (let i = 0; i < nums.length; ++i) {
    // start iterating the numbers
    const item = nums[i];
    // start iterating our array of maximum elements (the length is constant, 3 in this case)
    for (let j = 0; j < 3; ++j) {
      const maxItem = max[j];
      if (maxItem === item) {
        // if we find the element in the maximum array, abort, we ignore duplicates
        break;
      } else if (maxItem == null) {
        // if the slot is null in the max array, insert the item and abort
        max[j] = item;
        break;
      } else if (item > maxItem) {
        // if our item is greater than our maximum element
        // shift all maximum elements to the right
        // we dont really care what happens past 3 (our maximum element quantity constant)
        for (let k = 3; k > j; --k) {
          if (max[k - 2] != null) {
            max[k - 1] = max[k - 2];
          }
        }
        // insert our maximum element to the position
        max[j] = item;
        break;
      }
    }
  }
  // the task is to return the third maximum element, and if there is no third, return the first maximum
  return max.length === 3 ? max[2] : max[0];
}
