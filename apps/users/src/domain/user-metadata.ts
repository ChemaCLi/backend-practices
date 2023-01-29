import { UsersMetadataEntity } from '../infrastructure/domain/users-metadata.entity';

export interface IUserMetadataSchema {
  id: number;
  bio: string;
  image: string;
  birthday?: Date;
  created_at?: Date;
  updated_at?: Date;
}

export class UserMetadata {
  private _entityRoot: IUserMetadataSchema;

  constructor({
    bio,
    image,
    birthday,
    created_at = new Date(),
    updated_at = new Date(),
    id = null,
  }: {
    id?: number;
    bio: string;
    image: string;
    birthday?: Date;
    created_at?: Date;
    updated_at?: Date;
  }) {
    this._entityRoot = new UsersMetadataEntity();
    this._entityRoot.id = id;
    this._entityRoot.bio = bio;
    this._entityRoot.image = image;
    this._entityRoot.birthday = birthday;
    this._entityRoot.created_at = created_at;
    this._entityRoot.updated_at = updated_at;
  }

  public hydrate(root: IUserMetadataSchema): void {
    this._entityRoot = root;
  }

  public entityRoot(): IUserMetadataSchema {
    return this._entityRoot;
  }
}
