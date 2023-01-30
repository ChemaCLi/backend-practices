import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { IUserRepository } from '../../domain/contracts/user.repository';
import { User } from '../../domain/user';
import { UserEntity } from '../domain/user.entity';
import { UsersMetadataEntity } from '../domain/users-metadata.entity';

@Injectable()
export class TypeORMUserRepository implements IUserRepository {
  constructor(
    @InjectRepository(UserEntity)
    protected readonly userRepository: Repository<UserEntity>,
    @InjectRepository(UsersMetadataEntity)
    protected readonly userMetadataRepository: Repository<UsersMetadataEntity>,
  ) {}

  private createBuilder(): SelectQueryBuilder<UserEntity> {
    return this.userRepository.createQueryBuilder('user');
  }

  async persist(entity: User): Promise<User> {
    const userProperties = entity.entityRoot();

    const user = new UserEntity();
    Object.assign(user, userProperties);

    const metadata = this.userMetadataRepository.create({
      ...(userProperties.userMetadata || {}),
    });

    metadata.bio = userProperties.userMetadata.bio;
    user.userMetadata = metadata;

    const newUserData = await this.userRepository.save(user);
    return new User(newUserData)
  }

  async list({
    page,
    pageSize,
  }: {
    page: number;
    pageSize: number;
  }): Promise<User[]> {
    const result = await this.createBuilder()
      .skip((page - 1) * pageSize)
      .take(pageSize)
      .leftJoinAndSelect('user.userMetadata', 'users_metadata')
      .getMany();

    return result.map((user) => new User(user));
  }

  async getById(id: number): Promise<User> {
    const user = await this.userRepository.findOneByOrFail({ id });

    return new User(user);
  }

  async deleteById(id: number): Promise<void> {
    await this.userRepository.delete({ id });
  }

  count(): Promise<number> {
    return this.userRepository.count();
  }
}
