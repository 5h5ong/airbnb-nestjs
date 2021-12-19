import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { createUsersDto } from 'src/users/dto/create-users.dto';
import { UsersDatabaseService } from 'src/database/users-database/users-database.service';
import { JwtService } from '@nestjs/jwt';
import { authUserDto } from './dto/auth-users.dto';
import { AuthLibs } from 'src/auth/libs/auth.lib';
import { AccommodationsDatabaseService } from 'src/database/accommodationsDatabase/accommodationsDatabase.service';
import { ReservationDatabaseService } from 'src/database/reservation-database/reservation-database.service';

@Injectable()
export class UsersService {
  constructor(
    private readonly usersDatabaseService: UsersDatabaseService,
    private readonly accommodationsDatabaseService: AccommodationsDatabaseService,
    private readonly reservationsDatabaseService: ReservationDatabaseService,
    private readonly jwtService: JwtService,
    @Inject('AUTH')
    private readonly authProvider: AuthLibs,
  ) {}

  create(usersData: createUsersDto) {
    const { password } = usersData;

    // Hashing Password
    const hashedPassword = this.authProvider.createPasswordHash(password);

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

    const user = await this.usersDatabaseService.getOneFromEmail(email);
    // Check user exists
    if (!user) {
      throw new NotFoundException(`${email}은 존재하지 않습니다.`);
    }

    // Check password
    if (this.authProvider.comparePassword(password, user.password)) {
      // Make the jwt payload
      const jwtPayload = {
        email: email,
      };

      // Jwt sign
      const token = this.jwtService.signAsync({ ...jwtPayload });
      return token;
    }

    // Password가 해시된 Password와 맞지 않을 때
    throw new NotFoundException(`입력된 패스워드는 존재하지 않습니다.`);
  }

  getOneFromEmail(email: string) {
    return this.usersDatabaseService.getOneFromEmail(email);
  }

  getOneFromId(id: string) {
    return this.usersDatabaseService.getOneFromId(id);
  }

  /**
   * 유저 데이터와 함께 온전한 숙소, 예약 데이터를 조회
   *
   * @remarks
   * `getOneFromId`와 같은 것들은 숙소, 예약 데이터를 id만 조회함.
   * 하지만 이 메소드는 완전히 갖춰진 숙소, 예약 데이터를 조회함.
   */
  async getOneFromIdWithFullData(id: string) {
    const userData = await this.usersDatabaseService.getOneFromId(id);
    const { accommodations, reservations } = userData;

    // 숙소 가져오기
    const fullOfAccommodationsPromise = accommodations.map((id) => {
      return this.accommodationsDatabaseService.getOne(id);
    });
    const fullOfAccommodations = await Promise.all(fullOfAccommodationsPromise);

    // 예약 가져오기
    const fullOfReservationsPromise = reservations.map((id) => {
      return this.reservationsDatabaseService.getOneFromId(id);
    });
    const fullOfReservations = await Promise.all(fullOfReservationsPromise);

    return {
      ...userData,
      accommodations: [...fullOfAccommodations],
      reservations: [...fullOfReservations],
    };
  }
}
