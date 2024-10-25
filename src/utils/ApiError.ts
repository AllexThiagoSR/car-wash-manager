export type ErrorsStatusCodes = 500 | 400 | 401 | 403 | 404 | 409 | 422 | 429;

export default class APIError extends Error {
  stack?: string | undefined = '';
  constructor(message: string, public readonly statusCode: ErrorsStatusCodes) {
    super(message);
  }
}