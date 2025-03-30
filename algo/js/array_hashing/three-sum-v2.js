function threeSum(nums) {
    nums.sort((a, b) => a - b)
    let result = []
    let n = nums.length
    for (let i = 0; i < n - 2; i++) {
        let left = i + 1
        let right = n - 1
        if (nums[i] > 0) break;
        
        if (i > 0 && nums[i] === nums[i - 1]) {
            continue
        }


        while (left < right) {
            let sum = nums[i] + nums[right] + nums[left]
            if (sum > 0) {
                right--
            } else if (sum < 0) {
                left++
            } else {
                result.push([nums[i], nums[left], nums[right]])

                while (left < right && nums[left] === nums[left + 1]) left++
                while (left < right && nums[right] === nums[right - 1]) right--
                left++
                right--
            }
        }
    }
    return result

}