const aoc = require('./utils/aoc');
const input = require('./inputs/input04');

const data = aoc.lines(input);
const scratchcards = data.map(line => {
  const [_, allNumbers] = line.split(': ');
  const [winning, card] = allNumbers.split(' | ');

  const winningNumbers = winning.split(' ').filter(Boolean).map(str => parseInt(str));
  const cardNumbers = card.split(' ').filter(Boolean).map(str => parseInt(str));

  return { card: cardNumbers, winning: winningNumbers };
});

const validateScratchcard = (scratchcard) => {
  const { card, winning } = scratchcard;
  let matches = 0;

  for (let cardNumber of card) {
    if (winning.includes(cardNumber)) matches++;
  }

  return matches;
}

const getScratchcardPoints = (scratchcard) => {
  const matched = validateScratchcard(scratchcard);

  if (matched === 0) return 0;
  return Math.pow(2, matched - 1);
}

const scratchcardCascade = (scratchcards) => {
  let totalCards = 0;
  const cascade = [];

  for (let card of scratchcards) {
    const matched = validateScratchcard(card);
    const currentCardAmount = 1 + (cascade.shift() || 0);

    for (let i = 0; i < matched; i++) {
      if (cascade[i]) cascade[i] += currentCardAmount;
      else cascade[i] = currentCardAmount;
    }

    totalCards += currentCardAmount;
  }

  return totalCards;
}

// STAR 01
aoc.answer(1, aoc.sum(scratchcards.map(card => getScratchcardPoints(card))));

// STAR 02
aoc.answer(2, scratchcardCascade(scratchcards));
