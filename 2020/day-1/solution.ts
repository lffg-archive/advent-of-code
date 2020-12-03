import { readFileSync } from 'fs';
import { print } from '../shared/out';

function part1(sum: number, list: number[]): number {
  const set = new Set(list);

  for (const i of set) {
    const comp = sum - i;
    if (set.has(comp)) {
      return comp * i;
    }
  }

  throw new Error('No match.');
}

function part2(sum: number, list: number[]): number {
  const set = new Set(list);

  for (const i of set) {
    for (const j of set) {
      const comp = sum - (i + j);
      if (set.has(comp)) {
        return i * j * comp;
      }
    }
  }

  throw new Error('No match.');
}

const input = readFileSync(__dirname + '/input.txt', 'utf8')
  .trim()
  .split('\n')
  .map((i) => parseInt(i, 10));

const sum = 2020;

//
// OUTPUT
//

print('Part 1', () => part1(sum, input));
print('Part 2', () => part2(sum, input));
