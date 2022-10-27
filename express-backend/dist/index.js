import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morganMiddleware from './logger/morganMiddleware.js';
import routes from './routes/routes.js';
import { initCrypto, VirgilAccessTokenSigner, VirgilCrypto } from "virgil-crypto";
import { JwtGenerator } from "virgil-sdk";
dotenv.config();
const start = async () => {
    // create express app
    const app = express();
    await initCrypto();
    const virgilCrypto = new VirgilCrypto();
    const accessTokenSigner = new VirgilAccessTokenSigner(virgilCrypto);
    const apiKey = virgilCrypto.importPrivateKey({
        value: process.env.APP_KEY ?? '',
        encoding: 'base64',
    });
    const jwtGenerator = new JwtGenerator({
        apiKey,
        accessTokenSigner,
        appId: process.env.APP_ID ?? '',
        apiKeyId: process.env.APP_KEY_ID ?? '',
    });
    // use custom middlewares for logs and json convert
    app.use(cors());
    app.use(express.json());
    app.use(morganMiddleware);
    // apply routes
    app.use(routes);
    app.get('/', (req, res) => {
        res.send(jwtGenerator.generateToken('111'));
    });
    return app;
};
start().then((app) => {
    app.listen(process.env.PORT, () => {
        console.log('server is running');
    });
});
//# sourceMappingURL=index.js.map