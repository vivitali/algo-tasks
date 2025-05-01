function evalRPN(tokens) {

    const stack = []
    const operators = {
        '+': (a, b) => a + b,
        '-': (a, b) => a - b,
        '*': (a, b) => a * b,
        '/': (a, b) => Math.trunc(a / b)
    }

    for (let t of tokens) {
        if (t in operators) {
            let b = Number(stack.pop())
            let a = Number(stack.pop())
            let result = operators[t](a, b)
            stack.push(result)
        }
        else {
            stack.push(Number(t))
        }
    }
    return stack[0]
};