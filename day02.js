const aoc = require('./utils/aoc');
const input = require('./inputs/input02');

const data = aoc.lines(input);
const games = data.map(line => {
  const [gameData, subsetData] = line.split(': ');
  const [_, gameId] = gameData.split(' ');
  const subsetStrings = subsetData.split('; ');

  const subsets = subsetStrings.map(str => {
    const mappedSubset = { red: 0, blue: 0, green: 0 };
    const colorStrings = str.split(', ');

    colorStrings.forEach(colorStr => {
      const [amount, color] = colorStr.split(' ');
      mappedSubset[color] = parseInt(amount);
    });

    return mappedSubset;
  });

  return {
    id: parseInt(gameId),
    subsets,
  }
});

// STAR 01
const checkGamesByMaxCubes = (games, max) => {
  let idSum = 0;

  games.forEach(game => {
    for (const subset of game.subsets) {
      if (subset.red > max.red || subset.blue > max.blue || subset.green > max.green) {
        return;
      }
    }

    idSum += game.id;
  });

  return idSum;
}

aoc.answer(1, checkGamesByMaxCubes(games, { red: 12, green: 13, blue: 14 }));

// STAR 02
const getMinPower = (games) =>  {
  let powerSum = 0;

  games.forEach(game => {
    const minCubes = { red: 0, green: 0, blue: 0 };

    game.subsets.forEach(subset => {
      if (subset.red > minCubes.red) minCubes.red = subset.red;
      if (subset.green > minCubes.green) minCubes.green = subset.green;
      if (subset.blue > minCubes.blue) minCubes.blue = subset.blue;
    });

    const power = minCubes.red * minCubes.green * minCubes.blue;
    powerSum += power;
  });

  return powerSum;
}

aoc.answer(2, getMinPower(games));
