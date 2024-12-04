/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function (nums, target) {
  /*
     loop over nums
     at each item
     I can get a value = target - item
     this is value that I need to find in the array
     so record [item] = true
     check if [target - item] is true
     but what if duplicate
     [3,3]
     */
  const map = new Map();
  for (let i = 0; i < nums.length; ++i) {
    const num = nums[i];
    if (map.has(target - num)) {
      return [map.get(target - num), i];
    }
    map.set(num, i);
  }
};

/*
 map O(n) memory
 loop O(n) time
  */
