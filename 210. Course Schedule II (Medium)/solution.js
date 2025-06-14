/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {number[]}
 */
var findOrder = function (numCourses, prerequisites) {
  const adjList = new Map();

  for (let course = 0; course < numCourses; ++course) {
    adjList.set(course, new Set());
  }

  const indegree = Array.from({ length: numCourses }, () => 0);

  prerequisites.forEach(([a, b]) => {
    adjList.get(b).add(a);
    indegree[a] += 1;
  });

  const queue = new Queue();

  indegree.forEach((value, course) => {
    if (value === 0) queue.enqueue(course);
  });

  const result = [];

  while (queue.size() > 0) {
    const course = queue.dequeue();
    result.push(course);
    const neighbors = adjList.get(course).values();
    for (const neighbor of neighbors) {
      indegree[neighbor] -= 1;
      if (indegree[neighbor] === 0) {
        queue.enqueue(neighbor);
      }
    }
  }

  if (indegree.some((value) => value !== 0)) {
    return [];
  }

  return result;
};

/*
REACTO

Repeat
given numCourses integer
and prerequisites [a,b][] meaning b is a prerequisite for a
return ordering of courses

Example

Approach
topological sort
build adj list
where keys are prerequisites
also make an array indegree, indegree[i] is the indegree of course i
initialize queue with courses indegree 0
*/
