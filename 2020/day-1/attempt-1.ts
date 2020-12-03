import { fetchInput } from '../shared/input';
import { measure } from '../shared/perf';

//
// SOLUTIONS
//

// O(n^2)
function part1(sum: number, list: number[]): number {
  for (const i of list) {
    for (const j of list) {
      if (i + j === sum) {
        return i * j;
      }
    }
  }

  throw new Error('No match.');
}

// O(n^3)
function part2(sum: number, list: number[]): number {
  for (const i of list) {
    for (const j of list) {
      for (const k of list) {
        if (i + j + k === sum) {
          return i * j * k;
        }
      }
    }
  }

  throw new Error('No match.');
}

//
// INPUTS AND CONSTANTS
//

const input = fetchInput(1)
  .split('\n')
  .map((i) => parseInt(i, 10));

const sum = 2020;

//
// OUTPUT
//

const part1Out = measure('Part 1 - O(n^2)', () => part1(sum, input));
const part2Out = measure('Part 2 - O(n^3)', () => part2(sum, input));

console.log();

console.log('Part 1:', part1Out);
console.log('Part 2:', part2Out);
