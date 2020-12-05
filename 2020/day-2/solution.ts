import { readFileSync } from 'fs';
import { print } from '../shared/out';

const toInt = (n: string): number => parseInt(n, 10);

const countLetter = (str: string, letter: string): number =>
  [...str].reduce((acc, curr) => acc + Number(curr === letter), 0);

const withinBounds = (n: number, min: number, max: number): boolean =>
  min <= n && n <= max;

export function part1(list: string[]) {
  let count = 0;

  for (const entry of list) {
    const [rawRange, [letter], pwd] = entry.split(' ');
    const [min, max] = rawRange.split('-').map(toInt);
    const letterCount = countLetter(pwd, letter);

    if (withinBounds(letterCount, min, max)) {
      count++;
    }
  }

  return count;
}

export function part2(list: string[]) {
  let count = 0;

  for (const entry of list) {
    const [rawRange, [letter], pwd] = entry.split(' ');
    const [posA, posB] = rawRange.split('-').map(toInt);

    if ((pwd[posA - 1] === letter) !== (pwd[posB - 1] === letter)) {
      count++;
    }
  }

  return count;
}

const input = readFileSync(__dirname + '/input.txt', 'utf8')
  .trim()
  .split('\n');

print('Part 1', () => part1(input));
print('Part 2', () => part2(input));
