import { readFileSync } from 'fs';
import { print } from '../shared/out';

// TODO. Refactor this ugly (and bad) code.

function countLetter(str: string, letter: string): number {
  let count = 0;
  for (const l of str) if (l === letter) count++;
  return count;
}

function solve1(list: string[]) {
  let count = 0;

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

const input = readFileSync(__dirname + '/input.txt', 'utf8')
  .trim()
  .split('\n');

print('Part 1', () => solve1(input));
print('Part 2', () => solve2(input));
