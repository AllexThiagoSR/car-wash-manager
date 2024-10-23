import { compareSync, hashSync } from "bcryptjs"

export default class BcryptUtils {
  public static hash(value: string) {
    return hashSync(value, 10);
  }

  public static compare(value: string, hashedValue: string) {
    return compareSync(value, hashedValue);
  }
}