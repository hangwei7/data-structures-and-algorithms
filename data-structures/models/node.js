

// 创建 BinarySearchTree 类
export class Node {
  constructor(key) {
    this.key = key; // 节点值
    this.left = null; // 左子节点
    this.right = null; // 右子节点
  }
  toString() {
    return `${this.key}`;
  }
}
