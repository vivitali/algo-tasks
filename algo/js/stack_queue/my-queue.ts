class MyQueue {
    private inputStack: number[] = [];
    private outputStack: number[] = [];
    constructor() {
        this.inputStack = [];
        this.outputStack = [];
    }

    push(x: number): void {
        while (this.outputStack.length > 0) {
            this.inputStack.push(this.outputStack.pop()!)
        }
        this.inputStack.push(x)
        while (this.inputStack.length > 0) {
            this.outputStack.push(this.inputStack.pop()!)
        }
    }
    
    pop(): number {
        return this.outputStack.pop()!
    }

    peek(): number {
        return this.outputStack[this.outputStack.length - 1]!
    }

    empty(): boolean {
        return !this.outputStack.length
    }
}

/**
 * Your MyQueue object will be instantiated and called as such:
 * var obj = new MyQueue()
 * obj.push(x)
 * var param_2 = obj.pop()
 * var param_3 = obj.peek()
 * var param_4 = obj.empty()
 */