function subarraySum(nums: number[], k: number): number {
  const mp = new Map();
  let result = 0;
  let presum = 0;

  mp.set(0, 1);
  let i = 0;
  for (let n of nums) {
    presum += n;
    if (mp.has(presum - k)) {
      result += mp.get(presum - k);
    }

    mp.set(presum, (mp.get(presum) || 0) + 1);
    i++;
  }
  return result;
}
