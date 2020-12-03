import { fetchInput } from './shared/input';

interface Solution {
  part1: number;
  part2: number;
}

function findSolution(sum: number, list: number[]): Solution {
  let part1 = 0;
  let part2 = 0;

  for (const i of list) {
    for (const j of list) {
      if (i + j === sum) {
        part1 = i * j;
      }

      for (const k of list) {
        if (i + j + k === sum) {
          part2 = i * j * k;
        }
      }
    }
  }

  return { part1, part2 };
}

const input = fetchInput(1);

const { part1, part2 } = findSolution(
  2020,
  input.split('\n').map((i) => parseInt(i, 10))
);

console.log('Part 1:', part1);
console.log('Part 2:', part2);
