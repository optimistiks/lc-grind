/**
 * @param {number[][]} routes
 * @param {number} source
 * @param {number} target
 * @return {number}
 */
var numBusesToDestination = function (matrix, s, d) {
  // at first we create an adj list,
  // where keys are stops
  // and values are array of buses visiting that stop

  // then we have a queue to run bfs
  // since bfs always finds shortest path in an unweighted graph
  // we add a tuple [stop, buses] to the queue
  // where buses is the number of different buses we took to reach the stop
  // initially buses is 0 since it's a starting stop

  // so we dequeue the tuple
  // then we need to add all connecting stations to the queue
  // for that we first grab the buses of dequeued stop
  // then we get stops of each bus and enqueue them with the buses + 1

  // we need to make sure we don't enqueue stops of a bus twice
  // so we need to keep track of visited buses

  // build the adj list by iterating bus routes
  const adjList = {};

  for (let i = 0; i < matrix.length; ++i) {
    const bus = i;
    const stops = matrix[i];
    for (let j = 0; j < stops.length; ++j) {
      const stop = stops[j];
      // keys are stops, values are buses visiting the stop
      adjList[stop] = adjList[stop] ?? [];
      adjList[stop].push(bus);
    }
  }

  // prepare queue for bfs
  // add starting stop and bus count to reach the stop
  // (we start from there so its initially 0)
  const queue = [s];
  let busCount = 0;

  // keep track of visited buses, so each bus route only visited once
  const visitedBuses = new Set();

  while (queue.length > 0) {
    const curSize = queue.length;
    for (let q = 0; q < curSize; ++q) {
      // start iterating queue
      const stop = queue.shift();

      // if we reached the destination,
      // busCount will be the number of different buses we used to reach the stop
      if (stop === d) {
        return busCount;
      }

      // grab the list of buses visiting the stop from the adj list we've built
      const buses =
        adjList[stop]?.length > 0
          ? adjList[stop].filter((bus) => !visitedBuses.has(bus))
          : [];

      for (let i = 0; i < buses.length; ++i) {
        const bus = buses[i];
        visitedBuses.add(bus);
        const stops = matrix[bus];
        for (let j = 0; j < stops.length; ++j) {
          if (stop !== stops[j]) queue.push(stops[j]);
        }
      }
    }
    busCount += 1;
  }

  return -1;
};
