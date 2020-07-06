declare namespace NodeJS {
  export interface ProcessEnv {
    APP_URL?: string;
    NODE_ENV?: string;
    APP_SECRET?: string;
    DB_HOST?: string;
    DB_USER?: string;
    DB_PASS?: string;
    DB_NAME?: string;
  }
}
