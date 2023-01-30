import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserSchema } from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { ASSET_SIGNER, USER_REPOSITORY } from '../constants/injection-tokens';
import { ListUsersCommand } from './list-users.command';
import { IAssetSigner } from '../../domain/contracts/asset-signer';

@Injectable()
export class ListUsersService implements IApplicationService<ListUsersCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
    @Inject(ASSET_SIGNER) private assetSigner: IAssetSigner,
  ) {}

  async process({ page, pageSize }: ListUsersCommand): Promise<IUserSchema[]> {
    return (await this.userRepository.list({ page, pageSize })).map((user) => {
      user.preSignImageUrl(this.assetSigner);
      return user.entityRoot();
    });
  }
}
