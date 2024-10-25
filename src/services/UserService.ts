import ServiceResponse from "../utils/ServiceRespose";
import UserRepository from "../repositories/UserRepository";
import IUserRespository from "../types/IUserRepository";
import APIError from "../utils/ApiError";
import BcryptUtils from "../utils/Bcrypt";
import JWTUtils from "../utils/JWTUtils";

export default class UserService {
  private repository: IUserRespository;
  private authProvider: JWTUtils = new JWTUtils();

  constructor(repository: IUserRespository = new UserRepository()) { this.repository = repository; }

  public async login(email: string, password: string): Promise<ServiceResponse<{ token: string }>> {
    const user = await this.repository.findByEmail(email);
    if (!user.id) throw new APIError('Invalid credentials', 400);
    if (!BcryptUtils.compare(password, user.password!)) throw new APIError('Invalid credentials', 400);
    const token = this.authProvider.generateToken({ id: user.id, email: user.email });
    return new ServiceResponse(200, { token })
  }
}