/**
 * @param {number[]} heights
 * @return {number}
 */
var largestRectangleArea = function (heights) {
  let maxArea = 0;

  // store indexes of bars in the stack
  // initialize it with -1 to handle left limits of rectangle areas
  const stack = [-1];

  // pop bar index from the stack,
  // calculate the area of a rectangle
  // with height equal to popped bar height,
  // and width equal to difference between left and right limits
  const calcArea = (rightLimit) => {
    const poppedBarIndex = stack.pop();
    const poppedBarHeight = heights[poppedBarIndex];

    const leftLimit = stack[stack.length - 1];

    const width = rightLimit - leftLimit - 1;

    const area = poppedBarHeight * width;

    if (area > maxArea) {
      maxArea = area;
    }
  };

  for (
    let currentBarIndex = 0;
    currentBarIndex < heights.length;
    ++currentBarIndex
  ) {
    const currentBarHeight = heights[currentBarIndex];
    // pop all heights from the stack that are larger than the current bar height
    // because we cannot continue those heights rightwards anymore
    while (currentBarHeight < heights[stack[stack.length - 1]]) {
      calcArea(currentBarIndex);
    }
    // now the stack has either just -1, or all heights there are lower than current height
    // push current height
    stack.push(currentBarIndex);
  }

  // we still may have some bars in the stack,
  // it just means that some of the last histogram rectangles are strictly increasing,
  // so right limit for all of those heights is index of the last bar + 1
  while (stack.length > 1) {
    calcArea(heights.length);
  }

  return maxArea;
};

/*
tc: it seems like inner loop makes just N pops across all iterations of the outer loop
so it's still O(n)?
sc: O(n)
*/
