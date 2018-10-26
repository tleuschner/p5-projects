let tree;
function setup() {
	createCanvas(500, 500);
	background(55);
	tree = new Tree();
	for (let i = 0; i < 10; i++) {
		tree.addValue(floor(random(0,20)));
	}
	//tree.addValue(5);
	tree.traverse();
	let result = tree.search(5);
	if(result) {
		console.log(result);
	} else {
		console.log("nope");
	}
}

function draw() {

}