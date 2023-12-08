const aoc = require('./utils/aoc');
const input = require('./inputs/input08');

const [instructions, ...nodes] = aoc.lines(input).filter(Boolean);
const path = instructions.split('');

const map = {};
nodes.forEach(str => {
  const [source, destinations] = str.split(' = (');
  const [left, right] = destinations.replace(')', '').split(', ');

  map[source] = { L: left, R: right };
});

const followPath = (map, path, start, finishes) => {
  let steps = 0;
  let current = start;
  let pathIndex = 0;

  do {
    current = map[current][path[pathIndex]];
    pathIndex = (pathIndex + 1) % path.length;

    steps++;
  } while (!finishes.includes(current));

  return steps;
}

// STAR 01
aoc.answer(1, followPath(map, path, 'AAA', ['ZZZ']));

// STAR 02
const allStart = Object.keys(map).filter(str => str.match(/A$/g));
const allFinish = Object.keys(map).filter(str => str.match(/Z$/g));

const allSteps = allStart.map(node => followPath(map, path, node, allFinish));

// Least Common Multiple from https://stackoverflow.com/a/61352020
const gcd = (a, b) => b == 0 ? a : gcd (b, a % b)
const lcm = (a, b) =>  a / gcd (a, b) * b
const lcmAll = (ns) => ns.reduce(lcm, 1)

aoc.answer(2, lcmAll(allSteps));
