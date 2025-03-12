/**
 * @param {number} target
 * @param {number[]} position
 * @param {number[]} speed
 * @return {number}
 */
var carFleet = function (target, position, speed) {
  // arrange positions, speeds, and time to target into triplets
  const cars = position.map((pos, i) => [
    pos,
    speed[i],
    (target - pos) / speed[i],
  ]);

  // sort the triplets array by position descending
  // so the car that is positioned closest to the target comes first in the array
  cars.sort((a, b) => b[0] - a[0]);

  const stack = [];

  for (const car of cars) {
    stack.push(car);
    if (stack.length >= 2) {
      const first = stack[stack.length - 1];
      const second = stack[stack.length - 2];
      // the first one is farther away from the target
      // so it's behind the second one on the road
      // we need to know if it catches up to it and merges into a fleet
      if (first[2] <= second[2]) {
        // the time to reach the target for the first one is less than for the second one
        // the first one is behiind the second one
        // it means it will catch up and form a fleet
        stack.pop();
        // we get rid of the first one, the faster one
        // because when a car forms a fleet, the fleet moves with the speed of the slowest car
      }
    }
  }

  return stack.length;
};

/*

so I need to sort cars by position, descending
meaning the first car is the closest one to target (the numeric value of the position is the largest)

then I start iterating those sorted cars
first car goes to stack, because the stack is empty
second car goes to stack

now we have 2 cars in the stack

we compare their time to reach the target

second car is positioned "behind" the first car on the road
if it reaches the target faster than the first car
it means it will merge with the first car into a fleet and will assume it's speed
so we can pop the top of the stack, and leave only the first slower car, it represents a fleet now

*/
