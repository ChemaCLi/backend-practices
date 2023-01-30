import { Injectable } from '@nestjs/common';
import { getSignedUrl } from '@aws-sdk/s3-request-presigner';
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3';
import { IAssetSigner } from '../domain/contracts/asset-signer';

@Injectable()
export class AwsS3AssetSigner implements IAssetSigner {
  private readonly client: S3Client;
  private readonly bucket: string;
  private readonly options: any;

  constructor() {
    this.bucket = process.env.AWS_S3_BUCKET_NAME;

    this.client = new S3Client({
      region: process.env.AWS_REGION,
      endpoint: process.env.AWS_ENDPOINT,
      credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
      },
      forcePathStyle: true,
    });
  }

  public signAssetUrl(
    assetKey: string,
    duration?: number,
  ): Promise<string | undefined> {
    const expiresIn = duration ?? this.options.s3ExpirationTime;
    const command = new GetObjectCommand({
      Bucket: this.bucket,
      Key: assetKey,
    });

    return getSignedUrl(this.client, command, { expiresIn })
      .then((signedUrl) => signedUrl)
      .catch((err) => {
        // eslint-disable-next-line
        console.error(err);
        return '';
      });
  }
}
