class Node {
    constructor(data) {
        this.data = data;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr, 0, arr.length - 1);
    }
    
    buildTree(arr, start, end) {
        if (start > end) return null;
        // Find the middle element
        let mid = start + Math.floor((end - start) / 2);

        // Create root node
        let root = new Node(arr[mid]);

        // Create left subtree
        root.left = this.buildTree(arr, start, mid - 1);
        // Create right subtree
        root.right = this.buildTree(arr, mid + 1, end);

        return root;
    }
}