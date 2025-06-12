/**
 * @param {number} numCourses
 * @param {number[][]} prerequisites
 * @return {boolean}
 */
var canFinish = function (numCourses, prerequisites) {
  const indegree = Array.from({ length: numCourses }, () => 0);

  const adjList = new Map();

  for (let course = 0; course < numCourses; ++course) {
    adjList.set(course, new Set());
  }

  prerequisites.forEach(([a, b]) => {
    // b is a prerequisite for a, so to take a you need to first take b
    adjList.get(b).add(a);
    indegree[a] += 1;
  });

  const zeroIndegree = indegree
    .map((value, course) => course)
    .filter((course) => indegree[course] === 0);

  const queue = new Queue(zeroIndegree);

  let visited = 0;

  while (queue.size() > 0) {
    const course = queue.dequeue();
    visited += 1;
    const neighbors = adjList.get(course).values();
    for (const neighbor of neighbors) {
      indegree[neighbor] -= 1;
      if (indegree[neighbor] === 0) {
        queue.enqueue(neighbor);
      }
    }
  }

  console.log({ indegree });

  return visited === numCourses;

  /*
    const adjList = new Map();

    for (let numCourse = 0; numCourse < numCourses; ++numCourse) {
        adjList.set(numCourse, new Set());
    }

    prerequisites.forEach(([a, b]) => {
        adjList.get(a).add(b);
    });

    const visited = new Set();
    const stack = new Set();

    function dfs(numCourse) {
        // we add and remove to the stack as we go
        // stack contains current DFS branch
        // we should not encounter the same node twice during single DFS branch
        // this would indicate a cycle
        if (stack.has(numCourse)) {
            return false;
        };

        // we never empty the visited stack
        // having a node in the visited stack means
        // we've explored it's branch before
        // and it contains no cycles
        // so we don't explore what we've already explored
        if (visited.has(numCourse)) {
            return true;
        }

        visited.add(numCourse);
        stack.add(numCourse);

        const prereqs = adjList.get(numCourse);

        for (const numPrereqCourse of prereqs.values()) {
            if (!dfs(numPrereqCourse)) return false;
        }

        // remove the current node from the current DFS branch
        stack.delete(numCourse);

        return true;
    }

    for (let numCourse = 0; numCourse < numCourses; ++numCourse) {
        if (!dfs(numCourse)) return false;
    }

    return true;
    */
};

/*
REACTO

Repeat
given:
    numCourses integer - how many courses I have to take, from 0 to numCourses - 1
    prerequisites [a, b][] - indicates that to take course b, I need to first take course a
output:
    boolean - true if it is possible to finish all the courses, false otherwise

Example

Approach
so it's like a graph, or multiple small graphs
when is it not possible to finish all the courses?
when there is a cycle, a->b->a

what if we build an adjacency list
[a, b] - b->a

a: []
b: [a, c]


a: [b, c]
b: []
c: [b, d]
d: []
meaning
to complete a, complete b and c first
no prereqs for b
to complete c, complete d first
no prereqs for d
now start DFS from a
a->b->[]
   |
 ->c->d->[]

*/
