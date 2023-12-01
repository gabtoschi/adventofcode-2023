export const lines = (data: string, separator = '\n'): string[] => {
  return data.split(separator).map(line => line.trim());
}

export const ints = (data: string, separator = '\n'): number[] => {
  return data.split(separator).map(line => parseInt(line));
}

export const digits = (data: string, lineSeparator = '\n'): number[][] => {
  return lines(data, lineSeparator)
    .map(line => line.split('').map(char => parseInt(char)));
}

export const answer = (star: 1 | 2, answer: any) => {
  console.log(`Star #0${star}: ${answer.toString()}`);
}

export const ortogAdjacent = [[-1, 0], [1, 0], [0, -1], [0, 1]];
export const diagAdjacent = [[-1, -1], [-1, 1], [1, -1], [1, 1]];
export const fullAdjacent = [...ortogAdjacent, ...diagAdjacent];

export const isMatrixPositionValid = (row: number, col: number, height: number, width: number) =>
  (row >= 0 && row < height && col >= 0 && col < width);
