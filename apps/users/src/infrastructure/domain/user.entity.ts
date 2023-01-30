import { BaseEntity } from '@app/commons/infrastructure/domain/base.entity';
import { Column, Entity, OneToOne, PrimaryGeneratedColumn } from 'typeorm';
import { IUserSchema } from '../../domain/user';
import { UsersMetadataEntity } from './users-metadata.entity';

@Entity({ name: 'users' })
export class UserEntity extends BaseEntity implements IUserSchema {
  @PrimaryGeneratedColumn('increment', { unsigned: true })
  public id: number;

  @Column({
    name: 'name',
    type: 'varchar',
    length: 150,
    nullable: true,
  })
  name: string;

  @Column({
    name: 'email',
    type: 'varchar',
    length: 100,
    nullable: true,
  })
  email: string;

  @Column({
    name: 'code',
    type: 'varchar',
    length: 6,
    unique: true,
    nullable: true,
  })
  code: string;
  @OneToOne(() => UsersMetadataEntity, (userMetadata) => userMetadata.user, {
    eager: true,
    cascade: true,
  })
  userMetadata: UsersMetadataEntity;
}
