import { createUsersDto } from 'src/users/dto/create-users.dto';

interface UserObjectType extends createUsersDto {
  id: string;
}
