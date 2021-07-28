export interface BooruOptions {
  /** Credentials for the API (Currently not used) */
  credentials?: any
  /** proxy setting */
  proxy?: `${'http' | 'https'}://${string}:${number}` | {
    host: string;
    port: number;
  }
}
