export const prettyPrint = (node, prefix = '', isLeft = true) => {
    if (node === null) {
        return;
    }
    if (node.right !== null) {
        prettyPrint(node.right, `${prefix}${isLeft ? '│   ' : '    '}`, false);
    }
    console.log(`${prefix}${isLeft ? '└── ' : '┌── '}${node.value}`);
    if (node.left !== null) {
        prettyPrint(node.left, `${prefix}${isLeft ? '    ' : '│   '}`, true);
    }
};

function removeDuplicates(arr) {
    let uniqueArray = [...new Set(arr)];
    return uniqueArray;
}

function sortArray(arr) {
    return arr.sort((a, b) => a - b);
}

function randomArray(size) {
    const arr = [];
    while (arr.length < size) {
        const rand = Math.floor(Math.random() * 100);
        arr.push(rand);
    }
    return arr;
}

export function randomSortedArray(size = 10, sorted = true, duplicates = false) {
    let arr = randomArray(size);
    if (sorted) arr = sortArray(arr);
    if (!duplicates) arr = removeDuplicates(arr);
    return arr;
}