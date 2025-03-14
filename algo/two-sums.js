/**
 * @param {number[]} nums
 * @param {number} target
 * @return {number[]}
 */
var twoSum = function(nums, target) {
const maps = {}

for(let i = 0; i<nums.length; i++) {
    const curr = nums[i]
    const diff = target - curr
    if(diff in maps) {
        return [maps[diff], i]
    }
    maps[curr] = i
}
return []

};