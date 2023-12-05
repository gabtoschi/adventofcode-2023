const aoc = require('./utils/aoc');
const input = require('./inputs/input05');

const [seedsStr, ...mapsStr] = input.split('\n\n').map(str => aoc.lines(str));

const seeds = seedsStr[0].split(': ')[1].split(' ').map(str => parseInt(str));
const maps = mapsStr.map(arr => {
  arr.shift();
  return arr.map(line => {
    const [dest, source, offset] = line.split(' ');
    return {
      source: parseInt(source),
      dest: parseInt(dest),
      offset: parseInt(offset),
    }
  })
});

const getMapPath = (seed) => {
  const path = [seed];
  let current = seed;
  let hasMapped = false;

  for (const map of maps) {
    for (const alt of map) {
      const max = alt.source + (alt.offset - 1);
      if (alt.source <= current && current <= max) {
        const mapped = alt.dest + (current - alt.source);

        path.push(mapped);
        current = mapped;
        hasMapped = true;
        break;
      }
    }

    if (!hasMapped) {
      path.push(current);
    } else {
      hasMapped = false;
    }
  }

  return path;
}

const getExpandedMin = (seeds) => {
  let min = Number.MAX_SAFE_INTEGER;

  for (let i = 0; i < seeds.length; i += 2) {
    const max = seeds[i] + seeds[i + 1];
    for (let j = seeds[i]; j < max; j++) {
      const location = getMapPath(j).slice(-1)[0];
      if (location < min) min = location;
    }
  }

  return min;
}

// STAR 01
const paths = seeds.map(seed => getMapPath(seed));
aoc.answer(1, Math.min(...paths.map(path => path.slice(-1)[0])));

// STAR 02
aoc.answer(2, getExpandedMin(seeds));

