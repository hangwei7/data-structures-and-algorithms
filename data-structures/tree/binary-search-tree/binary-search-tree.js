import { Compare, defaultCompare } from "../../../util.js";
import { Node } from "../../models/node.js";

export class BinarySearchTree {
  constructor(compareFn = defaultCompare) {
    this.compareFn = compareFn;
    this.root = null;
  }

  insert(key) {
    if (this.root === null) {
      this.root = new Node(key);
    } else {
      this.insertNode(this.root, key);
    }
  }

  insertNode(node, key) {
    if (this.compareFn(key, node.key) === Compare.LESS_THAN) {
      if (node.left === null) {
        node.left = new Node(key)
      } else {
        this.insertNode(node.left, key)
      }
    } else {
      if (node.right === null) {
        node.right = new Node(key)
      } else {
        this.insertNode(node.right, key)
      }
    }
  }
}

const tree = new BinarySearchTree();

tree.insert(5);
tree.insert(3);
tree.insert(7);
tree.insert(2);
tree.insert(4);
tree.insert(6);
tree.insert(8);

// console.log(JSON.stringify(tree, null, 2));

function printNode(node, prefix = "", isLast = true) {
  if (node === null) return;

  console.log(prefix + (isLast ? "└── " : "├── ") + node.key);

  const children = [node.left, node.right].filter((n) => n !== null);
  children.forEach((child, i) => {
    const newPrefix = prefix + (isLast ? "    " : "│   ");
    printNode(child, newPrefix, i === children.length - 1);
  });
}

// 使用方式：
console.log("Binary Search Tree:");
printNode(tree.root);
