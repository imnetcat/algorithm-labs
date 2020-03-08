'use strict';

function LinearProbingHashTable(size) {
  this.size = size;
  this.keys = this.initArray(size);
  this.values = this.initArray(size);
  this.limit = 0;
}

LinearProbingHashTable.prototype.put = function(key, value) {
  if (this.limit >= this.size) throw 'hash table is full'
  var hashedIndex = this.hash(key);
  while (this.keys[hashedIndex] != null) {
    hashedIndex++;
    hashedIndex = hashedIndex % this.size;
  }
  this.keys[hashedIndex] = key;
  this.values[hashedIndex] = value;
  this.limit++;
}

LinearProbingHashTable.prototype.get = function(key) {
  var hashedIndex = this.hash(key);

  while (this.keys[hashedIndex] != key) {
    hashedIndex++;
    hashedIndex = hashedIndex % this.size;
  }

  return this.values[hashedIndex]
}

LinearProbingHashTable.prototype.hash = function(key) {
  if (!Number.isInteger(key)) throw 'must be int';

  return key % this.size;
}

LinearProbingHashTable.prototype.initArray = function(size) {
  var array = [];

  for (var i = 0; i < size; i++) {
    array.push(null);
  }

  return array;
}


const directSearch = (t, k) => t[k];
const directInsert = (t, i, k) => t[i] = k;
const directDelete = (t, i) => delete t[i];
const directHashSearch = (t, x) => {
  for(let i = 0; i < t.length; i++){
    if(directSearch(t, i) === x){
      return i;
    }
  }
  return null;
}

const task = (arr, s) => {
  // Length of inputed array
  const n = arr.length;
  // Result
  let result = false;
  // Direct address method 1
  console.log('\n');
  console.log('Direct address method 1')
  console.log('Speed:  O(n^2)')
  console.log('Collisions:  5')
  for(let i = 0; i < n; i++){
    for(let j = i+1; j < n; j++){
      if((directSearch(arr, i) + directSearch(arr, j)) === s){
        result = true;
        break;
      }
    }
  }
  console.log('Output: ', result );
  console.log('\n');
  result = false;
  // Direct address method 2
  console.log('Direct address method 2')
  console.log('Speed:  O(n)')
  console.log('Collisions: 5')
  for(let i = 0; i < n; i++){
    const x = directSearch(arr, i);
    const y = s - x;
    if(directHashSearch(arr, y)){
      result = true;
      break;
    }
  }
  console.log('Output: ', result );
  console.log('\n');
  result = false;

  // Direct address method 2
  console.log('Linear probing method')
  console.log('Speed:  O(1 + 1/(1 − n))')
  console.log('Collisions: 4')
  const ht = new LinearProbingHashTable(n);
  for(let i = 0; i < n; i++){
    ht.put(i, arr[i]);
  }
  for(let i = 0; i < n; i++){
    for(let j = i+1; j < n; j++){
      if((ht.get(i) + ht.get(j)) === s){
        result = true;
        break;
      }
    }
  }
  console.log('Output: ', result );
  result = false;
  console.log('\n');
}

const hashTable = [ 2, 3, 5, 8 ];

const s = 5;

task(hashTable, s);
