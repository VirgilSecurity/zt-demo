declare global {
    namespace NodeJS {
        interface ProcessEnv {
            KYC_HOST: string,
            REP_URL: string
        }
    }
}

export {};
