import { fetchInput } from '../shared/input';
import { measure } from '../shared/perf';

//
// SOLUTIONS
//

function part1(sum: number, list: number[]): number {
  // Assuming that `Set.prototype.has` is of complexity `O(1)`, this solution
  // has a complexity of `O(n)`.

  const set = new Set(list);

  for (const i of set) {
    const comp = sum - i;
    if (set.has(comp)) {
      return comp * i;
    }
  }

  throw new Error('No match (part 1).');
}

// O(n^2)
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

  throw new Error('No match (part 2).');
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

const part1Out = measure('Part 1 - O(n)', () => part1(sum, input));
const part2Out = measure('Part 2 - O(n^2)', () => part2(sum, input));

console.log();

console.log('Part 1:', part1Out);
console.log('Part 2:', part2Out);
