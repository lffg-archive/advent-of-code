import { fetchInput } from '../shared/input';

const input = fetchInput(2).split('\n');

function countLetter(str: string, letter: string): number {
  let count = 0;
  for (const l of str) if (l === letter) count++;
  return count;
}

function solve(list: string[]) {
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

console.log(solve(input));
