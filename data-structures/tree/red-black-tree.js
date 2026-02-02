import { Compare, defaultCompare, printNodeVis } from "../../util.js";
// 在 ES6 模块中，当你导入一个模块时，该模块的所有顶层代码（包括文件底部的测试代码）都会被执行一次。
import { BinarySearchTree } from "./binary-search-tree.js";
import { Node } from "../models/node.js";

class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }

    
}

