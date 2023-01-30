import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { IUserRepository } from '../../domain/contracts/user.repository';
import { User } from '../../domain/user';
import { UserEntity } from '../domain/user.entity';
import { UsersMetadataEntity } from '../domain/users-metadata.entity';

@Injectable()
export class UserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UsersMetadataEntity)
    protected readonly userMetadataRepository: Repository<UsersMetadataEntity>,
  ) {}

  private createBuilder(): SelectQueryBuilder<UserEntity> {
    return this.userRepository.createQueryBuilder('user');
  }

  async persist(entity: User): Promise<void> {
    const userProperties = entity.entityRoot()

    const user = new UserEntity()
    Object.assign(user, userProperties)

    const metadata = this.userMetadataRepository.create({ bio: userProperties.userMetadata.bio })

    metadata.bio = userProperties.userMetadata.bio
    user.userMetadata = metadata

    await this.userRepository.save(user);
  }

  async list(): Promise<User[]> {
    const result = await this.createBuilder().getMany();

    return result.map((user) => new User(user));
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id });

    return new User(user);
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }
}
