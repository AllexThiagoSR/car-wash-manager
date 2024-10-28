import { SignOptions, JwtPayload, sign, verify, VerifyOptions } from 'jsonwebtoken';
import APIError from './ApiError';

export default class JWTUtils {
  private config: SignOptions;
  private secret: string = process.env.SECRET_JWT!
  private verifyConfig: VerifyOptions;

  constructor(
    config: SignOptions = { algorithm: 'HS256', expiresIn: '7d', audience: 'manager', issuer: 'intern-api'  },
    vConfig: VerifyOptions = { algorithms: ['HS256'], audience: 'manager', issuer: 'intern-api',  }
  ) {
    this.config = config;
    this.verifyConfig = vConfig;
  }

  public generateToken(payload: JwtPayload) {
    return sign(payload, this.secret, this.config)
  }

  public verify(token: string) {
    try {
      return verify(token, this.secret, this.verifyConfig);
    } catch (error) {
      throw new APIError('Invalid token', 401);
    }
  }
}
