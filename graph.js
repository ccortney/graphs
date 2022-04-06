class Node {
  constructor(value, adjacent = new Set()) {
    this.value = value;
    this.adjacent = adjacent;
  }
}

class Graph {
  constructor() {
    this.nodes = new Set();
  }

  // this function accepts a Node instance and adds it to the nodes property on the graph
  addVertex(vertex) {
    this.nodes.add(vertex);
  }

  // this function accepts an array of Node instances and adds them to the nodes property on the graph
  addVertices(vertexArray) {
    for (let vertex of vertexArray) {
      this.nodes.add(vertex);
    }
  }

  // this function accepts two vertices and updates their adjacent values to include the other vertex
  addEdge(v1, v2) {
    v1.adjacent.add(v2);
    v2.adjacent.add(v1);
  }

  // this function accepts two vertices and updates their adjacent values to remove the other vertex
  removeEdge(v1, v2) {
    v1.adjacent.delete(v2);
    v2.adjacent.delete(v1);
  }

  // this function accepts a vertex and removes it from the nodes property, it also updates any adjacency lists that include that vertex
  removeVertex(vertex) {
    for (let node in vertex.adjacent) {
      node.adjacent.delete(vertex);
    }
    this.nodes.delete(vertex)
  }

  // this function returns an array of Node values using DFS
  depthFirstSearch(start) {
    const stackToVisit = [start];
    const addedToStack = new Set();
    addedToStack.add(start);
    const arr = [];

    while (stackToVisit.length) {
      let current = stackToVisit.pop();
      arr.push(current.value);

      for (let node of current.adjacent) {
        if (!addedToStack.has(node)) {
          stackToVisit.push(node);
          addedToStack.add(node);
        }
      }
    }
    return arr;
  }

  // this function returns an array of Node values using BFS
  breadthFirstSearch(start) {
    const queueToVisit = [start];
    const addedToQueue = new Set();
    addedToQueue.add(start);
    const arr = [];

    while (queueToVisit.length) {
      let current = queueToVisit.shift();
      arr.push(current.value);

      for (let node of current.adjacent) {
        if (!addedToQueue.has(node)) {
          queueToVisit.push(node);
          addedToQueue.add(node);
        }
      }
    }
    return arr;
  }
}

module.exports = {Graph, Node}