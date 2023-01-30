import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { TypeORMUserRepository } from '../../infrastructure/repositories/typeorm-user.repository';
import { USER_REPOSITORY } from '../constants/injection-tokens';

@Injectable()
export class CountUsersService implements IApplicationService {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: TypeORMUserRepository,
  ) {}

  process(): Promise<number> {
    return this.userRepository.count();
  }
}
