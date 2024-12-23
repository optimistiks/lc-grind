/**
 * @param {number[]} nums
 * @return {number[]}
 */
var productExceptSelf = function (nums) {
  /*
 
 [1,2,3,4,5]
 
 [,,,,]  
 
 product[3] = ???
 at product[2] we have product up to, but not including nums[2] 
 so we need to take nums[2] and multiply it by product[2] to get product[3]
 
 product[i] = nums[i - 1] * product[]
 
 so at nums[i]
 we write a product of what?
 
 nums[i-1] * nums[i - 2]
 
 maybe we should write to nums[i + 1] instead?
 
 like, when we are at nums[0]
 multiply with nums[-1], write to nums[1]
 
 when we are at nums[1]
 
 so the idea is that first we build prefix product
 where at each i we have a product of everything between nums[0] and nums[i-1], including nums[i-1] (but nums[i] not included)
 
 then we build postfix product
 where at each i we have a product of everything between nums[i+1] and nums[nums.length - 1]
 
 then we multiply the prefix and postfix product at each i
 --
 so we have nums[]
 
 len=5
 
 [1,2,3,4,5]
 
 [nums[1] * nums[2] * nums[3] * nums[4], nums[0] * nums[2] * nums[3] * nums[4], nums[0] * nums[1] * nums[3] * nums[4],,]
 
 [120, 60, 40, 30, 24]
 
 [1,1,2,6,24]
 
 [120,60,20,5,1]
 
 [120,60,40,30,24]
 
 prefix sum?
 
 1[1,2,3,4,5]
 
 [1,2,6,24,120]
 
 3 * 4 * 5 = 12 * 5 = 60
 
 3 * 4 = 12
 
 3 * 5 = 15
 
 4 * 5 = 20
 
 3  12  60
 
 60 20  5
    */

  const result = [];

  for (let i = 0; i < nums.length; ++i) {
    // to get prefixProduct[i], we need to take prefixProduct[i-1],
    // which is a product of everything before nums[i-1], not including nums[i-1]
    // and multiply it by nums[i-1]
    // this will give us prefixProduct[i],
    // which is a product of everything before nums[i], not including nums[i]
    result[i] = (result[i - 1] ?? 1) * (nums[i - 1] ?? 1);
  }

  // initialize postfix product with 1
  let postfixProduct = 1;
  for (let i = nums.length - 1; i >= 0; --i) {
    // at result[result.length - 1] we already have the prefix product
    // now we need to multiply it by the current postfix product
    result[i] = result[i] * postfixProduct;
    // now we need to update the postfix product by multiplying it with the current nums[i]
    // so next time we are at i-1, we have the correct postfix product that doesn't include i-1
    postfixProduct = postfixProduct * nums[i];
  }

  return result;
};

/*
Both time and space O(n)
*/

/*
after followup, O(n) time and O(1) space
*/
