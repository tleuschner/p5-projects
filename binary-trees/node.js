class Node {
	constructor(val,x,y) {
		this.value = val;
		this.left = null;
		this.right = null;
		this.x = x;
		this.y = y;
	}

	addNode(node) {
		if (node.value < this.value) {
			if (this.left == null) {
				this.left = node;
				this.left.setX(this.x - 50);
				this.left.setY(this.y + 20);
			} else {
				this.left.addNode(node);
			}
		} else if (node.value > this.value) {
			if (this.right == null) {
				this.right = node;
				this.right.setX(this.x + 50);
				this.right.setY(this.y + 20);
			} else {
				this.right.addNode(node);
			}
		}
	}

	visit(parent) {
		if (this.left != null) {
			this.left.visit(this);
		}

		console.log(this.value);
		stroke(255);
		fill(50);
		ellipse(this.x, this.y, 20, 20);
		line(parent.x, parent.y, this.x, this.y);
		fill(255);
		noStroke();
		textAlign(CENTER);
		text(this.value, this.x, this.y);
		if (this.right != null) {
			this.right.visit(this);
		}
	}

	find(val) {
		if (this.value == val) {
			return this;
		} else if (this.value < val && this.right != null) {
			return this.right.find(val);
		} else if (this.value > val && this.left != null) {
			return this.left.find(val);
		} 
		return null; //if not found
	}

	setX(x) {
		this.x = x;
	}
	
	setY(y) {
		this.y = y;
	}

}