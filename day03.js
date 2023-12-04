const aoc = require('./utils/aoc');
const input = require('./inputs/input03');

const DIGITS = '0123456789';
const NOT_SYMBOLS = DIGITS + '.';
const POSSIBLE_GEAR = '*';

const data = aoc.chars(input);

const getPartNumbers = (data) => {
  const { rows, cols } = aoc.dimensions(data);
  const partNumbers = [];

  let currentNumber = '';
  let currentPossibleGears = new Set();
  let hasSymbolFound = false;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      if (DIGITS.includes(data[r][c])) {
        currentNumber += data[r][c];

        aoc.fullAdjacent.forEach(([rAdj, cAdj]) => {
          if (aoc.isPosValid(r + rAdj, c + cAdj, rows, cols)) {
            hasSymbolFound ||= !NOT_SYMBOLS.includes(data[r + rAdj][c + cAdj]);

            if (data[r + rAdj][c + cAdj] === POSSIBLE_GEAR) {
              currentPossibleGears.add(`${r + rAdj},${c + cAdj}`);
            }
          }
        });
      } else {
        if (hasSymbolFound) {
          partNumbers.push({
            number: parseInt(currentNumber),
            possibleGears: [...currentPossibleGears],
          });
        }

        currentNumber = '';
        currentPossibleGears.clear();
        hasSymbolFound = false;
      }
    }
  }

  return partNumbers;
}

const getGearRatios = (partNumbers) => {
  let mappedPossibleGears = {};

  for (const {number, possibleGears} of partNumbers) {
    for (const possibleGear of possibleGears) {
      if (Object.keys(mappedPossibleGears).includes(possibleGear)) {
        mappedPossibleGears[possibleGear].push(number);
      } else {
        mappedPossibleGears[possibleGear] = [number];
      }
    }
  }

  const gearRatios = [];
  for (const numbers of Object.values(mappedPossibleGears)) {
    if (numbers.length === 2) gearRatios.push(numbers[0] * numbers[1]);
  }

  return gearRatios;
}

// STAR 01
const partNumbers = getPartNumbers(data);
aoc.answer(1, aoc.sum(partNumbers.map(part => part.number)));

// STAR 02
aoc.answer(2, aoc.sum(getGearRatios(partNumbers)));
