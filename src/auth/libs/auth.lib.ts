import * as bcrypt from 'bcrypt';

/**
 * 인증 작업을 위해 필요한 function을 모아둠
 */
export class AuthLibs {
  /**
   * Create Hash using the password.
   */
  createPasswordHash(password: string) {
    const saltOrRounds = 10;
    const hashedPassword = bcrypt.hashSync(password, saltOrRounds);
    return hashedPassword;
  }

  /**
   * 입력된 패스워드와 해시가 일치하는지 확인함
   *
   * @param plainPassword 암호화되지 않은 패스워드
   * @param hash          해시로 변환되어 있는 패스워드
   */
  comparePassword(plainPassword: string, hash: string) {
    const result = bcrypt.compareSync(plainPassword, hash);
    return result;
  }
}
