import { Injectable, UnauthorizedException } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { AuthService } from './auth.service';
import { JwtTokenType } from './jwt.types';

const opts = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(private readonly authService: AuthService) {
    super({
      ...opts,
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  /**
   * Passport.js를 이용한 인증 과정에서 사용됨.(jwt)
   * @param jwtToken bearer에 있는 jwt token
   * @returns token과 맞는 User Data
   */
  async validate(jwtToken: JwtTokenType): Promise<any> {
    // 들어오는 jwt token은 해석이 끝난 상태임
    const { email } = jwtToken;

    // 인증이 성공할 시 req.user에 데이터를 넣음
    const user = await this.authService.validateUser(email);
    if (!user) {
      throw new UnauthorizedException();
    }
    return user;
  }
}
