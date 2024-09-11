/**
 * @param {string} s
 * @return {string}
 */
var reverseWords = function (sentence) {
  const arr = sentence.trim().replace(/ +/g, " ").split("");
  reverseBetween(arr, 0, arr.length);
  let start = 0;
  for (let i = 0; i < arr.length; ++i) {
    const char = arr[i];
    if (char === " ") {
      reverseBetween(arr, start, i);
      start = i + 1;
    } else if (i === arr.length - 1) {
      reverseBetween(arr, start, i + 1);
    }
  }
  return arr.join("");
};

function reverseBetween(array, from, to) {
  let left = from;
  let right = to - 1;
  while (left < right) {
    const tmp = array[left];
    array[left] = array[right];
    array[right] = tmp;
    left += 1;
    right -= 1;
  }
}
