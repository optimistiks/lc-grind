/**
 * @param {number[][]} image
 * @return {number[][]}
 */
var flipAndInvertImage = function (image) {
  for (let i = 0; i < image.length; ++i) {
    const row = image[i];
    const mid = Math.floor((row.length + 1) / 2);
    for (let j = 0; j < mid; ++j) {
      const left = j;
      const right = row.length - 1 - j;

      const temp = row[left] ^ 1;

      row[left] = row[right] ^ 1;
      row[right] = temp;
    }
  }
  return image;
};
