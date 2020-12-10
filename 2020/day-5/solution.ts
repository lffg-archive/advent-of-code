import { readFileSync } from 'fs';
import { print } from '../shared/out';

type Pair<T> = [T, T];

/**
 * Splits a string with 10 characters in a string pair, with:
 *  - The first element being the string with the 7 first characters,
 *  - The second element being the string with the 3 last characters.
 */
function splitPath(path: string): Pair<string> {
  return [
    path.slice(0, 7),
    path.slice(7, 10)
  ];
}

/**
 * For a given "binary path string", finds its number position.
 *
 * This functions computes the position by iterating over each `path`'s
 * characters, in reverse order. To do so, it calculates a number for each
 * character's index using the following formula:
 *
 *     2^(len - (i + 1))
 *                          Where: * `len` is `path`'s length.
 *                                 * `i` is current character's index.
 *
 * If the character is an `additiveChar`, the previous operation result is
 * considered. Otherwise, `0` will be taken.
 *
 * Eg., given "FBFBBFF" as `path` and "B" as `additiveChar`:
 * Notice that `7` is the string's length and the operation is taken from RTL.
 * (reverse order)
 *
 *  - "F" (index 6) =>  2^(7 - (6 + 1)) = 2^0 = 1   => F is NOT additiveChar, so, take 0.
 *  - "F" (index 5) =>  2^(7 - (5 + 1)) = 2^1 = 2   => F is NOT additiveChar, so, take 0.
 *  - "B" (index 4) =>  2^(7 - (4 + 1)) = 2^2 = 4   => B IS     additiveChar, so, take 4.
 *  - "B" (index 3) =>  2^(7 - (3 + 1)) = 2^3 = 8   => B IS     additiveChar, so, take 8.
 *  - "F" (index 2) =>  2^(7 - (2 + 1)) = 2^4 = 16  => F is NOT additiveChar, so, take 0.
 *  - "B" (index 1) =>  2^(7 - (1 + 1)) = 2^5 = 32  => B IS     additiveChar, so, take 32.
 *  - "F" (index 0) =>  2^(7 - (0 + 1)) = 2^6 = 64  => B is NOT additiveChar, so, take 0.
 *
 * The result is the total sum: 0 + 0 + 4 + 8 + 0 + 32 + 0, which is 44.
 */
function findPos(path: string, additiveChar: string): number {
  const toAdd = (i: number) => 2 ** (path.length - (i + 1));

  return [...path].reduceRight(
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
