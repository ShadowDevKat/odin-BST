import { Tree } from "./bst.js";
import { prettyPrint, sortArray } from "./utils.js";

const testArr = [1, 7, 4, 23, 8, 9, 4, 3, 5, 7, 9, 67, 6345, 324];
const sortedTestArr = sortArray(testArr);

const testTree = new Tree(sortedTestArr);

prettyPrint(testTree.root);