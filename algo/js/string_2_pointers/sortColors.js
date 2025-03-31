/**
 * @param {number[]} nums
 * @return {void} Do not return anything, modify nums in-place instead.
 */
var sortColors = function (nums) {
  let left = 0;
  let curr = 0;
  let right = nums.length - 1;

  let swap = (arr, i1, i2) => {
      let temp = arr[i1]
      arr[i1] = arr[i2]
      arr[i2] = temp
  }

  while (curr <= right) {
      if (nums[curr] === 0) {
          swap(nums, curr, left)
          left++
          curr++
      }
      else if(nums[curr] === 2) {
          swap(nums, curr, right)
          right--
      }
      else {
          curr++
      }
  }


};