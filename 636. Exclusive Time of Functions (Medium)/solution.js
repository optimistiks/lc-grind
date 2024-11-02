/**
 * @param {number} n
 * @param {string[]} logs
 * @return {number[]}
 */
var exclusiveTime = function (n, events) {
  const result = Array(n).fill(0);
  const stack = [];

  for (const event of events) {
    const [id, action, time] = event.split(":");
    if (action === "start") {
      stack.push([id, action, time]);
    }
    if (action === "end") {
      // calculate total execution time for the function we are ending
      const [prevId, prevAction, prevTime] = stack.pop();
      const total = time - prevTime + 1;
      // add it to the result of this function
      result[id] += total;
      // if it's a nested function we are ending,
      // we need to subtract it's execution time
      // from the parent function execution time
      if (stack.length > 0) {
        result[stack[stack.length - 1][0]] -= total;
      }
    }
  }

  return result;
};
