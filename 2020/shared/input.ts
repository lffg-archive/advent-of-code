import { readFileSync } from 'fs';
import { join } from 'path';

export function fetchInput(day: number): string {
  const path = join(__dirname, '../input', `${day}.txt`);

  try {
    return readFileSync(path, 'utf8').trim();
  } catch (error) {
    if (error.code === 'ENOENT') {
      console.error(
        `Input file "${day}.txt" does not exist. You must create it in the "/2020/input" directory.`
      );
      process.exit(1);
    }

    throw error;
  }
}
