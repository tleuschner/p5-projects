class Tree {
	constructor() {
		this.root = null;
	}

	addValue(val) {
		let node; 
		if (this.root == null) {
			node = new Node(val, width / 2, 16);
			this.root = node;
		} else {
			node = new Node(val);
			this.root.addNode(node);
		}
	}

	traverse() {
		this.root.visit(this.root);
	}

	search(val) {
		let found = this.root.find(val);
		return found;
	}
}