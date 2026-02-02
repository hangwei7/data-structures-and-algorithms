import { Compare, defaultCompare, printNodeVis } from "../../util.js";
// 在 ES6 模块中，当你导入一个模块时，该模块的所有顶层代码（包括文件底部的测试代码）都会被执行一次。
import { BinarySearchTree } from "./binary-search-tree.js";
import { Node } from "../models/node.js";

// 计数器
const BalanceFactor = {
  UNBALANCED_RIGHT: 1,
  SLIGHTLY_UNBALANCED_RIGHT: 2,
  BALANCED: 3,
  SLIGHTLY_UNBALANCED_LEFT: 4,
  UNBALANCED_LEFT: 5
};

class AVLTree extends BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    // JavaScript 继承中的强制规则：在子类中使用 this 之前，必须先调用 super()
    // 即使看起来代码是重复的，super() 调用是必须的。它的作用是：
    // 初始化继承链：建立父类的属性和方法的正确绑定
    // 解锁 this：只有调用过 super() 后，this 才可以在子类中使用
    super(compareFn); // 调用父类 BinarySearchTree 的构造函数，让父类完成自己的初始化。

    // 待会儿试试删掉，super已经设置了
    this.compareFn = compareFn;
    this.root = null;
  }

  getNodeHeight(node) {
    if (node == null) {
      return -1;
    }
    return (
      Math.max(this.getNodeHeight(node.left), this.getNodeHeight(node.right)) +
      1
    );
  }

  getBalanceFactor(node) {
    const heightDifference = this.getNodeHeight(node.left) - this.getNodeHeight(node.right)
    switch (heightDifference) {
        case -2:
            return BalanceFactor.UNBALANCED_RIGHT // 右边高，该旋转了
        case -1:
            return BalanceFactor.SLIGHTLY_UNBALANCED_RIGHT
        case 1:
            return BalanceFactor.SLIGHTLY_UNBALANCED_LEFT
        case 2: 
            return BalanceFactor.UNBALANCED_LEFT
        default:
            return BalanceFactor.BALANCED
    }
  }

  // 左-左，右旋转 
  rotationLL(node) {
    const tmp = node.left  // 三部曲
    node.left = tmp.right
    tmp.right = node;
    return tmp
  }

  // 右-右，左旋转。1.右侧子节点的高度大于左侧子节点的高度。2.左侧子节点也是平衡或者左侧较重的。
  rotationRR(node) {
    const tmp = node.right
    node.right = tmp.left
    tmp.left = node
    return tmp
  }

  // 左-右，先左旋转再右旋转。
  rotationLR(node) {
    node.left = this.rotationRR(node.left)
    return this.rotationLL(node)
  }

  // 右-左，先右旋再左旋。
  rotationRL(node) {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }

  // 向AVL树插入节点
  insert(key) {
    this.root = this.insertNode(this.root, key)
  }

  // 向AVL树插入节点 - 辅助函数
  insertNode(node, key) {
    // 和BST树中的插入逻辑一样
    if (node == null) {
      return new Node(key)
    } else if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      node.left = this.insertNode(node.left, key) // 往下一级钻入
    } else if (this.compareFn(key, node.key) === Compare.BIGGER_THAN) {
      node.right = this.insertNode(node.right, key)
    } else {
      return node // 重复的键
    }

    // 计算平衡因子
    const balanceFactor = this.getBalanceFactor(node)
    // 左子树不平衡
    if (balanceFactor === BalanceFactor.UNBALANCED_LEFT) {
      // 插入的键值比左节点小（此时key其实已经插入进树里了，这里的key更像是它的影子）
      if (this.compareFn(key, node.left.key) === Compare.LESS_THAN) {
        node = this.rotationLL(node)
      } else {
        node = this.rotationLR(node)
      }
    }
    // 右子树不平衡
    if (balanceFactor === BalanceFactor.UNBALANCED_RIGHT) {
      if (this.compareFn(key, node.right.key) === Compare.BIGGER_THAN) {
        node = this.rotationRR(node)
      } else {
        node = this.rotationRL(node)
      }
    }

    return node
  }

}


const tree = new AVLTree()

tree.insert(11);
tree.insert(7);
tree.insert(15);
tree.insert(5);
tree.insert(3);
tree.insert(9);
tree.insert(8);
tree.insert(10);
tree.insert(13);
tree.insert(12);
tree.insert(14);
tree.insert(20);
tree.insert(18);
tree.insert(25);
tree.insert(6)


console.log("AVL Tree:");

printNodeVis(tree.root);
