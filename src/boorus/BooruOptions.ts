export interface BooruOptions {
  /** Credentials for the API (Currently not used) */
  credentials?: any
  /** proxy setting */
  proxy?: string | {
    host: string;
    port: number;
  }
}
