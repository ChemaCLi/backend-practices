import { Command } from '@app/commons/application/contracts/command';
import { IsNumberString } from 'class-validator';

export class GetUserCommand implements Command {
  @IsNumberString()
  id: number;

  constructor(props: Partial<GetUserCommand>) {
    Object.assign(this, props);
  }
}
