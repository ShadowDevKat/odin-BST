class Node {
    constructor(value) {
        this.value = value;
        this.left = null;
        this.right = null;
    }
}

export class Tree {
    constructor(arr) {
        this.root = this.#buildTree(arr, 0, arr.length - 1);
    }

    #buildTree(arr, start, end) {
        if (start > end) return null;
        const mid = Math.floor((start + end) / 2);
        const node = new Node(arr[mid]);
        node.left = this.#buildTree(arr, start, mid - 1);
        node.right = this.#buildTree(arr, mid + 1, end);
        return node;
    }

    insert(value) {
        this.root = this.#insert(this.root, value);
    }
    #insert(node, value) {
        if (!node) return new Node(value);
        if (value < node.value) node.left = this.#insert(node.left, value);
        else if (value > node.value) node.right = this.#insert(node.right, value);
        return node;
    }

    delete(value) {
        this.root = this.#delete(this.root, value);
    }
    #delete(node, value) {
        if (!node) return null;

        if (value < node.value) node.left = this.#delete(node.left, value);
        else if (value > node.value) node.right = this.#delete(node.right, value);
        else {
            if (!node.left) return node.right;
            if (!node.right) return node.left;
            const succ = this.#minValueNode(node.right);
            node.value = succ.value;
            node.right = this.#delete(node.right, succ.value);
        }
        return node;
    }
    #minValueNode(node) {
        while (node.left) node = node.left;
        return node;
    }

    find(value) {
        let curr = this.root;
        while (curr) {
            if (value === curr.value) return curr;
            curr = value < curr.value ? curr.left : curr.right;
        }
        return null;
    }

    #requireCallback(cb) {
        if (typeof cb !== "function") throw new Error("A callback function is required");
    }

    levelOrderForEach(callback) {
        this.#requireCallback(callback);
        if (!this.root) return;
        const queue = [this.root];
        for (let i = 0; i < queue.length; i++) {
            const node = queue[i];
            callback(node);
            if (node.left) queue.push(node.left);
            if (node.right) queue.push(node.right);
        }
    }

    inOrderForEach(callback) {
        this.#requireCallback(callback);
        function traverse(node) {
            if (!node) return;
            traverse(node.left);
            callback(node);
            traverse(node.right);
        }
        traverse(this.root);
    }

    preOrderForEach(callback) {
        this.#requireCallback(callback);
        function traverse(node) {
            if (!node) return;
            callback(node);
            traverse(node.left);
            traverse(node.right);
        }
        traverse(this.root);
    }

    postOrderForEach(callback) {
        this.#requireCallback(callback);
        function traverse(node) {
            if (!node) return;
            traverse(node.left);
            traverse(node.right);
            callback(node);
        }
        traverse(this.root);
    }

    height(value) {
        const node = this.find(value);
        return node ? this.#height(node) : null;
    }
    #height(node) {
        if (!node) return -1; // height of empty subtree
        return Math.max(this.#height(node.left), this.#height(node.right)) + 1;
    }

    depth(value) {
        let curr = this.root, d = 0;
        while (curr) {
            if (curr.value === value) return d;
            curr = value < curr.value ? curr.left : curr.right;
            d++;
        }
        return null;
    }

    isBalanced() {
        function check(node) {
            if (!node) return 0;
            const left = check(node.left);
            if (left === -1) return -1;
            const right = check(node.right);
            if (right === -1) return -1;
            if (Math.abs(left - right) > 1) return -1;
            return Math.max(left, right) + 1;
        }
        return check(this.root) !== -1;
    }

    rebalance() {
        const values = [];
        this.inOrderForEach(node => values.push(node.value));
        this.root = this.#buildTree(values, 0, values.length - 1);
    }
}