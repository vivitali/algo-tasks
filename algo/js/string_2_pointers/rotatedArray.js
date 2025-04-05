function search(nums, target) {
    let left = 0
    let right = nums.length - 1

    while (left <= right) {
        let mid = Math.floor(left + (right - left) / 2)
        if (nums[mid] === target) {
            return mid
        }

        // Check if the left side is sorted
        if (nums[left] <= nums[mid]) {
            // Check if target is in the left sorted portion
            if (nums[left] <= target && target < nums[mid]) {
                right = mid - 1;
            } else {
                left = mid + 1;
            }
        }

        // Right side is sorted
        else {
            // Check if target is in the right sorted portion
            if (nums[mid] < target && target <= nums[right]) {
                left = mid + 1;
            } else {
                right = mid - 1;
            }
        }
    }

    return -1
};