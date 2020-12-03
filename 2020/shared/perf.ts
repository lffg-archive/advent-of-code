import { performance } from 'perf_hooks';

export function measure<T>(name: string, cb: () => T): T {
  const start = performance.now();
  const res = cb();
  const elapsed = performance.now() - start;

  console.log(`${name} elapsed in ${elapsed}ms`);

  return res;
}
