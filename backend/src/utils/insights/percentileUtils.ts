export function getPercentile(value: number, dataset: number[]): number {
  const sorted = dataset.slice().sort((a, b) => a - b);
  const below = sorted.filter((n) => n < value).length;
  return below / dataset.length;
}
