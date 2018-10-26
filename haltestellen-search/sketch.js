let rnvData;
let graph;
let dropdownStart;
let dropdownEnd;
let idToName;
let nameToId;


function preload() {
	rnvData = loadJSON("json/connectedStations.json");
}

function setup() {
	graph = new Graph();
	dropdownStart = document.getElementById('start');
	dropdownEnd = document.getElementById('end');
	dropdownStart.addEventListener("change", () => {
		console.log("changed");
		bfs();
	});
	dropdownEnd.addEventListener("change", () => {
		bfs();
	});

	

	idToName = new Map();
	nameToId = new Map();
	for (const connection of rnvData.connections) {
		nameToId.set(connection.stationName, connection.stationID);
		idToName.set(connection.stationID, connection.stationName);
	}

	let stations = rnvData.connections;
	for (const station of stations) {
		let id = station.stationID;
		let connections = station.connectsTo;
		let stationNode = new Node(id);
		graph.addNode(stationNode);
		
		for (const c of connections) {
			let connectingStation = c;
			let connectionNode = graph.getNode(connectingStation);
			if(connectionNode == undefined) {
				connectionNode = new Node(connectingStation);
				//dropdownStart.option(idToName.get(connectionNode.value));
				//dropdownEnd.option(idToName.get(connectionNode.value));
			}
			graph.addNode(connectionNode);
			stationNode.addEdge(connectionNode);
		}
	}
	noLoop();
	noCanvas();
}

function bfs() {
	graph.reset();
	let start = graph.setStart(nameToId.get(dropdownStart.value));
	let end = graph.setEnd(nameToId.get(dropdownEnd.value));

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
	for(let i = 0; i < path.length; i++) {
		let n = path[i];
		txt += idToName.get(n.value);
		if(i != path.length-1) {
			txt += ' --> ';
		}
	}

	createP(txt);
}

function addDropDownValues(p5Dropdown) {
	for (const connection of rnvData.connections) {
		p5Dropdown.option(connection.stationName);
	}
}