import { Injectable, NotFoundException } from '@nestjs/common';
import { createUsersDto } from 'src/users/dto/create-users.dto';
import { UsersDatabaseService } from 'src/database/users-database/users-database.service';
import * as bcrypt from 'bcrypt';
import { JwtService } from '@nestjs/jwt';
import { authUserDto } from './dto/auth-users.dto';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersDatabaseService: UsersDatabaseService,
    private readonly jwtService: JwtService,
  ) {}

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

  create(usersData: createUsersDto) {
    const { password } = usersData;

    // Hashing Password
    const hashedPassword = this.createPasswordHash(password);

    // Create User Document
    return this.usersDatabaseService.create({
      ...usersData,
      password: hashedPassword,
    });
  }

  /**
   * 유저의 email과 password를 받아 인증 후 jwt token을 반환
   *
   * @param email 로그인할 유저의 email
   * @param passwrod 로그인할 유저의 password
   */
  async signIn(signInData: authUserDto) {
    const { email, password } = signInData;

    const user = await this.usersDatabaseService.getOne(email);
    // Check user exists
    if (!user) {
      throw new NotFoundException(`${email}은 존재하지 않습니다.`);
    }

    // Check password
    if (this.comparePassword(password, user.password)) {
      // Make the jwt payload
      const jwtPayload = {
        email: email,
        password: password,
      };

      // Jwt sign
      const token = this.jwtService.signAsync({ ...jwtPayload });
      return token;
    }

    // Password가 해시된 Password와 맞지 않을 때
    throw new NotFoundException(`입력된 패스워드는 존재하지 않습니다.`);
  }

  getOne(email: string) {
    return this.usersDatabaseService.getOne(email);
  }
}
