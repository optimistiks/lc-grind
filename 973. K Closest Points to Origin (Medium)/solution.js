// var kClosest = function(points, k) {
//     // Precompute the Euclidean distance for each point
//     let distances = points.map(euclideanDistance)
//     // Create a reference array of point indices
//     let remaining = points.map((_, i) => i)
//     // Define the initial binary search range
//     let low = 0, high = Math.max(...distances)

//     // Perform a binary search of the distances
//     // to find the k closest points
//     let closest = []
//     while (k) {
//         let mid = low + (high - low) / 2
//         console.log('mid', mid, 'distances', distances);
//         let [closer, farther] = splitDistances(remaining, distances, mid)
//         if (closer.length > k) {
//             // If more than k points are in the closer distances
//             // then discard the farther points and continue
//             remaining = closer
//             high = mid
//         } else {
//             // Add the closer points to the answer array and keep
//             // searching the farther distances for the remaining points
//             k -= closer.length
//             closest.push(...closer)
//             remaining = farther
//             low = mid
//         }
//     }

//     // Return the k closest points using the reference indices
//     return closest.map(i => points[i])
// };

// var splitDistances = function(remaining, distances, mid) {
//     // Split the distances around the midpoint
//     // and return them in separate arrays
//     let closer = [], farther = []
//     for (let index of remaining) {
//         if (distances[index] <= mid) {
//             closer.push(index)
//         } else {
//             farther.push(index)
//         }
//     }
//     return [closer, farther]
// };

// const euclideanDistance = ([x,y]) => x ** 2 + y ** 2

/**
 * @param {number[][]} points
 * @param {number} k
 * @return {number[][]}
 */
var kClosest = function (points, k) {
  // QuickSelect solution

  const quickSelect = (points, k) => {
    const squaredDistance = ([x, y]) => x ** 2 + y ** 2;

    const choosePivot = (left, right, points) => {
      const mid = left + Math.floor((right - left) / 2);
      return points[mid];
    };

    const partition = (left, right, points) => {
      const pivotPoint = choosePivot(left, right, points);
      const pivotPointDist = squaredDistance(pivotPoint);
      while (left < right) {
        // move points with smaller distance to the left half,
        // move points with the larger distance to the right half
        if (squaredDistance(points[left]) >= pivotPointDist) {
          // point on the left has distance larger than pivot point dist
          // so swap point on the left with point on the right, move right backward, but keep left
          // because the point that came from the right may have larger distance as well
          [points[right], points[left]] = [points[left], points[right]];
          right -= 1;
        } else {
          // the left point distance is okay, so move left forward
          left += 1;
        }
      }
      // handle last point
      // Ensure the left pointer is just past the end of
      // the left range then return it as the new pivotIndex
      if (squaredDistance(points[left]) < pivotPointDist) {
        left += 1;
      }
      return left;
    };

    // a range to partition
    let left = 0;
    let right = points.length - 1;
    // initial pivotIndex to short circuit if points.length === k
    let pivotIndex = points.length;
    while (pivotIndex !== k) {
      pivotIndex = partition(left, right, points);
      if (pivotIndex < k) {
        // left half has less than k elements, we keep it for later and continue with the right half;
        left = pivotIndex;
      } else {
        // left half has more than k elements, throw away right half
        right = pivotIndex - 1;
      }
    }

    return points.slice(0, k);
  };

  return quickSelect(points, k);

  // binary search solution
  /*
    const dist = (point) => {
        return point[0] ** 2 + point[1] ** 2;
    };

    const distances = points.map(dist);
    let candidates = points.map((point, index) => index);

    let lo = 0;
    let hi = Math.max(...distances);

    const result = [];

    while (k) {
        const mid = lo + (hi - lo) / 2;

        const [closer, farther] = candidates.reduce(([closer, farther], pointIdx) => {
            if (distances[pointIdx] > mid) {
                farther.push(pointIdx);
            } else {
                closer.push(pointIdx);
            }
            return [closer, farther];
        }, [[], []])

        if (closer.length > k) {
            hi = mid;
            candidates = closer;
        } else {
            k -= closer.length;
            lo = mid;
            candidates = farther;
            result.push(...closer);
        }
    }

    return result.map(pointIdx => points[pointIdx]);
    */

  // heap solution
  /*
    const heap = new MaxPriorityQueue((point) => dist(point));

    for (const point of points) {
        if (heap.size() < k) {
            heap.enqueue(point);
        } else if (dist(point) < dist(heap.front())) {
            heap.dequeue();
            heap.enqueue(point);
        }
    }

    return heap.toArray();
    */
};

/*
REACTO
Repeat
given 
    an array of points
        where points[i] = [xi, yi] (a point i)
    an integer k
    return k closest points to origin 0,0

Approach

compute distances for every point
init lo as 0, hi as max distance
calc mid distance

now iterate all points, and compare their distance with the mid distance
if point distance > mid distance, put point into farther
otherwise put point into closer

if closer has more than k points
    discard farthest
    calc new mid between lo and mid
    repeat on closer
if closer has less than or equal to k points
    add closer to result
    calc new mid between mid and hi
    repeat on farthest
before repeating, check if result already has k



*/
