/**
 * @param {number} n
 * @param {number} index
 * @param {number} maxSum
 * @return {number}
 */
var maxValue = function (n, index, maxSum) {
  // the sum of arithmetical series such as
  // [1,2,3,4,5]
  // or [5,4,3,2,1]
  // is expressed as
  // (5+1) * 5/2
  // what if we just know a number at index
  // such as [x,x,x,5]
  // the number (lets call it mid) 5 is at index 3
  // in this case
  // (mid + (mid - index)) * (index + 1) / 2
  // (5 + (5 - 3)) * (3 + 1) / 2
  // (5 + 2) * 2 = 14
  // [2,3,4,5] is indeed sums to 14

  // what if the sequence is this one in parentheses
  // [x,x,x,(5,x,x)] (descending)
  // find new index (the index of 5 in the sequence)
  // n=6, index=3, newIndex = 6-3-1=2
  // [x,x,x,(5,x)] (descending)
  // n=5, index=3, newIndex = 5-3-1=1
  // [x,(5,x,x,x)] (descending)
  // n=5, index=1, newIndex = 5-1-1=3
  // now back to the same formula
  // [x,x,x,(5,x,x)] (descending)
  // n=6, index=3, newIndex = 6-3-1=2
  // (mid + (mid - index)) * (index + 1) / 2
  // (5 + (5 - 2)) * (2 + 1) / 2
  // (5 + 3) * (3 / 2) = 8 * 1.5 = 12
  // [5,4,3] is indeed sums to 12

  // we need to account for cases such as
  // [x,x,x,x,x,x,5]
  // or
  // [5,x,x,x,x,x,x]
  // where the series ends earlier than the array, and the rest is repeating 1s
  // the first case you can detect
  // by checking mid > index
  // as soon as mid <= index, we need to add 1s
  // the second case, first find new index = (n-index-1)
  // and then mid > newIndex
  // example
  // [x,(5,x,x,x,x,x,x,x)] (descending)
  // index = 1, but newIndex=9-1-1 = 7
  // mid=5, mid > newIndex = 5 > 7 = FALSE
  // the amount of repeating 1s is calculated as such index-mid+1
  // for example, mid=5, newIndex=7, 7-5+1=3 (3 repeating 1s)
  // so when we have this edge case,
  // we need to calculate series with a correct index
  // in this case we set the series calculation index to (5-1)=4
  // this is the maximum index the number 5 can have in a series
  // so we calculate series
  // (5 + (5 - 4)) * (4 + 1) / 2 = (5 + 1) * 5 / 2 = 6 * 2.5 = 15
  // which is a correct sum for this part of series [x,(5,4,3,2,1,x,x,x)]
  // and then we add 3 for repeating 1s and get 18
  // so [x,(5,4,3,2,1,1,1,1)] the sum is indeed 18

  let left = 1;
  let right = maxSum;

  // index of mid in the right side series
  const rightIndex = n - index - 1;

  // if the resulting sum is larger than max sum,
  // we move the right pointer to mid - 1 (discard mid and everything larger)
  // if the resulting sum is less than or equal to max sum,
  // we move left pointer to mid (it is possible that this mid is our result, so we will return left)

  while (left < right) {
    const mid = Math.floor((left + right + 1) / 2);

    let leftSum = 0;
    let rightSum = 0;

    // left half
    if (mid > index) {
      // we're good
      leftSum = calcSum(mid, index);
    } else {
      // we need to account for repeating 1s
      leftSum = calcSum(mid, mid - 1) + (index - mid + 1);
    }
    // right half
    if (mid > rightIndex) {
      // we're good
      rightSum = calcSum(mid, rightIndex);
    } else {
      // we need to account for repeating 1s
      rightSum = calcSum(mid, mid - 1) + (rightIndex - mid + 1);
    }
    const sum = leftSum + rightSum - mid;

    if (sum <= maxSum) {
      left = mid;
    } else {
      right = mid - 1;
    }
  }

  // Replace this placeholder return statement with your code
  return left;
};

function calcSum(value, index) {
  return (value + (value - index)) * ((index + 1) / 2);
}
