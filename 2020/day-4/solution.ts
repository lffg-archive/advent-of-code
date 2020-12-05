import { readFileSync } from 'fs';
import { print } from '../shared/out';

// byr (Birth Year)
// iyr (Issue Year)
// eyr (Expiration Year)
// hgt (Height)
// hcl (Hair Color)
// ecl (Eye Color)
// pid (Passport ID)
// cid (Country ID)   -- May ignore.

export function part1(rawPassports: string[]): number {
  let validCount = 0;

  for (const rawPassport of rawPassports) {
    const passport = rawPassport.split(/[\n ]/).reduce((acc, curr) => {
      const [fieldName, value] = curr.split(':');
      acc.set(fieldName, value);
      return acc;
    }, new Map<string, string>());

    if (passport.size === 8) {
      validCount++;
    }

    if (passport.size === 7 && !passport.has('cid')) {
      validCount++;
    }
  }

  return validCount;
}

export function part2(rawPassports: string[]): number {
  let validCount = 0;

  for (const rawPassport of rawPassports) {
    const passport = rawPassport.split(/[\n ]/).reduce((acc, curr) => {
      const [fieldName, value] = curr.split(':');
      acc[fieldName] = value;
      return acc;
    }, {} as Record<string, string | undefined>);

    const heightUnit =
      typeof passport.hgt === 'string'
        ? passport.hgt.includes('cm')
          ? 'cm'
          : passport.hgt.includes('in')
          ? 'in'
          : null
        : null;

    const parsedByr = parseInt(passport.byr || '0', 10);
    const parsedIyr = parseInt(passport.iyr || '0', 10);
    const parsedEyr = parseInt(passport.eyr || '0', 10);
    // The `parseInt` function already ignores trailing characters (e.g. "cm").
    const parsedHgt = parseInt(passport.hgt || '0', 10);

    const validEyeColors = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];

    if (
      parsedByr >= 1920 &&
      parsedByr <= 2002 &&
      parsedIyr >= 2010 &&
      parsedIyr <= 2020 &&
      parsedEyr >= 2020 &&
      parsedEyr <= 2030 &&
      !!heightUnit &&
      ((heightUnit === 'cm' && parsedHgt >= 150 && parsedHgt <= 193) ||
        (heightUnit === 'in' && parsedHgt >= 59 && parsedHgt <= 76)) &&
      /^#[a-f0-9]{6}$/i.test(passport.hcl || '') &&
      validEyeColors.includes(passport.ecl || '') &&
      /^\d{9}$/.test(passport.pid || '')
    ) {
      validCount++;
    }
  }

  return validCount;
}

const input = readFileSync(__dirname + '/input.txt', 'utf8')
  .trim()
  .split('\n\n'); // <-- Separate each passport.

print('Part 1', () => part1(input));
print('Part 2', () => part2(input));
