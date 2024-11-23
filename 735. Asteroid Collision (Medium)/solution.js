/**
 * @param {number[]} asteroids
 * @return {number[]}
 */
var asteroidCollision = function (asteroids) {
  const result = [];

  for (let i = 0; i < asteroids.length; ++i) {
    let item = asteroids[i];

    while (
      result.length > 0 &&
      item !== null &&
      result[result.length - 1] > 0 &&
      item < 0
    ) {
      const sum = result[result.length - 1] + item;
      if (sum > 0) {
        // top of the stack won
        item = null;
      } else if (sum < 0) {
        // item won
        result.pop();
      } else {
        // both are destroyed
        result.pop();
        item = null;
      }
    }

    if (item !== null) {
      result.push(item);
    }
  }

  return result;
};
