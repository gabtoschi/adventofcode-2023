const lines = (data, separator = '\n') => {
  return data.split(separator).map(line => line.trim());
}
const ints = (data, separator = '\n') => {
  return data.split(separator).map(line => parseInt(line));
}
const digits = (data, lineSeparator = '\n') => {
  return lines(data, lineSeparator)
    .map(line => line.split('').map(char => parseInt(char)));
}
const chars = (data, lineSeparator = '\n') => {
  return lines(data, lineSeparator).map(line => line.split(''));
}

const answer = (star, answer) => {
  console.log(`🌟 Star #0${star}: ${answer.toString()}`);
}

const ortogAdjacent = [[-1, 0], [1, 0], [0, -1], [0, 1]];
const diagAdjacent = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
const fullAdjacent = [...ortogAdjacent, ...diagAdjacent];
const dimensions = (matrix) => ({ rows: matrix.length, cols: matrix[0].length });
const isPosValid = (row, col, rows, cols) =>
  (row >= 0 && row < rows && col >= 0 && col < cols);


const sum = (data) => {
  return data.reduce((acc, cur) => (acc + cur), 0)
}
const mult = (data) => {
  return data.reduce((acc, cur) => (acc * cur), 1)
}

module.exports = {
  lines,
  ints,
  digits,
  chars,
  answer,
  ortogAdjacent,
  diagAdjacent,
  fullAdjacent,
  dimensions,
  isPosValid,
  sum,
  mult,
}