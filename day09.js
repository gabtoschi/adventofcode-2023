const aoc = require('./utils/aoc');
const input = require('./inputs/input09');

const data = aoc.lines(input).map(line => aoc.ints(line, ' '));

const getTriangle = (values) => {
  const triangle = [values];

  do {
    const last = aoc.last(triangle);
    const next = [];

    for (let i = 1; i < last.length; i++) {
      next.push(last[i] - last[i - 1]);
    }

    triangle.push(next);
  } while (aoc.sum(aoc.last(triangle)) !== 0);

  return triangle;
}

// STAR 01
const predictFuture = (values) => {
  const triangle = getTriangle(values);
  return aoc.sum(triangle.map(line => aoc.last(line)));
}

aoc.answer(1, aoc.sum(data.map(line => predictFuture(line))));

// STAR 02
const predictPast = (values) => {
  const triangle = getTriangle(values);
  const firsts = triangle.map(line => aoc.first(line)).reverse();

  return firsts.reduce((acc, cur) => cur - acc, 0);
}

aoc.answer(2, aoc.sum(data.map(line => predictPast(line))));
