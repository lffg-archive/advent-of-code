import { readFileSync } from 'fs';
import { print } from '../shared/out';

type Pair<T> = [T, T];

/**
 * Splits a string with 10 characters in a string pair, with:
 *  - The first element being the string with the 7 first characters,
 *  - The second element being the string with the 3 last characters.
 */
function splitPath(path: string): Pair<string> {
  return [path.slice(0, 7), path.slice(7, 10)];
}

/**
 * For a given "binary path string", finds its number position.
 */
function findPos(path: string, additiveChar: string): number {
  const toAdd = (i: number) => 2 ** (path.length - (i + 1));

  return [...path].reduce(
    (pos, char, i) => pos + (char === additiveChar ? toAdd(i) : 0),
    0
  );
}

/**
 * Computes the position ID given a row-column (number) pair.
 */
function getId([row, col]: Pair<number>): number {
  return row * 8 + col;
}

/**
 * Computes each position's pair.
 */
function getIds(rawList: string[]): number[] {
  return rawList
    .map(splitPath)
    .map(
      ([rowPath, colPath]) =>
        [
          findPos(rowPath, 'B'), // ->B<- (upper) is UP, F (lower) is DOWN.
          findPos(colPath, 'R') //  ->R<- (upper) is UP, L (lower) is DOWN.
        ] as Pair<number>
    )
    .map(getId);
}

/**
 * Solves 5-1.
 *
 * This is O(n).
 */
export function part1(rawList: string[]): number {
  return Math.max(...getIds(rawList));
}

/**
 * Solves 5-2.
 *
 * Assuming that `Set.prototype.has` is O(1), this is O(n).
 */
export function part2(rawList: string[]): number {
  const positions = new Set(getIds(rawList));

  const map = Array.from({ length: 128 })
    .flatMap((_, y) =>
      Array.from({ length: 8 }).map((_, x) => [y, x] as Pair<number>)
    )
    .map(getId);

  const set = new Set(positions);

  for (const id of map) {
    if (!set.has(id) && set.has(id - 1) && set.has(id + 1)) {
      return id;
    }
  }

  throw new Error('No match.');
}

const input = readFileSync(__dirname + '/input.txt', 'utf8')
  .trim()
  .split('\n');

print('Part 1', () => part1(input));
print('Part 2', () => part2(input));
