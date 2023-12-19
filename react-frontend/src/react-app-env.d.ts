/// <reference types="react-scripts" />
declare module 'react-console-emulator';
declare module 'react-dynamic-virtual-scroll';
declare global {
    namespace NodeJS {
        interface ProcessEnv {
            REACT_APP_WEB_SOKET_BACKEND: string,
            REACT_APP_WEB_SOKET_KYC: string,
            REACT_APP_API_URL: string
        }
    }
}

export {}
