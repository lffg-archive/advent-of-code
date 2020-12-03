import { fetchInput } from '../shared/input';
import { measure } from '../shared/perf';

const input = fetchInput(2).split('\n');

function countLetter(str: string, letter: string): number {
  let count = 0;
  for (const l of str) if (l === letter) count++;
  return count;
}

function solve1(list: string[]) {
  let count = 0;

  // Example entry.
  // 5-19 f: ffffffffffffffffffcf
  for (const entry of list) {
    const [rawRange, rawLetter, pwd] = entry.split(' ');
    const letter = rawLetter[0];

    const [min, max] = rawRange.split('-').map((n) => parseInt(n, 10));
    const am = countLetter(pwd, letter);

    if (min <= am && am <= max) {
      count++;
    }
  }

  return count;
}

function solve2(list: string[]) {
  let count = 0;

  // Example entry.
  // 5-19 f: ffffffffffffffffffcf
  for (const entry of list) {
    const [rawRange, rawLetter, pwd] = entry.split(' ');
    const letter = rawLetter[0];

    const [posA, posB] = rawRange.split('-').map((n) => parseInt(n, 10));

    let matched = 0;

    if (pwd[posA - 1] === letter) {
      matched++;
    }

    if (pwd[posB - 1] === letter) {
      matched++;
    }

    if (matched === 1) {
      count++;
    }
  }

  return count;
}

console.log(
  '1',
  measure('Part 1', () => solve1(input))
);
console.log(
  '2',
  measure('Part 2', () => solve2(input))
);
