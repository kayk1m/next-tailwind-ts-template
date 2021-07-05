export default function isOneOf<T extends any[] | readonly any[]>(
  val: any,
  targets: T,
): val is T[number] {
  return targets.indexOf(val) > -1;
}
