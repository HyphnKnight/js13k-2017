import { createNode } from './node';
export function pathTo(pathingData) {
    const { start, destination, getUniqueId, getNeighbors, priorityFunc, resistFunc, maxResist } = pathingData;
    if (start === destination)
        return [destination];
    let rootNode = createNode(getUniqueId(start), start, 0, priorityFunc(start, destination));
    let nodes = [rootNode];
    while (nodes[0].data !== destination) {
        rootNode = nodes[0];
        if (rootNode.priority > maxResist)
            return null;
        rootNode.hasBeenRoot = true;
        const neighbors = getNeighbors(rootNode.data);
        const newNeighbors = neighbors
            .filter(neighbor => !nodes.find(node => node.id === getUniqueId(neighbor)))
            .map(neighbor => createNode(getUniqueId(neighbor), neighbor, rootNode.resist + resistFunc(rootNode.data, neighbor), rootNode.resist + resistFunc(rootNode.data, neighbor) + priorityFunc(neighbor, destination), rootNode));
        nodes.push(...newNeighbors);
        nodes = nodes.sort((a,b)=> (b.hasBeenRoot ? Number.MAX_VALUE : b.priority) - (a.hasBeenRoot ? Number.MAX_VALUE : a.priority));
    }
    let endNode = nodes[0];
    const path = [];
    while (endNode) {
        path.unshift(endNode.data);
        endNode = endNode.cameFrom;
    }
    return path;
}
;
