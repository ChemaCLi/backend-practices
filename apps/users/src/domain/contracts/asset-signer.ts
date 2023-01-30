export interface IAssetSigner {
  signAssetUrl(
    path: string,
    expiredInSeconds?: number,
  ): Promise<string | undefined>;
}
