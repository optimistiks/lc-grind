/**
 * @param {number[]} people
 * @param {number} limit
 * @return {number}
 */
var numRescueBoats = function (people, limit) {
  // sort people so lightest is on the left, heaviest is on the right
  people.sort((a, b) => a - b);

  // left pointer
  let light = 0;
  // right pointer
  let heavy = people.length - 1;
  // result
  let boats = 0;

  while (light <= heavy) {
    if (people[light] + people[heavy] <= limit) {
      // we can put both persons to boat
      boats += 1;
      // move both pointers
      light += 1;
      heavy -= 1;
    } else {
      // move just one person and move just heavy pointer
      boats += 1;
      heavy -= 1;
    }
  }

  return boats;
};
