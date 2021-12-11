import { HttpService, Injectable } from '@nestjs/common';
import { CreateAccommodationsDto } from './dto/create-accommodations.dto';
import { AccommodationsDatabaseService } from 'src/database/accommodationsDatabase/accommodationsDatabase.service';
import { UpdateAccommodationsDto } from './dto/update-accommodations.dto';
import { UsersDatabaseService } from 'src/database/users-database/users-database.service';
import { map } from 'rxjs/operators';
import { RealAccommodationDto } from './dto/real-accommodations.dto';
import { ReservationDatabaseService } from 'src/database/reservation-database/reservation-database.service';

@Injectable()
export class AccommodationsService {
  constructor(
    private accommodationsDatabaseService: AccommodationsDatabaseService,
    private userDatabaseService: UsersDatabaseService,
    private reservationDatabaseService: ReservationDatabaseService,
    private httpService: HttpService,
  ) {}

  async create(accommodationsData: CreateAccommodationsDto, req: any) {
    // return value를 전달해주기 위해 subscribe()를 쓰기보단 toPromise()를 쓰기로 했음
    // 주소 -> Google Latlng(좌표)
    const data = await this.httpService
      .get('https://maps.googleapis.com/maps/api/geocode/json', {
        params: {
          key: process.env.GOOGLE_API_KEY,
          address: accommodationsData.address,
        },
      })
      .pipe(map((res) => res.data.results[0].geometry.location))
      .toPromise();

    const accommodationObject: RealAccommodationDto = {
      ...accommodationsData,
      user: req.user.id,
      lng: data.lng,
      lat: data.lat,
    };

    // Accommodation 생성 및 데이터 반환
    const accommodationData = await this.accommodationsDatabaseService.create(
      accommodationObject,
    );

    // User에 생성될 Accommodation ID 등록
    await this.userDatabaseService.connectAccommodation(
      req.user.id,
      accommodationData.id,
    );

    return accommodationObject;
  }

  async getAll() {
    return this.accommodationsDatabaseService.getAll();
  }

  async getOne(id: string) {
    return this.accommodationsDatabaseService.getOne(id);
  }

  async getOneWithComputedField(id: string, requestUserId: string) {
    const accommodationData = await this.accommodationsDatabaseService.getOne(
      id,
    );
    const { reservations } = accommodationData;
    return {
      ...accommodationData,
      requestUserReservation: await (async () => {
        if (reservations) {
          for (const reservationId of reservations) {
            const requestUserReservationData = await this.reservationDatabaseService.getOneFromId(
              reservationId,
            );
            const { userId } = requestUserReservationData;
            if (userId === requestUserId) {
              return requestUserReservationData;
            }
          }
        }
        return {};
      })(),
    };
  }

  delete(id: string) {
    return this.accommodationsDatabaseService.delete(id);
  }

  update(id: string, accommodationsData: UpdateAccommodationsDto) {
    return this.accommodationsDatabaseService.update(id, accommodationsData);
  }
}
