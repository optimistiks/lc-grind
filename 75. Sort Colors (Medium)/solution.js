/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (colors) {
  let start = 0;
  let current = 0;
  let end = colors.length - 1;

  while (current <= end) {
    switch (colors[current]) {
      case 0: {
        const temp = colors[start];
        colors[start] = colors[current];
        colors[current] = temp;
        start += 1;
        current += 1;
        break;
      }
      case 1: {
        current += 1;
        break;
      }
      case 2: {
        const temp = colors[end];
        colors[end] = colors[current];
        colors[current] = temp;
        end -= 1;
        break;
      }
    }
  }
};
