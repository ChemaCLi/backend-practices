import { BaseEntity } from '@app/commons/infrastructure/domain/base.entity';
import {Column, Entity, OneToOne, PrimaryGeneratedColumn, JoinColumn} from 'typeorm';
import { IUserMetadataSchema } from '../../domain/user-metadata';
import { UserEntity } from './user.entity';

@Entity({ name: 'users_metadata' })
export class UsersMetadataEntity extends BaseEntity implements IUserMetadataSchema {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  public id: number;

  @Column({
    name: 'bio',
    type: 'varchar',
    nullable: true,
    length: 1200,
  })
  bio: string;

  @Column({
    name: 'image',
    type: 'varchar',
    nullable: true,
    length: 1200,
  })
  image: string;

  @Column({
    name: 'birthday',
    type: 'timestamptz',
    nullable: true,
  })
  birthday: Date;

  @OneToOne(
    () => UserEntity,
    (user) => user.userMetadata
  )
  @JoinColumn({
    name: 'user_id',
    referencedColumnName: 'id',
  })
  user: UserEntity
}
