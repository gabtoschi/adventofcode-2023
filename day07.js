const aoc = require('./utils/aoc');
const input = require('./inputs/input07');

const FIVE_OF_A_KIND = 5;
const FOUR_OF_A_KIND = 4;
const FULL_HOUSE = 3.5;
const THREE_OF_A_KIND = 3;
const TWO_PAIR = 2;
const ONE_PAIR = 1;
const HIGH_CARD = 0;

const data = aoc.lines(input);

const getCardFrequency = (hand) => {
  const cards = hand.split('');
  const freqObj = {};

  for (const card of cards) {
    if (freqObj[card]) freqObj[card]++;
    else freqObj[card] = 1;
  }

  const frequences = Object.entries(freqObj).sort((a, b) => b[1] - a[1]);

  return frequences;
}

const getHandType = (hand) => {
  const frequences = getCardFrequency(hand);

  switch (frequences.length) {
    case 1:
      return FIVE_OF_A_KIND;

    case 2:
      if (frequences[0][1] === 4) return FOUR_OF_A_KIND;
      return FULL_HOUSE;

    case 3:
      if (frequences[0][1] === 3) return THREE_OF_A_KIND;
      return TWO_PAIR;

    case 4:
      return ONE_PAIR;

    case 5:
      return HIGH_CARD;
  }
}

const mapHands = (data, getType) => {
  return data.map(line => {
    const [cards, bid] = line.split(' ');
    return {
      cards,
      bid: parseInt(bid),
      type: getType(cards),
    }
  });
}

const sortByRank = (hands, strengthMap) => {
  const sorted = [...hands].sort((a, b) => {
    if (a.type !== b.type) return a.type - b.type;

    for (let i = 0; i < a.cards.length; i++) {
      const strengthA = strengthMap.indexOf(a.cards.charAt(i));
      const strengthB = strengthMap.indexOf(b.cards.charAt(i));

      if (strengthA !== strengthB) return strengthA - strengthB;
    }
  });

  return sorted;
}

const getTotalWinnings = (hands) => {
  return aoc.sum(hands.map((hand, index) => hand.bid * (index + 1)));
}

// STAR 01
const STRENGTH = '23456789TJQKA';
const hands = mapHands(data, getHandType);

aoc.answer(1, getTotalWinnings(sortByRank(hands, STRENGTH)));

// STAR 02
const JOKER = 'J';
const STRENGTH_WITH_JOKER = 'J23456789TQKA';

const getHandTypeWithJokers = (hand) => {
  if (!hand.includes(JOKER)) return getHandType(hand);

  const frequences = getCardFrequency(hand);

  switch (frequences.length) {
    case 1:
    case 2:
      return FIVE_OF_A_KIND;

    case 3:
      if (frequences[0][1] === 3) return FOUR_OF_A_KIND;

      if (frequences[2][0] === JOKER) return FULL_HOUSE;
      else return FOUR_OF_A_KIND;

    case 4:
      return THREE_OF_A_KIND;

    case 5:
      return ONE_PAIR;
  }
}

const handsWithJokers = mapHands(data, getHandTypeWithJokers);
aoc.answer(2, getTotalWinnings(sortByRank(handsWithJokers, STRENGTH_WITH_JOKER)));
