import { Tree } from "./bst.js";
import { prettyPrint, randomSortedArray } from "./utils.js";

let testArr = randomSortedArray(20);
const myTree = new Tree(testArr);
prettyPrint(myTree.root);
console.log("isBalanced: ", myTree.isBalanced());
printData();
massInsert();
prettyPrint(myTree.root);
console.log("isBalanced: ", myTree.isBalanced());
myTree.rebalance();
prettyPrint(myTree.root);
console.log("isBalanced: ", myTree.isBalanced());
printData();

function massInsert() {
    const arr = randomSortedArray(200);
    arr.forEach(value => myTree.insert(value));
}

function printData() {
    const traversals = [
        ["Level", myTree.levelOrderForEach],
        ["PreOrder", myTree.preOrderForEach],
        ["PostOrder", myTree.postOrderForEach],
        ["InOrder", myTree.inOrderForEach],
    ];

    for (const [name, method] of traversals) {
        const values = [];
        method.call(myTree, node => values.push(node.value));
        console.log(`${name} Traversal: [${values.join(", ")}]`);
    }
}