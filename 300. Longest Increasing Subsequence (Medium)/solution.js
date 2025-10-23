/**
 * @param {number[]} nums
 * @return {number}
 */
var lengthOfLIS = function (nums) {
  const dp = [nums[0]];

  const binarySearch = (value) => {
    let left = 0;
    let right = dp.length - 1;

    while (left < right) {
      const mid = left + Math.floor((right - left) / 2);
      if (dp[mid] >= value) {
        right = mid;
      } else {
        left = mid + 1;
      }
    }

    return right;
  };

  for (let i = 1; i < nums.length; ++i) {
    const value = nums[i];
    const idx = binarySearch(value);
    if (dp[idx] >= value) {
      dp[idx] = value;
    } else {
      dp.push(value);
    }
  }

  return dp.length;
};

/*

# \U0001f9e0 Longest Increasing Subsequence — Spaced Repetition Checklist

Use this file to guide your review and re-implementation of both the O(n²) and O(n log n) LIS algorithms.

---

## \U0001f9e9 Part 1: Warm-Up Understanding
Answer in your own words before coding.

1. What does a *subsequence* mean (vs a substring)?  
   → Substring is continious, subsequence can skip characters, but the relative ordering should be unchanged

2. In the O(n²) approach, what does `dp[i]` represent?  
   → It represents the length of the longest increasing subsequence ending at s[i]
   (so for example for the input array [4,5,1] dp is [1,2,1], because at 0 LIS="4", at 1 LIS="45", at 2 LIS="1")

3. How do we compute `dp[i]` using earlier values?  
   → We iterate from dp[0] to dp[j] where j < i, at each j  we check s[j] to see if we can form a new LIS with s[i], then get the max length and write it to dp[i] 

4. Why is the final answer `max(dp)`?  
   → Since every dp[i] is the length of LIS ending at s[i], the maximum LIS may end at any s[i]
   (for example for the input array [4,5,6,1,2]) max LIS is 4,5,6 and it ends at 6, so dp[2] will hold the answer 3

5. What are the time and space complexities?  
   → O(n^2) time, O(n) space
   For each letter in s we may at worst iterate the whole dp array that is of size n

---

## ⚙️ Part 2: Implementation Checks
As you implement, verify these steps.

✅ Test array: `[4,5,0,1,2]`
- Print `dp` after each iteration.
- Does `dp` match your manual reasoning?
- Does it grow or stay steady at the correct moments?
dp: [1] [1,2] [1,2,1] [1,2,1,2] [1,2,1,2,3]

✅ Test array: `[3,8,4,5,9,2,6]`
- Are the intermediate `dp` states consistent with your hand simulation?
[1("3")] 
[1("3"),2("38")] 
[1("3"),2("38"),2("34")]
[1("3"),2("38"),2("34"),3("345")]
[1("3"),2("38"),2("34"),3("345"),4("3459")]
[1("3"),2("38"),2("34"),3("345"),4("3459"),1("2")]
[1("3"),2("38"),2("34"),3("345"),4("3459"),1("2"),4("3456")]

---

## \U0001f680 Part 3: Optimized O(n log n) Version
Reflect on the logic behind the improved approach.

1. How did we redefine `dp` in this version?  
   → In this version, dp[i] holds the smallest last value of LIS of length i
   (for example dp[4] holds the smallest last value of LIS of length 3)

2. What does it mean when binary search **finds** a position?  
   → It means we have found LIS of a certain length where the last element can be replaced with our new value,
   because our new value is less that the last element in LIS 
   (so it will make that LIS "better" because we will be able to extend it with more values)

3. What does it mean when binary search **doesn’t find** one?  
   → It means that every length LIS so far ends with a value smaller than our current value
   It means we don't need to replace any of those last values, we can instead extend the previous length LIS with the new value

4. Why does the length of `dp` always equal the LIS length?  
   → Because we only increase LIS length by adding a new value into dp when there are no other options left

5. Why does replacing with a smaller tail never lose information?  
   → Because making a smaller tail only improves the LIS, allowing it to be extended by more values in the future

---

## \U0001f9e0 Part 4: Reflection
After coding, answer honestly.

1. Which part was hardest to recall?  
   → O(n log n) solution

2. What intuition helped it click again?  
   → 

3. If you had to teach this to someone else tomorrow, how would you explain it *without code*?  
   → 

---

✅ **Goal:** When you can re-derive both algorithms, explain the optimized one intuitively, and predict `dp` states for new arrays without looking them up — you’ve *mastered* LIS.

*/
