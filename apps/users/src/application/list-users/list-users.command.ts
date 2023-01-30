import { Command } from '@app/commons/application/contracts/command';
import { IsNumberString, MinLength } from 'class-validator';

export class ListUsersCommand implements Command {
  @IsNumberString()
  @MinLength(1)
  page: number;

  @IsNumberString()
  @MinLength(1)
  pageSize: number;
}
