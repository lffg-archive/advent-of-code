import { fetchInput } from '../shared/input';
import { measure } from '../shared/perf';

function walk(map: string[], right: number, down: number): number {
  let treesEncountered = 0;
  let movedRight = 0;
  const LINE_LENGTH = map[0].length;

  for (let i = 0; i < map.length; i += down) {
    const currentLine = map[i];
    const currentBlock = currentLine[movedRight % LINE_LENGTH];

    if (currentBlock === '#') {
      treesEncountered++;
    }

    movedRight += right;
  }

  return treesEncountered;
}

function part1(map: string[]) {
  // Right 3, down 1.
  return walk(map, 3, 1);
}

function part2(map: string[]) {
  // Right 1, down 1.
  // Right 3, down 1. (This is the slope you already checked.)
  // Right 5, down 1.
  // Right 7, down 1.
  // Right 1, down 2.
  return [
    [1, 1],
    [3, 1],
    [5, 1],
    [7, 1],
    [1, 2]
  ].reduce((a, [right, down]) => a * walk(map, right, down), 1);
}

const input = fetchInput(3).split('\n');

console.log(measure('Part 1', () => part1(input)));
console.log(measure('Part 2', () => part2(input)));
