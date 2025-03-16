/**
 * @param {number[]} height
 * @return {number}
 */
var maxArea = function (height) {
  /*
left pointer at 0
right pointer at last
calculate area of the rectangle
update max area

now we need to move a pointer
pointer that points to a lower bar should be moved
    */

  let left = 0;
  let right = height.length - 1;
  let maxArea = 0;

  while (left < right) {
    const w = right - left;
    const h = Math.min(height[left], height[right]);

    const area = w * h;

    if (area > maxArea) {
      maxArea = area;
    }

    if (height[left] < height[right]) {
      left += 1;
    } else {
      right -= 1;
    }
  }

  return maxArea;
};

/*
    tc: O(n)
    sc: O(1)
*/
