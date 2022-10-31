import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morganMiddleware from './logger/morganMiddleware.js';
import routes from './routes/routes.js';
import { initCrypto, KeyPairType, VirgilCrypto } from "virgil-crypto";
dotenv.config();
const app = express();
(async () => {
    // create express app
    await initCrypto();
    const virgilCrypto = new VirgilCrypto({ defaultKeyPairType: KeyPairType.ED25519 });
    const keyPair = virgilCrypto.generateKeys(KeyPairType.ED25519);
    app.set('keyPair', keyPair);
    app.set('virgilCrypto', virgilCrypto);
    // use custom middlewares for logs and json convert
    app.use(cors());
    app.use(express.json());
    app.use(morganMiddleware);
    // apply routes
    app.use(routes);
    app.get('/', (req, res) => {
        res.send('Application is running');
    });
    app.listen('3002', () => {
        console.log('server is running');
    });
})();
//# sourceMappingURL=index.js.map