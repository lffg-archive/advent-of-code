import { performance } from 'perf_hooks';

export function print(name: string, fn: () => void) {
  if (process.env.NODE_ENV === 'test') {
    console.log(fn());
    return;
  }

  const start = performance.now();
  const res = fn();
  const elapsed = performance.now() - start;

  console.log(name + ':', res);
  console.log(`  Done in ${elapsed}ms`);
}
