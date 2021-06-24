import { createError } from '@defines/errors';

function isString(
  val: any,
  opts?: { strict?: boolean; minLength?: number; maxLength?: number },
): val is string {
  const minLength = opts?.minLength ? opts.minLength : null;
  const maxLength = opts?.maxLength ? opts.maxLength : null;

  if (typeof val !== 'string') {
    if (opts?.strict) {
      throw createError('VALIDATION_FAILED', {
        name: 'Type error',
        message: JSON.stringify({
          val,
          expected: 'string',
          received: typeof val,
        }),
      });
    }

    return false;
  }

  if (minLength && val.length < minLength) {
    if (opts?.strict) {
      throw createError('VALIDATION_FAILED', {
        name: 'Unallowed string length',
        message: JSON.stringify({
          val,
          minLength,
          received: val.length,
        }),
      });
    }

    return false;
  }

  if (maxLength && val.length > maxLength) {
    if (opts?.strict) {
      throw createError('VALIDATION_FAILED', {
        name: 'Unallowed string length',
        message: JSON.stringify({
          val,
          maxLength,
          received: val.length,
        }),
      });
    }

    return false;
  }

  return true;
}

export default isString;
