/**
 * @param {number[]} arr
 * @param {number} k
 * @param {number} x
 * @return {number[]}
 */
var findClosestElements = function (nums, k, num) {
  // we are going to be searching for windows
  // this range indicates elements that can be first elements in a window
  // hence the last element in the range is length-k
  // so if a window starts from a last element in the range,
  // the window does not go out of bounds
  let searchRangeFirstElementIndex = 0;
  let searchRangeLastElementIndex = nums.length - k;

  while (searchRangeFirstElementIndex < searchRangeLastElementIndex) {
    // take our starting element of the first window as mid of the search range
    const windowFirstElementIndex =
      Math.floor(
        (searchRangeLastElementIndex - searchRangeFirstElementIndex) / 2
      ) + searchRangeFirstElementIndex;

    // get index of the first element that is outside of the window to the right
    const windowOutsideElementIndex = windowFirstElementIndex + k;

    // distance between target element and the start of the window
    const distanceOfNumToStart = num - nums[windowFirstElementIndex];
    // distance between target element and element outside of the window
    const distanceOfNumToOutside = nums[windowOutsideElementIndex] - num;

    if (distanceOfNumToOutside < distanceOfNumToStart) {
      searchRangeFirstElementIndex = windowFirstElementIndex + 1;
    } else {
      searchRangeLastElementIndex = windowFirstElementIndex;
    }
  }

  return nums.slice(
    searchRangeFirstElementIndex,
    searchRangeFirstElementIndex + k
  );
};
