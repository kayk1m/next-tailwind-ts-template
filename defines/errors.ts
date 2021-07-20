import Joi from 'joi';

const ERROR_VARIANTS = ['CE'] as const;
type ErrorCode = `${typeof ERROR_VARIANTS[number]}${number}`;

export interface CustomError {
  code: ErrorCode;
  name: string;
  message: string;
}

export function isCustomError(error: any): error is CustomError {
  try {
    Joi.assert(
      error,
      Joi.object({
        code: Joi.string().required().length(5),
        name: Joi.string().required(),
        message: Joi.string().required(),
      }),
    );
  } catch {
    return false;
  }

  return true;
}

export function createError(
  errName: keyof typeof ERRORS,
  overrides?: Partial<Omit<CustomError, 'code'>>,
): CustomError {
  const err = ERRORS[errName];
  return {
    code: err.code,
    name: overrides?.name || err.name,
    message: overrides?.message || err.message,
  };
}

const ERRORS = {
  // Common Error
  INTERNAL_SERVER_ERROR: {
    code: 'CE000',
    name: 'Internal server error',
    message: 'Unhandled error occured.',
  },
  METHOD_NOT_EXISTS: {
    code: 'CE001',
    name: 'Bad request method',
    message: 'Check request host and/or method.',
  },
  VALIDATION_FAILED: {
    code: 'CE002',
    name: 'Validation failed',
    message: "Check your request's validity.",
  },
} as const;

export default ERRORS;
