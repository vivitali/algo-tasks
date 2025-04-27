
function removeDuplicates(nums) {
    let writter = 1
    let count = 0;

    for (let i = 1; i < nums.length; i++) {
        let a = nums[i]
        let b = nums[i - 1]
        if (nums[i] !== nums[i - 1]) {
            count = 0
            nums[writter] = nums[i]
            writter++
        } else {
            count++
            if(count <=1) {
                nums[writter] = nums[i]
                writter ++
            }
        }
    }
    return writter
};