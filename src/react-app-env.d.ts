/// <reference types="react-scripts" />

import any from "react-time-picker";

declare var process: {
  env: {
    NODE_ENV: string;
  };
};


declare module 'react-toast-notifications' {
  export const ToastProvider: any;
  export const withToastManager: any;
  export const DefaultToastContainer: any;
};
