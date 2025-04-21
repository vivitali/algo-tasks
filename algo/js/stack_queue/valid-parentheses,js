/**
 * @param {string} s
 * @return {boolean}
 */
var isValid = function (s) {
    const mapping = {
        ")": "(",
        "}": "{",
        "]": "[",
    }
    const stack = [];
    for (let c of s) {
        if (mapping[c]) {
            const topEl = stack.length ? stack.pop() : "empty"
            if (topEl !== mapping[c]) {
                return false
            }

        }
        else {
            stack.push(c)
        }
    }


    return stack.length === 0
};
