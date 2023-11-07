class Node {
  constructor(data){
    this.data = data;
    this.left = null;
    this.right = null;
  }
}

class Tree {
  constructor(arr){
    this.root = this.buildTree(arr);
    this.inOrderTraversed = [];
    this.preOrderTraversed = [];
    this.postOrderTraversed = [];
  }

  buildTree(arr){
    let cleanArr = [... new Set(arr)] /* remove dublicates */;
    let sortedArr = cleanArr.sort((a, b) => a - b);
    let n = sortedArr.length;
    let root = this.sortedArrToBst(sortedArr, 0, n -1);
    return root;
  }

  sortedArrToBst(arr, start, end){
    if (start > end) return null;

    let mid = parseInt((start + end) / 2);
    let node = new Node(arr[mid]);
    node.left = this.sortedArrToBst(arr, start, mid - 1);
    node.right  = this.sortedArrToBst(arr, mid + 1, end);
    return node;
  }

  insert(value, node = this.root){
    if (node == null) return new Node(value);
    if (value < node.data){
      node.left = this.insert(value, node.left);
    }
    else if (value > node.data){
      node.right = this.insert(value, node.right);
    }
    return node;
  }

  delete(value, node = this.root){
    if (node == null) return null;
    if (value < node.data){
      node.left = this.delete(value, node.left);
    }
    else if (value > node.data){
      node.right = this.delete(value, node.right);
    } else {
      if (node.left == null) return node.right;
      if (node.right == null) return node.left;

      node.data = this.minValue(node.right);
      node.right = this.delete(node.data, node.right);
    }
  }

  minValue(node){
    let min = node.data;
    while(node.left !== null){
      min = node.left.data;
      node = node.left;
    }
    return min;
  }

  find(value, node = this.root){
    if (value == node.data) return node;
    if (value < node.data){
      return this.find(value, node.left);
    }
    else if (value > node.data){
      return this.find(value, node.right);
    }
  }

  levelOrder(cb = this.toArray, node = this.root){
    if (node == null) return null;
    let leverOrderTraversed = [];
    let queue = [];
    queue.push(node);
    while (queue.length){
      let node = queue.shift();
      cb(node.data, leverOrderTraversed);
      if (node.left != null) queue.push(node.left);
      if (node.right != null) queue.push(node.right);
    }
    return leverOrderTraversed;
  }

  inOrder(cb = this.toArray, node = this.root){
    if (node == null) return;
    this.inOrder(cb, node.left);
    cb(node.data, this.inOrderTraversed);
    this.inOrder(cb, node.right);
    return this.inOrderTraversed;
  }

  preOrder(cb = this.toArray, node = this.root){
    if (node == null) return;
    cb(node.data, this.preOrderTraversed);
    this.preOrder(cb, node.left);
    this.preOrder(cb, node.right);
    return this.preOrderTraversed;
  }

  postOrder(cb = this.toArray, node = this.root){
    if (node == null) return;
    this.postOrder(cb, node.left);
    this.postOrder(cb, node.right);
    cb(node.data, this.postOrderTraversed);
    return this.postOrderTraversed;
  }

  toArray(value, arr){
    arr.push(value);
  }

  height(node = this.root){
    if (node == null) return 0;
    let leftHeight = this.height(node.left);
    let rightHeight = this.height(node.right);
    return Math.max(leftHeight, rightHeight) + 1;
  }

  depth(value, node = this.root){
    if (value == node.data) return 0;
    if (value < node.data){
      return this.depth(value, node.left) + 1;
    }
    if (value > node.data){
      return this.depth(value, node.right) + 1;
    }
  }

  isBalanced(){
    let allNodes = this.inOrder();
    this.inOrderTraversed = [];
    for (let i = 0; i < allNodes.length; i++){
      let node = this.find(allNodes[i]);
      let leftSubTree = this.height(node.left);
      let rightSubTree =this.height(node.right);
      if (Math.abs(leftSubTree - rightSubTree) > 1) return false;
    }
    return true;
  }

  reBalance(){
    this.root = this.buildTree(this.inOrder());
    this.preOrderTraversed = [];
    this.postOrderTraversed = [];
  }
}

const prettyPrint = (node, prefix = "", isLeft = true) => {
  if (node === null) {
    return;
  }
  if (node.right !== null) {
    prettyPrint(node.right, `${prefix}${isLeft ? "│   " : "    "}`, false);
  }
  console.log(`${prefix}${isLeft ? "└── " : "┌── "}${node.data}`);
  if (node.left !== null) {
    prettyPrint(node.left, `${prefix}${isLeft ? "    " : "│   "}`, true);
  }
};

function createRandomArr(n = 12){
  let arr = [];
  for (let i = 0; i < n; i++){
    let randomNumber = Math.floor(Math.random() * 99);
    arr.push(randomNumber);
  }
  return arr;
}

let example = createRandomArr();
let myTree = new Tree(example);
myTree.insert(101);
myTree.insert(103);
prettyPrint(myTree.root);

console.log(myTree.isBalanced());
console.log(myTree.levelOrder());
console.log(myTree.preOrder());
console.log(myTree.inOrder());
console.log(myTree.postOrder());
myTree.reBalance();
console.log(myTree.isBalanced());
prettyPrint(myTree.root);
console.log(myTree.levelOrder());
console.log(myTree.preOrder());
console.log(myTree.inOrder());
console.log(myTree.postOrder());
