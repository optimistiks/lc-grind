/**
 * @param {character[]} tasks
 * @param {number} n
 * @return {number}
 */
var leastInterval = function (tasks, n) {
  // one heap solution

  /*
        count frequencies of tasks
        push frequencies into max heap
        define one iteration of cycles as number of cycles that need to happen
        until the same task can be processed
        for example, if n=2,
        A -- -- before another A can be run
        one iteration is 3 (n+1)
        
        now run 3 cycles
            dequeue count from max heap on each cycle
            decrement count, add to a separate array




    */

  const freqs = tasks.reduce((acc, task) => {
    acc.set(task, (acc.get(task) ?? 0) + 1);
    return acc;
  }, new Map());

  const heap = new MaxPriorityQueue();

  for (const freq of freqs.values()) {
    heap.enqueue(freq);
  }

  const iter = n + 1;
  let totalCycles = 0;

  while (heap.size() > 0) {
    const temp = [];

    for (let i = 0; i < iter; ++i) {
      if (heap.size() === 0) break;

      temp.push(heap.dequeue() - 1);
    }

    const nonZero = temp.filter((newFreq) => newFreq > 0);

    totalCycles += nonZero.length > 0 ? iter : temp.length;

    nonZero.forEach((newFreq) => heap.enqueue(newFreq));
  }

  return totalCycles;

  /*
    // count tasks
    const tasksGrouped = tasks.reduce((acc, task) => {
        acc.set(task, (acc.get(task) ?? 0) + 1);
        return acc;
    }, new Map());

    // max heap to store tasks with the most runs left
    const qtyHeap = new MaxPriorityQueue(item => item[1]);

    // min heap to store tasks that were run at a certain cycle (earlier = higher)
    const delayHeap = new MinPriorityQueue(item => item[2]);

    // fill up the max heap (delay heap remains empty because no tasks have been run yet)
    for (const entry of tasksGrouped.entries()) {
        qtyHeap.enqueue(entry);
    }

    let totalCycles = 0;

    while (qtyHeap.size() > 0 || delayHeap.size() > 0) {
        const currentCycle = totalCycles;
        // console.log('cycle', currentCycle);
        // console.log(qtyHeap.toArray());
        // console.log(delayHeap.toArray())

        // move all tasks that went through their mandatory idle time from delay heap to the main heap
        while (delayHeap.size() > 0 && (currentCycle - delayHeap.front()[2]) > n) {
            qtyHeap.enqueue(delayHeap.dequeue());
        }

        if (qtyHeap.size() > 0) {
            const task = qtyHeap.dequeue();
            // console.log('run', task);
            // decrement count of leftover runs
            task[1] -= 1;
            // remember that the task was run on this cycle
            task[2] = currentCycle;
            if (task[1] !== 0) {
                delayHeap.enqueue(task);
            }
        }

        // console.log("---")
        totalCycles += 1;
    }

    return totalCycles;
    */
};

/* 
Repeat
given
    array of strings tasks
        where a string is a task ID
    integer n
    one task requires one interval to complete
    between two tasks of the same label, there has to be a gap of n intervals doing something else
output:
    integer
        a minimum number of intervals to complete all tasks

Example
    [A,A,A,B,B,B] 2
    do A
    do B
    IDLE
    do A
    do B
    IDLE
    do A
    do B
    total 8

Approach
use heap to store tasks by their count

n=2
pop from the heap A,3
execute
now top of the heap is B,3
A,2 is under
and we need to wait 2 cycles until the next A
so we pop B if its different from A
but if top of the heap is A,2
we check on what cycle was A executed 

what if our heap is A,2 and B,2
what will be on top?
if we store A,2,(last execution cycle)
so on cycle 3 we can do 3-2=1 1 cycle passed, can't take, idle


 */
