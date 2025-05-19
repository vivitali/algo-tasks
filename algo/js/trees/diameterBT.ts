/**
 * Definition for a binary tree node.
 * class TreeNode {
 *     val: number
 *     left: TreeNode | null
 *     right: TreeNode | null
 *     constructor(val?: number, left?: TreeNode | null, right?: TreeNode | null) {
 *         this.val = (val===undefined ? 0 : val)
 *         this.left = (left===undefined ? null : left)
 *         this.right = (right===undefined ? null : right)
 *     }
 * }
 */

import { TreeNode } from "./TreeNode"


function diameterOfBinaryTree(root: TreeNode | null): number {
    let longestTotal = 0

    let dfs = (root: TreeNode | null) => {
        if (!root) return 0

        let left = dfs(root.left)
        let right = dfs(root.right)

        longestTotal = Math.max(longestTotal, left + right)

        return Math.max(left, right)+1
    }

    dfs(root)

    return longestTotal

};