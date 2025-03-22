/**
 * @param {number[]} nums
 * @param {number} k
 * @return {number[]}
 */
var maxSlidingWindow = function (nums, k) {
  // deque solution
  /*
    we store indexes in deque
    in a monotonic decreasing fashion
    we pop from the right end all elements less than new element (to maintain monotonic decreasing)
    we pop from the left end when left moves forward
    */
  const result = [];
  const deque = [];

  let L = 0;
  for (let R = 0; R < nums.length; ++R) {
    while (deque.length > 0 && nums[deque[deque.length - 1]] < nums[R]) {
      deque.pop();
    }

    deque.push(R);

    if (R - L + 1 < k) {
      continue;
    }

    result.push(nums[deque[0]]);

    L += 1;

    if (L > deque[0]) {
      deque.shift();
    }
  }

  return result;

  // solution with two queues
  /*
    const windowMax = new MaxPriorityQueue();
    const leaveMax = new MaxPriorityQueue();

    const result = [];

    let L = 0;
    for (let R = 0; R < nums.length; ++R) {
        windowMax.enqueue(nums[R]);

        const size = R - L + 1;

        if (size < k) {
            continue;
        }

        // here window always of size k
        // because as soon as size === k, we start moving both L and R
        result.push(windowMax.front());

        // now we need to move L forward
        // if L points to current window max, we need to pop max
        // but otherwise we don't pop anything (element stays in the PQ)
        // which means later, when we pop max, we may have a new max that previously left the window
        // so what we do is we pop from windowMax IF:
        // nums[L] === windowMax.front() (current max is leaving the window)
        // windowMax.front() === leaveMax.front() (current max left the window on previous iterations) (we pop from both queues here)

        leaveMax.enqueue(nums[L]);

        while (leaveMax.size() > 0 && windowMax.size() > 0 && leaveMax.front() === windowMax.front()) {
            leaveMax.dequeue();
            windowMax.dequeue();
        }

        L += 1;
    }

    return result;
    */
};

/*
REACTO

Repeat
input:
    nums - an array of integers
    k - a size of a sliding window that moves left to right
I can only see k number of the window
return array of integers that contains maximums from every sliding window

Example
[1,3,-1,-3,5,3,6,7], k = 3
windows, maximum:
[1,3,-1], 3
[3,-1,-3], 3
[-1,-3,5], 5
[-3,5,3], 5,
[5,3,6], 6
[3,6,7], 7
result is [3,3,5,5,6,7]

Approach
    L=0, R=0
    start moving R forward, adding elements to a priority queue
    as soon as window size === k, top element is the maximum of the current window
    add it to result

    now, we need to move both L and R forward
    nums[L] will be leaving the window
    nums[R] will be entering the window

    about nums[L], it can be two things
        it is the current maximum (top of the PQ)
            then we pop it from the PQ
                now, the new maximum can actually be an element that left the window a long time ago
                so we don't just pop once
                
                    (so when an element leaves, what if we add it to another priority queue)
                    imagine we have the following PQ [4,5,6]
                    6 is the current maximum (if we pop it 5 will be the new max, then if we pop 5, 4 will be)
                    let's say 4 left the window (PQ is unchanged)
                    5 left the window (PQ is unchanged)
                    now second PQ is [4,5], main PQ is [4,5,6]
                    now 6 left the window, it's the current max, so we pop it
                    the new max can only be:
                        a previous max that is still in the window (in this case it won't be in the second PQ)
                        a previous max that left the window (in this case it will be top of the second PQ)

                so we can pop once, then pop while top of the main PQ === top of the second PQ

        it is NOT the current maximum
            then we don't pop it from the PQ

*/
