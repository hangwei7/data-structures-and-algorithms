import { Compare, defaultCompare, printNodeVis } from "../../util.js";
// 在 ES6 模块中，当你导入一个模块时，该模块的所有顶层代码（包括文件底部的测试代码）都会被执行一次。
import { BinarySearchTree } from "./binary-search-tree.js";
import { Node } from "../models/node.js";

const Colors = {
  RED: 0,
  BLACK: 1
};

class RedBlackNode extends Node {
    constructor(key) {
        super(key)
        this.key = key
        this.color = Colors.RED
        this.parent = null
    }

    isRed() {
        return this.color === Colors.RED
    }
}

class RedBlackTree extends BinarySearchTree {
    constructor(compareFn = defaultCompare) {
        super(compareFn)
        this.compareFn = compareFn
        this.root = null
    }

    // 向红黑树中插入节点
    insert(key) {
        if (this.root == null) {
            this.root = new RedBlackNode(key)
            this.root.color = Colors.BLACK
        } else {
            const newNode = this.insertNode(this.root, key)
            this.fixTreeProperties(newNode)
        }
    }

    // 重写
    insertNode(node, key) {

    }


}

