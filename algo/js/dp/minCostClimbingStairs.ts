function minCostClimbingStairs(cost: number[]): number {
    const last = cost.length + 1
    const dp = new Array(last).fill(0)
    for (let i = 2; i < last; i++) {
        let onestep = cost[i - 1] + dp[i - 1]
        let twostep = cost[i - 2] + dp[i - 2]
        dp[i] = Math.min(onestep, twostep)
    }

    return dp.pop()
};