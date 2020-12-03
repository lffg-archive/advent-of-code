import { fetchInput } from './shared/input';

function findPair(sum: number, list: number[]): [number, number] {
  for (const i of list) {
    for (const j of list) {
      if (i + j === sum) {
        return [i, j];
      }
    }
  }

  throw new Error('No match.');
}

const input = fetchInput(1);

const [a, b] = findPair(
  2020,
  input.split('\n').map((i) => parseInt(i, 10))
);

console.log(a * b);
