import type { NextApiHandler } from 'next';
import { isResSent } from 'next/dist/next-server/lib/utils';

import { createError, isCustomError } from '@defines/errors';

export function withErrorHandler(handler: NextApiHandler) {
  const wrappedHandler: NextApiHandler = async (req, res) => {
    try {
      await handler(req, res);

      if (!isResSent(res)) {
        res.status(400).json(createError('METHOD_NOT_EXISTS'));
      }
    } catch (err) {
      if (isResSent(res)) {
        return;
      }

      if (isCustomError(err)) {
        return res.status(res.statusCode >= 400 ? res.statusCode : 500).json(err);
      }

      return res
        .status(res.statusCode >= 400 ? res.statusCode : 500)
        .json(createError('INTERNAL_SERVER_ERROR', err));
    }
  };

  return wrappedHandler;
}
