/**
 * @param {number[]} nums
 * @return {number}
 */
var findDuplicate = function (nums) {
  let slow = nums[0];
  let fast = nums[0];

  // fast: is valid index? !!nums[fast]
  // fast.next: is valid index? !!nums[nums[fast]]

  // first, find the loop
  while (nums[fast] && nums[nums[fast]]) {
    slow = nums[slow];
    fast = nums[nums[fast]];

    // we have found a loop, now find the start of the loop
    if (slow === fast) {
      break;
    }
  }

  // reset slow to the start
  // now move both with the speed of 1 until they meet
  slow = nums[0];

  while (slow !== fast) {
    slow = nums[slow];
    fast = nums[fast];
  }

  return slow;

  /* the following solution alters the array so it's not allowed */
  // for (let i = 0; i < nums.length; ++i) {
  //     let expected = i + 1;
  //     let actual = nums[i];

  //     while (actual !== expected) {
  //         const actualIdx = actual - 1;
  //         const temp = nums[actualIdx];

  //         // we want to put actual at it's proper index actualIdx
  //         // we need to check if there is already the same number
  //         // in this case we found a duplicate
  //         if (temp === actual) {
  //             return actual;
  //         }

  //         nums[actualIdx] = actual;
  //         nums[i] = temp;

  //         actual = nums[i];
  //     }
  // }
};

/*
REACTO

Repeat
given an array of integer nums with n+1 integers where each iteger [1,n]
return the only one repeated number using O(1) space, without modifying the input

Example
so if we have 11 integers, each integer will be [1,10]
so 1,2,3,4,5,6,7,8,9,10, and one repeated

Approach
two pointers?


if we have len=11
integer 1 should be at index 0
integer 10 should be at index 9

[1,3,4,2,2]
index 0 should contain 1 (check)
move forward
index 1 should contain 2 (contains 3)
    take 3, put it to 2, 
    take 4, put it to 3,
    take 2, put it to 1
[1,2,3,4,2]
index 2 should cointain 3 (check)
index 3 should contain 4 (check)
index 4 should contain 5 (wrong)

non-altering approach
[1,3,4,2,2]

is it like a linked list
index 0 .next is index 0
index 1 .next is index 2
    index 2 .next is index 3
    index 3 .next is index 1

(1) (3)->(4)->(2) 




*/
