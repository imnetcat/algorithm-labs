'use strict';

const getMatrix = n => {
  const matrix = [];
  for (let i = 0; i < n; i++) {
    matrix.push([]);
  }
  for (let i = 0; i < n; i++) {
    for (let k = 0; k < n; k++) {
      let opposite = matrix[k][i];
      if (i === k) {
        matrix[i][k] = 0;
      } else if (opposite) {
        matrix[i][k] = opposite;
      } else {
        matrix[i][k] = Math.floor(Math.random() * n) + 1
      }
    }
  }
  return matrix;
}

const getShortestWay = matrix => {
  const way = [];
  for (let i = 0; i < matrix.length; i++) {
    const peak = matrix[i];
    let shortest = peak[0] === 0 ? peak[matrix.length - 1] : peak[0];
    let save = shortest;
    for (let k = 0; k < peak.length; k++) {
      const current = peak[k];
      if (i != k && current < shortest && current != 0) {
        shortest = current;
        way[i] = `${i + 1} > ${k + 1}`;
      }
      if (k === peak.length - 1 && save === shortest) {
        shortest = peak.indexOf(save);
        way[i] = `${i + 1} > ${peak.indexOf(save) + 1}`;
      };
    };
  };
  return way;
}

const gAlhorithm = matrix => {
  const short = [];
  const way = [];
  const find = (arr, store, counter) => {
    const save = arr.slice();
    arr.sort((a, b) => a - b);
    const first = arr.filter(item => item != 0)[0];
    const index = save.indexOf(first);
    const check = i => {
      if (i === matrix.length) i = 0;
      return store.includes(i) ? check(++i) : i;
    }
    store.push(check(index));
  };

  for (const index in matrix) {
    find(matrix[index], way, index);
  }
    console.log('\n');
  for (let i = 0; i < matrix.length; i++) {
    const peak = matrix[i];
    let save = [];
    let shortest = peak[0] === 0 ? peak[matrix.length - 1] : peak[0];
    for (let k = 0; k < peak.length; k++) {
      const current = peak[k];
      save.push(shortest);
      if (current < shortest && i != k) {
        shortest = current;
      }
    }
    console.log(save);
    short.push(peak.indexOf(shortest));
  }
  let s = 'The Way: ';
  for (let i = 0; i < way.length; i++) {
    const item = way[i];
    if (i === 0) s += `${item}`
    else s += ` > ${item}`
  };
  return s;
}

const g1 = getMatrix(4)

console.log('\n');
for (const item of g1) {
  console.log(item);
}

console.log('The shortest way: ', getShortestWay(g1));
console.log(gAlhorithm(g1));
console.log('\n');
