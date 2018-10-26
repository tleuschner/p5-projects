let data;
let graph;
let dropdown;

function preload() {
	data = loadJSON('bacon.json');
}


function setup() {
	graph = new Graph();
	dropdown = createSelect();
	dropdown.changed(bfs);
	noCanvas();

	let movies = data.movies;
	for (const m of movies) {
		let movie = m.title;
		let cast = m.cast;
		let movieNode = new Node(movie);
		graph.addNode(movieNode);

		for (const c of cast) {
			let actor = c;
			let actorNode = graph.getNode(actor);
			if (actorNode == undefined) {
				actorNode = new Node(actor);
				dropdown.option(actor);
			}
			graph.addNode(actorNode);
			movieNode.addEdge(actorNode);
		}
	}
	noLoop();
}


function bfs() {
	graph.reset();
	let start = graph.setStart(dropdown.value());
	let end = graph.setEnd("Kevin Bacon");

	let queue = [];
	start.searched = true;
	queue.push(start);

	while (queue.length > 0) {
		let current = queue.shift();
		if (current == end) {
			console.log("Found!" + current.value);
			break;
		}
		let edges = current.edges;
		for (const neighbor of edges) {
			if (!neighbor.searched) {
				neighbor.searched = true;
				neighbor.parent = current;
				queue.push(neighbor);
			}
		}
	}

	let path = [];
	path.push(end);
	let next = end.parent;
	while (next != null) {
		path.push(next);
		next = next.parent;
	}
	//Richtige Reihenfolge
	path.reverse();
	let txt = '';
	for (const node of path) {
		let n = node;
		txt += node.value + ' --> ';
	}
	createP(txt);
}

