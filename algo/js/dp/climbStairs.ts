function climbStairs(n: number): number {
    if(n === 1) return 1

    let map = {}
    map[1] = 1
    map[2] = 2

    for (let i = 3; i<=n; i++) {
        map[i] = map[i-1] + map[i-2]
    }
    return map[n]
};