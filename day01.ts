import * as aoc from './utils/aoc';
import input from './inputs/input01';

const data: string[] = aoc.lines(input);

const getCalibrationValues = (data: string[], getDigits: (str: string) => string | null): number => {
  let calibration = 0;

  data.forEach(line => {
    let firstChars = line.split('').reverse();
    let firstTest = '';
    let firstDigit: string | null = null;

    while (!firstDigit) {
      firstTest += firstChars.pop();
      firstDigit = getDigits(firstTest);
    }

    let lastChars = line.split('');
    let lastTest = '';
    let lastDigit: string | null = null;

    while (!lastDigit) {
      lastTest = lastChars.pop() + lastTest;
      lastDigit = getDigits(lastTest);
    }

    calibration += parseInt(`${firstDigit}${lastDigit}`);
  });

  return calibration;
}

// STAR 01
const DIGITS: string[] = ['1', '2', '3', '4', '5', '6', '7', '8', '9'];
const DIGITS_REGEX: RegExp = new RegExp(DIGITS.join('|'));
const getNumericDigits = (str: string): string | null => {
  const match = str.match(DIGITS_REGEX);
  if (match) return match[0];
  return null;
}

aoc.answer(1, getCalibrationValues(data, getNumericDigits));

// STAR 02
const SPELLED_DIGITS = {
  one: '1',
  two: '2',
  three: '3',
  four: '4',
  five: '5',
  six: '6',
  seven: '7',
  eight: '8',
  nine: '9',
};
const SPELLING: string[] = [...DIGITS, ...Object.keys(SPELLED_DIGITS)];
const SPELLING_REGEX: RegExp = new RegExp(SPELLING.join('|'));
const getSpelledDigits = (str: string): string | null => {
  const match = str.match(SPELLING_REGEX);
  if (match) {
    return SPELLED_DIGITS[match[0]] || match[0];
  }
  return null;
}

aoc.answer(2, getCalibrationValues(data, getSpelledDigits));
