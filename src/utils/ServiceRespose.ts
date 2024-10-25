export type StatusCodes = 200 | 201 | 202 | 203 | 204;

export type StatusCodesStrings = 'OK' | 'CREATED' | 'ACCEPTED' | 'NON_ATHORITATIVE' | 'NO_CONTENT';

const statusCodesStringsMap = {
  200: 'OK',
  201: 'CREATED',
  202: 'ACCEPTED',
  203: 'NON_ATHORITATIVE',
  204: 'NO_CONTENT'
}

export default class ServiceResponse<T> {
  readonly statusCode: StatusCodes;
  readonly body: T | null | string;
  readonly statusCodeString: string;

  constructor(status: StatusCodes, body: T | null | string = null) {
    this.statusCode = status;
    this.body = body;
    this.statusCodeString = this.chooseStatusCodeStringBasedOnStatusCode(status);
  }

  private chooseStatusCodeStringBasedOnStatusCode = (statusCode: StatusCodes): StatusCodesStrings => (
    statusCodesStringsMap[statusCode as keyof typeof statusCodesStringsMap] as StatusCodesStrings
  )
}