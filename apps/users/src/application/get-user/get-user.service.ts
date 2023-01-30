import { IApplicationService } from '@app/commons/application/contracts/application-service';
import { Inject, Injectable } from '@nestjs/common';
import { IUserSchema } from '../../domain/user';
import { UserRepository } from '../../infrastructure/repositories/user.repository';
import { USER_REPOSITORY, ASSET_SIGNER } from '../constants/injection-tokens';
import { GetUserCommand } from './get-user.command';
import { IAssetSigner } from '../../domain/contracts/asset-signer';

@Injectable()
export class GetUserService implements IApplicationService<GetUserCommand> {
  constructor(
    @Inject(USER_REPOSITORY) private userRepository: UserRepository,
    @Inject(ASSET_SIGNER) private assetSigner: IAssetSigner,
  ) {}

  async process(command: GetUserCommand): Promise<IUserSchema> {
    const user = await this.userRepository.getById(command.id);
    await user.preSignImageUrl(this.assetSigner);

    return user.entityRoot();
  }
}
