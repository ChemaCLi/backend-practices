import { UserEntity } from '../infrastructure/domain/user.entity';
import { IUserMetadataSchema } from './user-metadata';
import { IAssetSigner } from './contracts/asset-signer';

export interface IUserSchema {
  id: number;
  name: string;
  email: string;
  code?: string | null;
  userMetadata?: Partial<IUserMetadataSchema>;
  created_at?: Date;
  updated_at?: Date;
}

export class User {
  private _entityRoot: IUserSchema;

  constructor({
    name,
    email,
    code = null,
    created_at = new Date(),
    updated_at = new Date(),
    id = null,
    userMetadata,
  }: {
    name: string;
    email: string;
    created_at?: Date;
    updated_at?: Date;
    code?: string | null;
    id?: number;
    userMetadata?: Partial<IUserMetadataSchema>;
  }) {
    this._entityRoot = new UserEntity();
    this._entityRoot.name = name;
    this._entityRoot.email = email;
    this._entityRoot.code = code;
    this._entityRoot.created_at = created_at;
    this._entityRoot.updated_at = updated_at;
    this._entityRoot.id = id;
    this._entityRoot.userMetadata = userMetadata;
  }

  get email(): string {
    return this._entityRoot.email;
  }

  public hydrate(root: IUserSchema): void {
    this._entityRoot = root;
  }

  public entityRoot(): IUserSchema {
    return this._entityRoot;
  }

  public async preSignImageUrl(assetSigner: IAssetSigner): Promise<void> {
    try {
      if (this._entityRoot?.userMetadata?.image) {
        this._entityRoot.userMetadata.image = await assetSigner.signAssetUrl(
          this._entityRoot.userMetadata.image,
          1800,
        );
      }
    } catch (error) {
      // eslint-disable-next-line
      console.error(error);
    }
  }
}
