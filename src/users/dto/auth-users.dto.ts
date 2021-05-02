import { PickType } from '@nestjs/mapped-types';
import { createUsersDto } from './create-users.dto';

export class authUserDto extends PickType(createUsersDto, [
  'email',
  'password',
] as const) {}
