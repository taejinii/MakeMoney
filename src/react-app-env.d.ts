/// <reference types="react-scripts" />

declare namespace NodeJS {
  interface ProcessEnv {
    REACT_APP_CURRENCY: string;
    REACT_APP_USD: string;
    REACT_APP_API_URL: string;
  }
}
