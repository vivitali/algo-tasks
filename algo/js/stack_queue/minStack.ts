class MinStack {
    private stack;
    constructor() {
        this.stack = []

    }

    push(val: number): void {
        this.stack.push({ val, min: !this.stack.length ? val : Math.min(this.getMin(), val) })
    }

    pop(): void {
        this.stack.pop()
    }

    top(): number {
        return this.stack[this.stack.length - 1].val
    }

    getMin(): number {
        return !this.stack.length ? 0 : this.stack[this.stack.length - 1].min
    }
}

/**
 * Your MinStack object will be instantiated and called as such:
 * var obj = new MinStack()
 * obj.push(val)
 * obj.pop()
 * var param_3 = obj.top()
 * var param_4 = obj.getMin()
 */