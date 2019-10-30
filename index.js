// section 1

function User(firstName, lastName, age, gender) {
  this.firstName = firstName;
  this.lastName = lastName;
  this.age = age;
  this.gender = gender;
};

const user1 = new User("eloise", "barrow", 31, "f");

const user200 = new User("Jill", "Stamberg", 60, "female");

User.prototype.emailDomain = '@facebook.com';
User.prototype.getEmailAddress = function() {
  return this.firstName + this.lastName + this.emailDomain;
}

// section 2

// constructor functions
function LinkedList() {
  this.head = null; // on initial creation there will be no head or tail so we start by setting to null
  this.tail = null;
}

function Node(value, next, prev) {
  this.value = value;
  this.next = next;
  this.prev = prev;
}

// const LL = new LinkedList();

const node1 = new Node(100, 'node2', 'null');

LinkedList.prototype.addToHead = function(value) {
  let newNode = new Node(value, this.head, null) // 2nd param this.head will be equal to the current head node, which once we perform addToHead should now be the 'next' node
  if (this.head) {
    this.head.prev = newNode; // 'this' is always pointing to LinkedList, not Node
  } else {
    this.tail = newNode;
  }
  this.head = newNode; // in any situation, we want to assign this.head to newNode
};

// let ll = new LinkedList();

// ll.addToHead(100);
// ll.addToHead(200);
// ll.addToHead(300);

LinkedList.prototype.addToTail = function(value) {
  let newNode = new Node(value, null, this.tail);
  if (this.tail) {
    this.tail.next = newNode
  } else {
    this.head = newNode;
  }
  this.tail = newNode;
};

// let myLL = new LinkedList();

// myLL.addToTail(10);
// console.log(myLL)

LinkedList.prototype.removeHead = function() {
  if (!this.head) return null;
  let val = this.head.value;
  this.head = this.head.next;
  if (this.head) {
    this.head.prev = null;
  } else {
    this.tail = null;
  }
  return val;
}

// let ll = new LinkedList();

// ll.addToHead(1000);
// ll.addToHead(2000);
// ll.addToTail(3000);

// ll.removeHead();
// console.log(ll)

LinkedList.prototype.removeTail = function() {
  if (!this.tail) return null; // list is empty
  let val = this.tail.value; // grab value from current tail
  this.tail = this.tail.prev;
  if (this.tail) { 
    this.tail.next = null;
  } else { // indicates there was only one item in the list before
    this.head = null;
  }
  return val;
}

// let ll = new LinkedList();

// ll.addToHead('one');
// ll.addToHead('two');
// ll.addToHead('three');

// console.log(ll.removeTail());

LinkedList.prototype.search = function(searchValue) {
  let currentNode = this.head;
  while (currentNode) {
    if (currentNode.value === searchValue) return currentNode.value;
    else currentNode = currentNode.next;
  }
  return null;
}

// let ll = new LinkedList();

// ll.addToHead(123);
// ll.addToHead(70);
// ll.addToHead('hello');
// ll.addToTail('world');
// ll.addToTail(20);
// ll.addToHead(19);

// console.log(ll.search('world'))

// return all indices of a given value in an array

// FUNCTION START
// CREATE a variable 'currentNode' equal to the value of this.head
// CREATE a variable 'counter' equal to 0
// CREATE a variable 'indices' equal to an empty array
// LOOP thru LinkedList while currentNode is not null
//   IF currentNode = input value
//     PUSH counter value into 'indices'
//   INCREMENT counter by 1
//   REASSIGN the currentNode equal to the next node
// RETURN 'indices'
// FUNCTION END

LinkedList.prototype.indexOf = function(searchValue) {
  let currentNode = this.head;
  let currentIndex = 0;
  let indices = [];
  while (currentNode) {
    if (currentNode.value === searchValue) indices.push(currentIndex);
    currentIndex++;
    currentNode = currentNode.next;
  }
  return indices;
}

let ll = new LinkedList();

ll.addToTail(1);
ll.addToTail(5);
ll.addToTail(3);
ll.addToTail(5);
ll.addToTail(8);
ll.addToTail(7);
ll.addToTail(5);

// ll = 70, 'hello', 70, 123, 'world', 20 

// console.log(ll.indexOf(5));

/************** SECTION 3 BINARY SEARCH TREES ***************/

// constructor function
function BST(value) {
  this.value = value;
  this.left = null;
  this.right = null;
}

BST.prototype.insert = function(value) {
  if (value <= this.value) {
    if (!this.left) this.left = new BST(value);
    else this.left.insert(value);
  } else if (value > this.value) {
    if (!this.right) this.right = new BST(value);
    else this.right.insert(value);
  }
}

let bst = new BST(50);
bst.insert(30);
bst.insert(70);
bst.insert(100);
bst.insert(60);
bst.insert(59);
bst.insert(20);
bst.insert(45);
bst.insert(35);
bst.insert(85);
bst.insert(105);
bst.insert(10);

// console.log(bst.left.right);

BST.prototype.contains = function(value) {
  if (value === this.value) return true;
  else if (value < this.value) {
    if (!this.left) return false;
    else return this.left.contains(value)
  } else if (value > this.value) {
    if (!this.right) return false;
    else return this.right.contains(value)
  }
};

// console.log(bst.contains(105));

BST.prototype.depthFirstTraversal = function(iteratorFunc) {
  // travel through every node and run iteratorFunc on every node
  if (this.left) this.left.depthFirstTraversal(iteratorFunc);
  iteratorFunc(this.value);
  if (this.right) this.right.depthFirstTraversal(iteratorFunc);
}

function log(value) {
  console.log(value)
}

bst.depthFirstTraversal(log);