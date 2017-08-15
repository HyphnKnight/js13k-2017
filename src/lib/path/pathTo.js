import { filter, map, qkSort } from '../array';
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
        const newNeighbors = map(filter(neighbors, neighbor => !nodes.find(node => node.id === getUniqueId(neighbor))), neighbor => createNode(getUniqueId(neighbor), neighbor, rootNode.resist + resistFunc(rootNode.data, neighbor), rootNode.resist + resistFunc(rootNode.data, neighbor) + priorityFunc(neighbor, destination), rootNode));
        nodes.push(...newNeighbors);
        nodes = qkSort(nodes, node => node.hasBeenRoot ? Number.MAX_VALUE : node.priority);
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
//# sourceMappingURL=pathTo.js.map