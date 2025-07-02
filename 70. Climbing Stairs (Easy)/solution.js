/**
 * @param {number} n
 * @return {number}
 */
var climbStairs = function (n) {
  if (n < 3) {
    return n;
  }

  const ways = [1, 2];

  let curr = 3;

  while (curr <= n) {
    const val = ways[0] + ways[1];
    [ways[0], ways[1]] = [ways[1], val];
    curr += 1;
  }

  return ways[1];

  // let count = 0

  // const climb = (n) => {
  //     if (n === 0) {
  //         count += 1;
  //         return;
  //     }

  //     if (n < 0) {
  //         return;
  //     }

  //     climb(n-1);
  //     climb(n-2);
  // }

  // climb(n);

  // return count;
};

/*
REACTO

Repeat
n steps in a staircase
can climb either 1 or 2 steps at a time
return a number of distinct ways to the top

Example
so if n=5
1-1-1-1-1 is one way
1-1-1-2 is way #2
1-1-2-1 is way #3
1-2-1-1 is way #4

Approach
so 1 step: take 1 or two steps
    for 1 step branch, recurse with n-1
    for 2 step branch, recurse with n-2

                        0
                    1       2
                1   2       
                            1

when we are at step 3
    we could get there by step1+step2+step3
        to step2 we could have gotten by step1+step2
        or just directly to step2
        so there is one way to get to step1
        and two ways to get to step2
        does it mean there are 3 ways to get to step3?
        ground->step1->step3
        ground->step1->step2->step3
        ground->step2->step3

        so what we can do is define step[0] as 1 (step1)
        and step[1] as 2 (step2)
        then calc step3 as sum of step[0] and step[1]
        maybe we could replace step1 with step3
        so we have [step3, step2]




*/
