/**
 * @param {string} s
 * @return {number}
 */
// eslint-disable-next-line no-unused-vars
var longestPalindrome = function(s) {
    const map = {};

    for(let i = 0; i < s.length; i++) {
        let char = s[i]
        if(char in map){ 
            map[char] = map[char]+1
            } 
        else {
            map[char] = 1
       }
    }

    console.log(map)
    let hasOdd = false
    let length = 0
    for(let c in map) {
        if(map[c]%2 ===0) {
        length += map[c]
        } else {
            length += map[c] -1
            hasOdd = true
        }
    }
    if(hasOdd) {
        length += 1
    }

    return length
};