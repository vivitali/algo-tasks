/**
 * Definition for a binary tree node.

 */

import { TreeNode } from "./TreeNode"

function sortedArrayToBST(nums: number[]): TreeNode | null {
    let helper = (start, end) => {
        if (start > end) { return null }
        let mid = Math.floor((start + end) / 2)
        let root = new TreeNode(nums[mid])
        root.left = helper(start, mid - 1)
        root.right = helper(mid + 1, end)
        return root
    }

    return helper(0, nums.length - 1)

};