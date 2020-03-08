'use strict';

// base node object
class Node {
	constructor(key, value){
		this.key = key;
		this.value = value;
		this.left = null;
		this.right = null;
		this.count = 0;
	}
}

class BinaryTree {
	constructor(bt){
	 	// reference to root node
		this.root = bt;
	}
	// in order traversing
	inOrder(result, index) {
		inOrder(this.root, result, index);
	}

	// post order traversing
	bfs() {
		return bfs(this.root);
	}
	addNode(value){
		this.root = addNode(this.root, value);
	}
}

function addNode(node, value){
	if (!node) return new Node(value, value);

	if (node.value > value ){
		node.left = addNode( node.left, value);
	} else if (node.value < value) {
		node.right = addNode(node.right, value);
	} else if (node.value == value){
		node.value = value;
	}

	node.count = 1 + getSize(node.left) + getSize(node.right);

	return node;
}

function inOrder(node, result, index){
	if (node === null) return null;
	inOrder(node.left, result, index);
	result.push(node.value);
	index[0]++;
	inOrder(node.right, result, index);
}

function bfs(node){
	const queue = [];
	const values = [];
	queue.push(node);

	while(queue.length > 0){
		const tempNode = queue.shift();
		values.push(tempNode.value);
		if (tempNode.left){
			queue.push(tempNode.left);
		}

		if (tempNode.right){
			queue.push(tempNode.right);
		}
	}

	return values;
}


module.exports = BinaryTree;
