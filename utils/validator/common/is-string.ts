export default function isString(
  val: any,
  opts?: { minLength?: number; maxLength?: number },
): val is string {
  const minLength = opts?.minLength ? opts.minLength : null;
  const maxLength = opts?.maxLength ? opts.maxLength : null;

  if (typeof val !== 'string') {
    return false;
  }

  if (minLength && val.length < minLength) {
    return false;
  }

  if (maxLength && val.length > maxLength) {
    return false;
  }

  return true;
}
