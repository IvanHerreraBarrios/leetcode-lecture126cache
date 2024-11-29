//146

var Node = function(key, value, next, previous){
    this.key = key
    this.value = value
    this.next = next
    this.previous = previous
 }
var LRUCache = function(capacity) {
    this.capacity = capacity
    this.head = null
    this.tail = null
    this.index = {}
    this.size = 0
};

/** 
 * @param {number} key
 * @return {number}
 */
LRUCache.prototype.get = function(key) {
    const node = this.index[key]
    if(!node) return -1

    //update
    this.moveToFront(node)
    return node.value
};

LRUCache.prototype.moveToFront = function(node){
    if(node.previous){
        //si es la cola, actualizarla
        if(!node.next) this.tail = node.previous

        //interconectamos anterior con siguiente
        node.previous.next = node.next
        if(node.next) node.next.previous = node.previous

        //actualizamos nodo para que sea el head
        this.head.previous = node
        node.next = this.head
        node.previous = null
        this.head = node
    }
}

/** 
 * @param {number} key 
 * @param {number} value
 * @return {void}
 */
LRUCache.prototype.put = function(key, value) {
    if(this.index[key]){
        const node = this.index[key]
        node.value = value
        this.moveToFront(node)
    } else {
        if(this.size === this.capacity) this.evict()

        const node = new Node(key, value, this.head)

        if(this.head){
            this.head.previous = node
            this.head = node
        } else {
            this.head = node
            this.tail = node
        }
        this.index[key] = node
        this.size++
    }
};

LRUCache.prototype.evict = function(){
    delete this.index[this.tail.key]
    this.tail = this.tail.previous
    if(!this.tail){
        this.head = null
    } else {
        this.tail.next = null
    }
    this.size--
}

/** 
 * Your LRUCache object will be instantiated and called as such:
 * var obj = new LRUCache(capacity)
 * var param_1 = obj.get(key)
 * obj.put(key,value)
 */