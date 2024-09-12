/**
 * @param {number[]} nums
 * @return {boolean}
 */
var circularArrayLoop = function (nums) {
  const move = (current, value) => {
    let next = current + value;

    // we can go out of bounds, it means we need to circle back to the start of the array
    // for example, array size=5, current=4(last element), value=3(3 steps forward), sum=7(index 7 out of bounds),
    // next=7 % 5=2 (we went to the start of the array and ended up on index 2 0-1-2)
    next = next % nums.length;

    // we can also go out of bounds from the left side
    // it means we need to circle back to the end of the array
    // for example, array size=5, current=4(last element), value=-11(11 steps backward),
    // sum=-7(go left 7 steps),
    // -7 % 5 = -2 (this will get rid of how many times we need to walk the array in full from right to left)
    // so we're kind of at index 0 now and we need to go 2 steps to the left
    // so we add size to get the index we need to end up on, -2 + 5 = 3
    // so we kind of circled back from index 4, then 3
    if (next < 0) {
      next += nums.length;
    }

    return next;
  };

  const isNoCycle = (index, prevDir) => {
    // no cycle if direction changed
    const curDir = nums[index] > 0;
    if (curDir !== prevDir) {
      return true;
    }

    // no cycle if loops on itself
    if (Math.abs(nums[index] % nums.length) === 0) {
      // cases when self loop
      // if nums[index] === 0
      // so 0 % any number === 0
      // if nums[index] === nums.size
      // it means we will make exactly nums.size steps and return to whence we came
      return true;
    }

    return false;
  };

  for (let i = 0; i < nums.length; ++i) {
    let slow = i;
    let fast = i;

    const forward = slow > 0;

    while (true) {
      slow = move(slow, nums[slow]);
      if (isNoCycle(slow, forward)) {
        // there are no cycle at current i
        // continue with the next i
        break;
      }

      fast = move(fast, nums[fast]);
      if (isNoCycle(fast, forward)) {
        // there are no cycle at current i
        // continue with the next i
        break;
      }

      fast = move(fast, nums[fast]);
      if (isNoCycle(fast, forward)) {
        // there are no cycle at current i
        // continue with the next i
        break;
      }

      // At any point, if fast and slow pointers meet each other,
      // it indicates that loop has been found, return true.
      if (slow === fast) {
        return true;
      }
    }
  }

  return false;
};
