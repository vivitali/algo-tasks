/**
 Do not return anything, modify nums in-place instead.
 */
 function moveZeroes(nums) {
  if(nums.length === 1) return
  let writerPointer = 0;
  for (let readerPointer = 0; readerPointer < nums.length; readerPointer++) {
      let readItem = nums[readerPointer];

      if (readItem !== 0) {
          nums[writerPointer] = readItem
          writerPointer++
      }
  }
  while (writerPointer < nums.length) {
      nums[writerPointer] = 0
      writerPointer++
  }

};