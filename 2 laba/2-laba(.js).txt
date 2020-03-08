'use strict';

// Transpose the matrix, make columns in rows
const transp = (matrix) => {
  const result = [];
  for(let y = 0; y < matrix[0].length; y++){
    result.push([]);
    for(let x = 0; x < matrix.length; x++){
      result[result.length-1].push(matrix[x][y]);
    }
  }
  return result;
}

// The values ​​of the "arr1" elements became indexes of the new "result" array,
//   while the values ​​of the "arr2" elements are the "result" values
const prepare = (arr1, arr2) => {
  const result = [];
  for(const a of arr1) result.push([]);

  arr2.forEach((item, index) => {
      result[arr1[index]-1].push(item);
  });
  return result;
}

// Consider the number of inversions in the array
const countInverses = arr => {
  let count = 0;
  for(let i = 0; i < arr.length-1; i++) {
    for (let j = i + 1; j < arr.length; j++) {
      if(arr[i] > arr[j]) {
        count++;
      }
    }
  }
  return count;
}


// Sorts ascending second element of pairs (i, k)
const sorting = (item1, item2) => {
    if (item1.c < item2.c) {
      return -1;
    }
    if (item1.c > item2.c) {
      return 1;
    }
    return 0;
}

// Logging input data
const logStart  = (D, x) => {
  console.log('');
  console.log('-------------[ The input matrix:');
  console.dir(D);
  console.log('-------------[ The input user (start from 1):');
  console.log(x);
}

// Logging output data
const logEnd  = (output) => {
  console.log('-------------[ Output:');
  console.dir(output);
  console.log('-------------:');
  console.log('');
  console.log('');
}

// Implementation of search of inversions quantity algorithm
//   (comparison of lists of favorites)
const algorythm = (D, x) => {
  logStart(D, x);
  x--;
  const result = [];
  // Transpose the input matrix for later use
  const tD = transp(D);
  // Get a list of user preferences
  //   with which we will compare other users
  const likesList1 = tD[x];
  // Iterate over rows of a matrix that is
  //   a list of user preferences of equal row index
  for(const user in tD) {
    // Get a list of user preferences
    const likesList2 = tD[user];
    // Prepare arrays for comparison
    const C = prepare(likesList1, likesList2);
    // Obtain the numerical value of the comparison
    //   (count of inverses)
    const c = countInverses(C);
    // Form the result
    const i = (Number(user)+1).toString();
    result.push({i, c});
  }
  // Sort the result
  const sorted = result.sort(sorting);
  logEnd(sorted);
  return sorted;
}

const D1 = [
//    users     //
  [1, 3, 1, 1], // f
  [2, 5, 2, 4], // i
  [3, 4, 3, 2], // l
  [4, 1, 5, 5], // m
  [5, 2, 4, 3], // s
];

algorythm(D1, 1);
