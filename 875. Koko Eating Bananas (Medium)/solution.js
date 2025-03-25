/**
 * @param {number[]} piles
 * @param {number} h
 * @return {number}
 */
var minEatingSpeed = function (piles, h) {
  const maxPileSize = Math.max(...piles);

  let minSpeed = 1;
  // since our h is always greater than or equal to the amount of piles
  // we don't have any reason to eat faster than the size of the biggest pile (per hour)
  // because we always have at least one hour to spend on a pile
  let maxSpeed = maxPileSize;

  while (minSpeed < maxSpeed) {
    const midSpeed = minSpeed + Math.floor((maxSpeed - minSpeed) / 2);
    let hoursSpentOnAllPiles = 0;
    for (const pileSize of piles) {
      const hoursSpentOnPile = Math.ceil(pileSize / midSpeed);
      hoursSpentOnAllPiles += hoursSpentOnPile;
      if (hoursSpentOnAllPiles > h) break;
    }
    if (hoursSpentOnAllPiles > h) {
      // with this speed, it will take us more than h hours to eat all bananas
      // so we discard this speed, and all speeds that are slower
      minSpeed = midSpeed + 1;
    } else {
      // with this speed, it takes us less or equal than h hours to eat all bananas
      // so this is a valid speed
      // we should not discard it
      // but we should consider speeds slower than that
      // because we have to minimize it
      maxSpeed = midSpeed;
    }
  }

  return minSpeed;
};

/*
tc: we run binary search O(log n), but in each iteration we run over the piles
so O(n * log n)
sc: O(1)
*/

/*
REACTO

Repeat
given array piles of size n, where piles[i] is the amount of bananas in ith pile
h integer hours

return integer k 
    a speed in bananas-per-hour, minimized, such as all bananas in all piles can be eaten within h

so the amount of piles is less than or equal to the amount of hours

also, only one pile can be eaten during one hour


Example
what if we have one pile of 10 bananas
and one hour of time
the minimum speed is 10 bananas per hour
if slower, won't be able to eat all bananas
if faster, not minimized

piles = [3,6,7,11], h = 8
11 bph: 4 hours to eat all (1 hour for each pile less than 11, one hour for 11 pile)
4 bph: 1 hour to eat first pile of 3 bananas,
       2 hours to eat second pile of 6 bananas (4+2)
       2 hours to eat third pile of 7 bananas (4+3)
       3 hours to eat fourth pile of 11 bananas (4+4+3)
       total 8 hours

Approach
find maxPileSize in O(n)
define minSpeed as 1, maxSpeed as maxPileSize
find midSpeed
    iterate piles
        hoursSpentOnPile = ceil(pileSize / speed) (example, pileSize=11, speed=4, 4+4+3, so 3 hours)
        hoursSpentOnAllPiles += hoursSpentOnPile
    if hoursSpentOnAllPiles > hours
        // this speed won't allow us to eat all bananas in h ours
        // which means we can move left pointer to speed + 1
        // because all slower speeds won't allow us to do that either
        minSpeed = midSpeed + 1
    if hoursSpentOnAllPiles <= hours
        // this speed allows us to eat all bananas in h ours
        // but it is possible that some slower speed allows it as well
        // and we have to minimize
        // so we don't exclude this speed from the search space
        // but we exclude all speeds greater than this
        maxSpeed = midSpeed

for example,

1 - 15

L=1 R=15
M=8
if workable
    L=1 R=8
    M=4
    if workable
        L=1 R=4
        M=2
        if workable
            L=1 R=2
            M=1
            if workable
                L=1 M=1 STOP
            if non workable
                L=2 R=2 STOP

*/
