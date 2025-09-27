class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(arr) {
        this.root = this.buildTree(arr);
    }

    buildTree(arr) {
        return this.#buildTree(arr, 0, arr.length - 1);
    }

    #buildTree(arr, start, end) {
        if (start > end) return null;

        let mid = start + Math.floor((end - start) / 2);
        let root = new Node(arr[mid]);

        root.left = this.#buildTree(arr, start, mid - 1);
        root.right = this.#buildTree(arr, mid + 1, end);

        return root;
    }

    insertItem(value) {
        this.root = this.#insert(this.root, value);
    }

    #insert(root, value) {
        if (root === null)
            return new Node(value);

        if (root.value === value)
            return root;

        if (value < root.value) {
            root.left = this.#insert(root.left, value);
        }
        else if (value > root.value) {
            root.right = this.#insert(root.right, value);
        }

        return root;
    }

    deleteItem(value) {
        this.root = this.#delete(this.root, value);
    }

    #delete(root, value) {
        if (!root) return null;

        if (value < root.value) {
            root.left = this.#delete(root.left, value);
        } else if (value > root.value) {
            root.right = this.#delete(root.right, value);
        } else {
            // Node found
            if (!root.left) return root.right;   // Only right child or none
            if (!root.right) return root.left;   // Only left child

            // Two children: get inorder successor
            const succ = this.#getSuccessor(root);
            root.value = succ.value;
            root.right = this.#delete(root.right, succ.value);
        }
        return root;
    }

    #getSuccessor(node) {
        let curr = node.right;
        while (curr && curr.left) curr = curr.left;
        return curr;
    }

    findItem(value) {
        return this.#search(this.root, value);
    }

    #search(root, value) {
        // Base Cases: root is null or value is present at root
        if (root === null || root.value === value)
            return root;

        // Key is greater than root's value
        if (root.value < value)
            return this.#search(root.right, value);

        // Key is smaller than root's value
        return this.#search(root.left, value);
    }

    levelOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }
        if (!this.root) return;

        const queue = [this.root];
        let index = 0;

        while (index < queue.length) {
            const node = queue[index++];
            callback(node);

            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        function traverse(node) {
            if (!node) return;
            traverse(node.left);     // Left
            callback(node);          // Root
            traverse(node.right);    // Right
        }

        traverse(this.root);
    }

    preOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        function traverse(node) {
            if (!node) return;
            callback(node);          // Root
            traverse(node.left);     // Left
            traverse(node.right);    // Right
        }

        traverse(this.root);
    }

    postOrderForEach(callback) {
        if (typeof callback !== "function") {
            throw new Error("A callback function is required");
        }

        function traverse(node) {
            if (!node) return;
            traverse(node.left);     // Left
            traverse(node.right);    // Right
            callback(node);          // Root
        }

        traverse(this.root);
    }
}