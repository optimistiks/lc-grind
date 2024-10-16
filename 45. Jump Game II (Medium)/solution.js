/**
 * @param {number[]} nums
 * @return {number}
 */
var jump = function (nums) {
  if (nums.length === 1) {
    return 0;
  }

  // our current position in the array
  let current = 0;
  // the farthest index that is reachable from elements iterated up until now
  let farthest = 0;
  // number of jumps done
  let jumps = 0;

  // so for example nums[0] = 2
  // we can jump to nums[1] or nums[2]
  // we jump to nums[2]
  // but next we look at nums[1] and the value is 5
  // we should have jumpted to nums[1] right?
  // we can still pretend we did (jump=1), and now jump from nums[1]
  // so we jump as far as we can from current, but then still verify everything in between current and where we jumped to

  for (let i = 0; i < nums.length; ++i) {
    // index that is reachable from position i is the value in nums[i] plus i itself
    // we are tracking the maximum (farthest) index found so far
    // console.log(`we are at current=${current} farthest=${farthest}, we are looking at i=${i} from which we can reach ${i + nums[i]}`)
    farthest = Math.max(farthest, i + nums[i]);
    // if our iteration reached our position in the array, we need to make a jump
    if (i === current) {
      // console.log(`i reached current, jump to ${farthest}`)
      current = farthest;
      jumps += 1;
      if (farthest === nums.length - 1) {
        // we have reached the last element in the array
        break;
      }
    }
  }

  return jumps;
};
