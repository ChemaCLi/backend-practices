import { DatabaseModule } from '@app/commons/infrastructure/database/database.module';
import { ConfigModule } from '@app/config/config.module';
import { options } from '@app/config/options/config.options';
import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import {
  ASSET_SIGNER,
  USER_REPOSITORY,
} from './application/constants/injection-tokens';
import { CreateUserService } from './application/create-user/create-user.service';
import { DeleteUserService } from './application/delete-user/delete-user.service';
import { GetUserService } from './application/get-user/get-user.service';
import { ListUsersService } from './application/list-users/list-users.service';
import { UserController } from './infrastructure/controllers/user.controller';
import { UsersController } from './infrastructure/controllers/users.controller';
import { UserEntity } from './infrastructure/domain/user.entity';
import { UserRepository } from './infrastructure/repositories/user.repository';
import { UsersMetadataEntity } from './infrastructure/domain/users-metadata.entity';
import { CountUsersService } from './application/list-users/count-users.service';
import { AwsS3AssetSigner } from './infrastructure/aws-s3-asset-signer';

@Module({
  imports: [
    ConfigModule.forRoot(options),
    TypeOrmModule.forFeature([UserEntity, UsersMetadataEntity]),
    DatabaseModule,
  ],
  controllers: [UserController, UsersController],
  providers: [
    CreateUserService,
    ListUsersService,
    CountUsersService,
    GetUserService,
    DeleteUserService,
    {
      provide: USER_REPOSITORY,
      useClass: UserRepository,
    },
    {
      provide: ASSET_SIGNER,
      useClass: AwsS3AssetSigner,
    },
  ],
  exports: [USER_REPOSITORY, ASSET_SIGNER],
})
export class UsersModule {}
