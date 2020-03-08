'use strict';

// Implementation of modified insertion sorting algorithm according to the task
// vvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvvv

// hash table of conditions
const CONDITIONS = {
  '>': (a, b) => a > b ? 1 : 0,
  '<': (a, b) => a < b ? 1 : 0
};

// We get the position for the element "x" in the array "arr",
// satisfying the condition "condition"
const getPos = (arr, x, condition) => {
  let n = 0;
  for(n; n < arr.length; n++) {
    if(CONDITIONS[condition](x, arr[n])){
      break;
    }
  }
  return n;
};

// Sorts the incoming array, initially even in ascending order,
// then odd in descending order,
const modifiedInsertionSort = input => {
  let evensCount = 0;
  let oddCount = 0;
  for(let i = 0; i < input.length; i++) {
    const x = input[i];
    let j = i;
    // if "x" is even
    if(!(x % 2)){
      // cut off all even sorted numbers
      const sorted = input.slice(0, i-oddCount);
      // get a position for a new item subject to conditions
      let pos = getPos(sorted, x, '<');
      // move the item to the desired position
      if(pos !== i){
        input.splice(pos, 0, x);
        input.splice(i+1, 1);
      }
      evensCount++;
    } else {
      // cut off all odd sorted numbers
      const sorted = input.slice(evensCount, i);
      // get a position for a new item subject to conditions
      let pos = getPos(sorted, x, '>');
      pos += evensCount;
      // move the item to the desired position
      if(pos !== i){
        input.splice(pos, 0, x);
        input.splice(i+1, 1);
      }
      oddCount++;
    }
  }
  //
  return input;
}

// Usage

const A = [30, 19, 9, 15, 55, 24, 3, 78, 46, 41];

console.dir(modifiedInsertionSort(A));
