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

function invertTree(root: TreeNode | null): TreeNode | null {
    if (!root) return null;

    let r = invertTree(root.right)
    let l = invertTree(root.left)
    root.left = r
    root.right = l

    return root;
};