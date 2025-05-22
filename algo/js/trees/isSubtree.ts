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

const isSubtreeSame = (a: TreeNode | null, b: TreeNode | null): boolean => {
    if (!a && !b) return true
    if (a && b && a?.val === b?.val) {
        return isSubtreeSame(a.left, b.left) && isSubtreeSame(a.right, b.right)
    }
    return false
}

function isSubtree(root: TreeNode | null, subRoot: TreeNode | null): boolean {
    if (!root) return false


    return isSubtreeSame(root, subRoot) || isSubtree(root.left, subRoot) || isSubtree(root.right, subRoot)

};