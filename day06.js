const aoc = require('./utils/aoc');
const input = require('./inputs/input06');

const data = aoc.lines(input);

// V[min,max] = [-T +- sqrt(T^2 - 4*D)] / -2
const getMinMax = (time, distance) => {
  const delta = (time * time) - (4 * distance);
  const deltaSqrd = Math.sqrt(delta);

  const vPlus = ((time * -1) + deltaSqrd) / -2;
  const vMinus = ((time * -1) - deltaSqrd) / -2;

  const min = Number.isInteger(vPlus) ? vPlus + 1 : Math.ceil(vPlus);
  const max = Number.isInteger(vMinus) ? vMinus - 1 : Math.floor(vMinus);

  return [min, max];
}

const getAllWays = (times, distances) => {
  return times.map((time, index) => {
    const distance = distances[index];
    const [min, max] = getMinMax(time, distance);
    return max - min + 1;
  })
}

// STAR 01
const [times01, distances01] = data.map(line => {
  const [_, values] = line.split(': ');
  const numbers = values.split(' ').filter(Boolean).map(str => parseInt(str));
  return numbers;
});

aoc.answer(1, aoc.mult(getAllWays(times01, distances01)));

// STAR 02
const [times02, distances02] = data.map(line => {
  const [_, values] = line.split(': ');
  const numbers = parseInt(values.trim().replace(/\s/gm, ''));
  return [numbers];
});

aoc.answer(2, aoc.mult(getAllWays(times02, distances02)));

