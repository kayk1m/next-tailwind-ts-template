export default function isOneOf<T extends any>(val: T, targets: T[]): val is T {
  return targets.indexOf(val) > -1;
}
