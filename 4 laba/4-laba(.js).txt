'use strict';

// Impl. of tasks algorithm
const task = arr => {
  // Array of founded medians
  const medians = [];
  // Simulate sequential receipt of array elements in the program
  for(let i = 0; i < arr.length; i++){
    // If the number of elements received in the program is even
    if((i+1) % 2 === 0) {
      medians.push(arr[(i+1)/2]);
      medians.push(arr[((i+1)/2)+1]);
    } else { // If odd
      medians.push(arr[i/2]);
    }
  }
  // Return sequential medians
  return medians;
}

const arr1 = [ 11, 13, 28, 99, 34, 51, 36, 52, 63, 24, 25, 23, 38 ].sort();

console.log('input: ', arr1);
console.log('output: ', task(arr1));
