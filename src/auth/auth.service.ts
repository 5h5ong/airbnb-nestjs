import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { AuthLibs } from './libs/auth.lib';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    @Inject('AUTH') private readonly authProvider: AuthLibs,
  ) {}

  /**
   * 인증된 유저의 데이터를 req.user에 붙여 사용할 수 있게 만듬
   *
   * @returns req.user에 붙여질 user data
   */
  async validateUser(email: string, password: string): Promise<any> {
    // Get User Data
    const user = await this.usersService.getOne(email);

    // 패드워드가 일치하면 req.user로 가져온 user data를 추가
    if (this.authProvider.comparePassword(password, user.password)) {
      return user;
    }
  }
}
