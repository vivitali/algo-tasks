/**
 * @param {number[]} nums
 * @return {number[]}
 */
var sortedSquares = function (nums) {
  let res = [...nums]
  let left = 0;
  let right = nums.length - 1

  for (let i = nums.length - 1; i >= 0; i--) {
      let r = nums[right]
      let l = nums[left]

      if (Math.abs(l) > Math.abs(r)) {
          res[i] = nums[left] * nums[left]
          left++
      } else {
          res[i] = nums[right] * nums[right]
          right--
      }
  }

  return res
};