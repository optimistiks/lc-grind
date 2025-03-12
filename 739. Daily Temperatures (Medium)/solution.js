/**
 * @param {number[]} temperatures
 * @return {number[]}
 */
var dailyTemperatures = function (temperatures) {
  /*
if temperature is less than or equal, push day to stack
so for example we have days [1,2,3]
each day had lower temps
now we have day 4 with temp higher than day 2 and 3, but lower than 1
so (while day 4 temp is higher) pop from stack
for the popped days, calculate it's distances and fill the array
    */
  // const answer = Array(temperatures.length).fill(0)
  // const stack = []
  // for (let i = 0; i < temperatures.length; ++i) {
  //     const t = temperatures[i]
  //     while (t > temperatures[stack[stack.length - 1]]) {
  //         const last = stack.pop()
  //         answer[last] = i - last
  //     }
  //     stack.push(i)
  // }
  // return answer

  const answer = Array(temperatures.length).fill(0);

  for (let i = temperatures.length - 2; i >= 0; --i) {
    const t = temperatures[i];
    let distance = 1;
    // start checking temp at the next day
    // if it's not higher, the next temp to check is the next day distance in the answer array
    while (temperatures[i + distance] <= t) {
      // we start with second to last
      // it will check the last if the last is a lower temp
      // and it will set distance to null meaning that second to last doesn't have a higher temp
      if (answer[i + distance] === 0) {
        distance = null;
        break;
      }
      // console.log('incrementing distance of', t, 'at', i, 'by using answer of', temperatures[i + distance], 'at', i + distance, '(which is', answer[i + distance], ')')
      distance += answer[i + distance];
    }
    if (distance != null) {
      answer[i] = distance;
    }
    // console.log('distance for', t, 'at', i, 'is', distance)
  }

  return answer;
};

/*
tc: O(N), for stack, the inner loop will pop N times across all iterations of the loop
for optimized, each day will be used at most 2 times, and then it will be jumped over
sc: O(N) for stack, O(1) for optimized
*/
