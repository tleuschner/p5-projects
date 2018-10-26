
/*

//Run with the p5.js library


let lineData;
let stationData;
let myJSON;

function preload() {
	lineData = loadJSON('json/allLines.json');
	stationData = loadJSON('json/stations.json');
}


let connectedStations = {
	connections: []
}

function setup() {
	noCanvas();
	let lines = [];
	for (let station of stationData.stations) {
		connectedStations.connections.push({
			//Jetzige Station
			stationID: station.hafasID,
			//Stationsname
			stationName: station.longName,
			//Linien, die an dieser Station abfahren
			lines: new Set(),
			//Haltestellen, die von dieser Station aus erreichbar sind
			connectsTo: new Set(),
		});
	}

	console.log(connectedStations);




	let set = new Set();

	for (const l of lineData.linien) {
		let lineNumber = l.lineId;
		let linePath = l.lineIDs;
		let lineLength = linePath.length;
		for (const station of connectedStations.connections) {
			if (linePath.includes(station.stationID)) {
				let indexOfStation = linePath.indexOf(station.stationID);
				if (indexOfStation != 0) {
					//fügt vorherige haltestelle hinzu, falls nicht anfang
					station.connectsTo.add(linePath[--indexOfStation]);
				}
				if(indexOfStation != lineLength-2) {
					//fügt nächste haltestelle hinzu, falls nicht ende
					station.connectsTo.add(linePath[indexOfStation+=2]);
				}
				station.lines.add(lineNumber);
			}
		}
	}

	for (const station of connectedStations.connections) {
		station.connectsTo = Array.from(station.connectsTo);
		station.lines = Array.from(station.lines);
	}

	myJSON = JSON.stringify(connectedStations);

	function download(content, fileName, contentType) {
		var a = document.createElement("a");
		var file = new Blob([content], { type: contentType });
		a.href = URL.createObjectURL(file);
		a.download = fileName;
		a.click();
	}
	download(myJSON, 'connectedStations.json', 'text/plain');



}
*/