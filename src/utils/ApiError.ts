export default class APIError extends Error {
  stack?: string | undefined = '';
  constructor(message: string, public readonly statusCode: number) {
    super(message);
  }
}