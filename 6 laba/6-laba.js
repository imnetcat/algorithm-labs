'use strict';

const BinaryTree = require('./BinaryTree');
const BinarySearchTree = require('./BinarySearchTree');

// Node instance
class Node {
	constructor(value, left = null, right = null){
		this.value = value;
		this.left = left;
		this.right = right;
	}
};

// Creating this binary tree:
//	            0
//	         /    \
//	        1      2
//	       / \    /
//	      3   4  5
//	       \     \
//	        6    7
//           \
//           8
const n8 = new Node(8);
const n7 = new Node(7);
const n4 = new Node(4);
const n6 = new Node(6, null, n8);
const n3 = new Node(3, null, n6);
const n1 = new Node(1, n3, n4);
const n5 = new Node(5, null, n7);
const n2 = new Node(2, n5);
const n0 = new Node(0, n1, n2),
			root = n0;

const bt = new BinaryTree(root);

// Function that change BT nodes values in in-order
//   fashion to the values of "inorder" array
const changeNodeValuesInorder = (currentNode, inorder, index) => {
	if(currentNode === null) return null;

	changeNodeValuesInorder(currentNode.left, inorder, index);

	currentNode.value = inorder[index[0]];
	index[0] += 1;

	changeNodeValuesInorder(currentNode.right, inorder, index);
}

// Function that convert binary tree to binary search tree
const binaryTree2BinarySearchTree = (bt) => {
	if(!(bt instanceof BinaryTree)){
		throw 'argument must be an "BinaryTree" instance';
	}

	const inorder = [];
	const index = [ 0 ];

	// Make in-order traversal of binary tree
	bt.inOrder(inorder, index);

	// Sort the in-ordered array
	const sorted = inorder.sort();
	index[0] = 0;

	// Copy inputed binary tree...
	const btCopy = new Object(bt);

	// Modifies tree by changing node values while traversing
	//   tree inorder fashion...');
	changeNodeValuesInorder(btCopy.root, sorted, index);

	return btCopy;
}

const sumsOfConsecutiveNodes = (bst, s) => {
	if(!(bst instanceof BinarySearchTree)){
		throw 'argument must be an "BinarySearchTree" instance';
	}
	const findSums = (node, result, s, currSeq = []) => {
		if(!node) return;

		currSeq.push(node.data);
		const currSum = currSeq.reduce( (a, b) => a + b );
		if(currSum > s){
			return;
		}
		if(currSum === s){
			result.push(currSeq);
			return;
		}

		findSums(node.left, result, s);
		findSums(node.right, result, s);
		findSums(node.left, result, s, Array.from(currSeq));
		findSums(node.right, result, s, Array.from(currSeq));
	}
	const result = [];
	const root = bst.getRootNode();
	findSums(root, result, s);
	return result;
}

const s = 13;

// USE //

console.log('\nInput parameter "S": ' + s + '\n');

console.log('\nInput binary tree bfs: ');
console.log(bt.bfs());

console.log('\nInput binary tree inorder: ');
const inorder1 = [];
const i = [ 0 ];
bt.inOrder(inorder1, i);
console.log(inorder1);

console.log('\nVisualise input binary tree')
console.log(`
	           0
	         /   \\
	        1     2
	       / \\   /
	      3   4  5
	       \\     \\
	        6     7
                 \\
                  8`);

console.log('\nConvert an input binary tree into a binary search tree.');

console.log('Binary search tree creating...');

var bst = new BinarySearchTree();

console.log('Binary search tree has been created!');

console.log('Converting data from BT to BST...');

const btEx = binaryTree2BinarySearchTree(bt);
btEx.bfs().forEach( el => bst.insert(el));

console.log('\nBinary tree has been converted to Binary Search tree!\n');

console.log('Binary search tree bfs: ');
console.log(bst.bfs());

console.log('\nBinary search tree inorder: ');
const inorder2 = [];
bst.inorder(inorder2);
console.log(inorder2);

console.log('\nVisualise outpute binary search tree');
console.log(`
	           5
	         /   \\
	        3     8
	       / \\   /
	      0   4  6
	       \\     \\
	        1     7
                 \\
                  2`);

console.log('\nSearch for sums of consecutive nodes in the tree');
console.log('Sum ("s" parameter) = ' + s);
console.log('Sequences: ');
console.dir(sumsOfConsecutiveNodes(bst, s));
console.log('\n');
