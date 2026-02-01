import { Compare, defaultCompare, printNodeVis } from "../../util.js";
import { BinarySearchTree } from "./binary-search-tree.js";

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

  rotationRL(node) {
    node.right = this.rotationLL(node.right)
    return this.rotationRR(node)
  }



}
