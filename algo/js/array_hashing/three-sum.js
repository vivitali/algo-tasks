/**
 * @param {number[]} nums
 * @return {number[][]}
 */
var threeSum = function (nums) {
    let res = []

    for (let i = 0; i < nums.length && nums[i] <= 0; i++) {
        if (i === 0 || nums[i - 1] !== nums[i]) {
            twoSums(nums, i, res)
        }
    }
    return res
};

let twoSums = function (nums, i, res) {
    let p1 = i + 1
    let p2 = nums.length - 1

    while (p1 < p2) {
        let sum = nums[i] + nums[p1] + nums[p2]
        if (sum < 0) {
            ++p1
        } else if (sum > 0) {
            --p2
        }
        else {
            res.push([nums[i], nums[p1], nums[p2]])
            const prevp1 = nums[p1]
            while (p1 < p2 && nums[p1] === prevp1) {
                p1++;
            }

            const prevp2 = nums[p2]
            while (p1 < p2 && nums[p2] === prevp2) {
                p2--;
            }

        }
    }
}