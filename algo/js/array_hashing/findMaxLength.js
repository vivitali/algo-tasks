/**
 * @param {number[]} nums
 * @return {number}
 */
var findMaxLength = function (nums) {
  let maxLen = 0
  for (let start = 0; start < nums.length; start++) {
      let zero = 0
      let one = 0
      for (let end = start; end < nums.length; end++) {
          if (nums[end] === 0) {
              zero++
          } else {
              one++
          }
          if (zero === one) {
              maxLen = Math.max(maxLen, end - start + 1)
          }
      }
  }
  return maxLen
};