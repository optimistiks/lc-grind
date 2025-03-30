/**
 * @param {number[]} nums1
 * @param {number[]} nums2
 * @return {number}
 */
var findMedianSortedArrays = function (nums1, nums2) {
  if (nums1.length > nums2.length) {
    return findMedianSortedArrays(nums2, nums1);
  }

  const totalLen = nums1.length + nums2.length;
  // we define left part (or left half) as the left side of the combined sorted array that contains the median (odd case)
  // or contains the first value of the median (even case)
  // for example, if our combined sorted array len is 11
  // left part is the first 6 elements (first 5 elements plus the 6th element, the median)
  // if our combined sorted array len is 12,
  // left part is the first 6 elements too (first 5 elements, plus the 6th element, one of the two median elements, 6th and 7th)
  const leftPartLen = Math.ceil(totalLen / 2);

  let L = 0;
  // R needs to be out of bounds
  // because it should be possible for our mid point to be right after the last element,
  // or right in front of the first element,
  // indicating that the whole array is in the left or right part, respectively
  let R = nums1.length;

  let iter = 0;

  while (L <= R) {
    const M = L + Math.floor((R - L) / 2);
    // nums[M] itself should go to the right part
    // so we don't do +1
    // for example [1(L=0),2,3,4(M=3),5,6] only 1,2,3 go to the left part, so len=M=3
    const len = M;
    // how many elements from the larger array should we include into the left part
    // if we need to include 3 more elements, the index in the larger array will be 3,
    // so elements 0,1,2 will be included
    const leftPartLenLeftover = leftPartLen - len;

    // nums1[M-1] is the last element of the left part of the smaller array
    // nums1[M] is the first element of the right part of the smaller array
    // nums2[leftPartLenLeftover - 1] is the last element of the left part of the larger array
    // nums2[leftPartLenLeftover] is the first element of the right part of the larger array

    // nums1[M-1] should be <= nums2[leftPartLenLeftover]
    // nums2[leftPartLenLeftover - 1] should be <= nums1[M]
    const smallerLeftHalfLast = nums1[M - 1] ?? Number.NEGATIVE_INFINITY;
    const smallerRightHalfFirst = nums1[M] ?? Number.POSITIVE_INFINITY;
    const largerLeftHalfLast =
      nums2[leftPartLenLeftover - 1] ?? Number.NEGATIVE_INFINITY;
    const largerRightHalfFirst =
      nums2[leftPartLenLeftover] ?? Number.POSITIVE_INFINITY;

    // console.log({ L, R, M, leftPartLen, len, leftPartLenLeftover });
    // console.log('in', nums2, 'split is at', leftPartLenLeftover, 'value', nums2[leftPartLenLeftover]);
    // console.log('in', nums1, 'split is at', M, 'value', nums1[M]);
    // console.log({ largerLeftHalfLast, largerRightHalfFirst  });
    // console.log({ smallerLeftHalfLast, smallerRightHalfFirst });

    if (smallerLeftHalfLast > largerRightHalfFirst) {
      // console.log('split is invalid', smallerLeftHalfLast, 'cannot be to the left of', largerRightHalfFirst);
      // last element of the left half in the smaller array is larger than the first element of the right half in the larger array
      // it means that last element must be in the right half
      // so we shift the search space to the left
      // console.log('element', smallerLeftHalfLast, 'must be in the right half')
      R = M;
    } else if (largerLeftHalfLast > smallerRightHalfFirst) {
      // console.log('split is invalid', largerLeftHalfLast , 'cannot be to the left of', smallerRightHalfFirst);
      // first element of the right half in the smaller array is less than last element of the left half in the larger array
      // so that first element must be in the left half
      // so we shift search space to the right
      // console.log('element', smallerRightHalfFirst, 'must be in the left half')
      L = M + 1;
    } else {
      // console.log('the split is valid');

      if (totalLen % 2 === 0) {
        // even case, we need larger of two elements at the end of each left half,
        // and smaller of two elements at the start of each right half
        const median =
          (Math.max(smallerLeftHalfLast, largerLeftHalfLast) +
            Math.min(smallerRightHalfFirst, largerRightHalfFirst)) /
          2;
        // console.log('median', median);
        return median;
      } else {
        // odd case
        // we just need larger of two elements at the end of each left half
        const median = Math.max(smallerLeftHalfLast, largerLeftHalfLast);
        // console.log('median', median);
        return median;
      }
    }
  }
};

/*
REACTO

Repeat
given:
    sorted integer array nums1 size m
    sorted integer array nums2 size n
return:
    median of two sorted arrays
complexity should be: O(log (m + n)) 
so complexity should be dominated by binary searching both arrays as one
constraints:
    m and n are relatively small <= 1000
    numbers themselves are huge

Example
nums1 = [1,3], nums2 = [2]
median is 2, merged array 1,2,3
nums1 = [1,2], nums2 = [3,4]
merged: 1,2,3,4 median: 2+3 / 2 = 2.5

Approach
find a valid split point

[1,2,3,4,6,8,11]
[5,7,9,10]
(merged=[1,2,3,4,5,6,7,8,9,10,11])

total len = 7+4 = 11
define left half as a half that contains the median value
11 / 2 = ceil(5.5) = len=6
(12 / 2 = ceil(6)) = len=6 (will contain first median value, second at +1)

Search smaller array (why?)

L=0(5) R=3(10)
M=1(7)
assume split point
[5,7,|9,10]
left half len is 6
so we need 4 more elements from the 1st array
index=3
[1,2,3,4,|6,8,11]
now we need to check if it's a valid split or not
[5,7,    |9,10]
[1,2,3,4,|6,8,11]
1) we need to check if 1,2,3,4 can be to the left of 9,10 (we already know it can be to the left of 6,8,11)
    can it? check 4 < 9 - yes it can
2) we need to check if 5,7 can be to the left of 6,8,11
    can it? check 7 < 6 - no it can not
the split is invalid
shift [5,7,|9,10] to the left
L=0(5) R=1(7)
M=0(5)
assume split point
[5,|7,9,10]
left half len is 6
we need 5 more elements (index=4)
[1,2,3,4,6,|8,11]
now we need to check if it's a valid split or not
[5,        |7,9,10]
[1,2,3,4,6,|8,11]
now we need to check if
    1,2,3,4,6 can be to the left of 7,9,10: yes 6<7
    5 can be to the left of 8,11 yes 5 < 8
what if
[5,        |6,9,10]
[1,2,3,4,7,|8,11]
    7<6, wrong split
we had L=0(5) R=1(6) M=0(5)
now we have L=0 R=0 M=0 again, so we are stuck including M into the split

should we not include M?
[5,6,9,10]
initially L=0 R=3 M=1
split: [5,|6,9,10]
wrong?
L=0 R=1 M=0
[|5,6,9,10]
ok what if
split: [5,6,9,10]
L=0 R=3 M=1
split: [5,|6,9,10]
move right
L=1 R=3
M=2
split: [5,6,|9,10]
move right
L=2 R=3 M=(3+2)/2=floor(2.5)=2
M=2
split: [5,6,|9,10]
we're stuck again
so when we have this
L=1 R=3
M=2
split: [5,6,|9,10]
L = M + 1
L=3 R=3 M=3
split: [5,6,9,|10]
what if go right again
L=4???

ok what if
[5,6,9,10]
L=0 R=4
M=2
[5,6,|9,10]
move right
L=3 R=4
M=3
[5,6,9,|10]
move right
L=4 R=4
M=4
[5,6,9,10|]

ok what if
[5,6,9,10]
L=0 R=4
M=2
[5,6,|9,10]
move left
L=0 R=2
M=1
[5,|6,9,10]
move left
L=0 R=1
M=0
[|5,6,9,10]
we're good


edge case

[1,2,3,4,6,8,|11]
[|5,7,9,10]
here we know 1,2,3,4,6,8 can be somewhere to the left of 11, because they are from the same sorted array
but what is to the left of 11 from the second array?
    the answer is nothing
    nothing can always be to the left or to the right of something
    so we compare with something that always gives truthy answer, like -INF


*/
