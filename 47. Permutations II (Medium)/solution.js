/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var permuteUnique = function (nums) {
  const map = nums.reduce((acc, num) => {
    acc[num] = acc[num] ?? 0;
    acc[num] += 1;
    return acc;
  }, {});

  const result = [];
  const perm = [];

  const dfs = () => {
    // base case: perm length is nums length
    if (perm.length === nums.length) {
      result.push([...perm]);
      return;
    }
    // now we iterate through all options for our next item in perm
    // and continue dfs for each option
    Object.keys(map).forEach((num) => {
      if (map[num] === 0) {
        // we cannot consider num as our next item in perm,
        // because we used all of them already
        return;
      }
      map[num] -= 1;
      perm.push(parseInt(num));

      dfs();

      // backtrack by removing the num from the perm,
      // and by adding back it's available quantity
      map[num] += 1;
      perm.pop();
    });
  };

  dfs();

  return result;
};
