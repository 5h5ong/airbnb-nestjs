import { PartialType } from '@nestjs/mapped-types';
import { createUsersDto } from './create-users.dto';

export class updateUsersDto extends PartialType(createUsersDto) {}
