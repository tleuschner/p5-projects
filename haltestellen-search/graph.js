class Graph {
    constructor() {
        this.nodes = [];
        this.graph = {};
        this.end = null;
        this.start = null;
    }

    addNode(node) {
        //Node in Array
        this.nodes.push(node);
        let title = node.value;
        //Node in das Objekt
        this.graph[title] = node;
    }

    getNode(actor) {
        let n = this.graph[actor];
        return n;
    }

    setEnd(actor) {
        this.end = this.graph[actor];
        return this.end;
    }

    setStart(actor) {
        this.start = this.graph[actor];
        return this.start;
    }

    reset() {
        for (const node of this.nodes) {
            node.searched = false;
            node.parent = null;
        }
    }
}