/**
 * @param {number[]} nums
 * @return {number}
 */
var majorityElement = function (nums) {
    let median = nums.length / 2
    const map = {}
    for (let el of nums) {
        if (el in map) {
            map[el] += 1
            if (map[el] > median) {
                return el
            }
        } else {
            map[el] = 1
        }

    }
};