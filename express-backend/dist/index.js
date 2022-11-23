import cors from 'cors';
import dotenv from 'dotenv';
import express from 'express';
import morganMiddleware from './logger/morganMiddleware.js';
import routes from './routes/routes.js';
import { initCrypto, KeyPairType, VirgilCrypto } from 'virgil-crypto';
import { AccountDetailsMocks } from './mocks/accountDetailsMocks.js';
import { ProfileDetailsMocks } from './mocks/profileDetailsMocks.js';
import * as http from 'http';
import { WebSocketServer } from 'ws';
dotenv.config();
const app = express();
(async () => {
    // create express app
    await initCrypto();
    const virgilCrypto = new VirgilCrypto({ defaultKeyPairType: KeyPairType.ED25519 });
    const keyPair = virgilCrypto.generateKeys(KeyPairType.ED25519);
    //set global app variables
    app.set('keyPair', keyPair);
    app.set('virgilCrypto', virgilCrypto);
    app.set('accountDetails', JSON.parse(AccountDetailsMocks));
    app.set('profileInfo', JSON.parse(ProfileDetailsMocks));
    // use custom middlewares for logs and json convert
    app.use(cors());
    app.use(express.json());
    app.use(morganMiddleware);
    // apply routes
    app.use(routes);
    app.get('/', (req, res) => {
        res.send('Application is running');
    });
    const server = http.createServer(app);
    const wss = new WebSocketServer({ server });
    wss.on('open', (ws, request, client) => {
        client.send('connected!');
    });
    wss.on('connection', (ws) => {
        app.set('ws', ws);
    });
    server.listen(3002, () => {
        console.log('server is running');
    });
})();
//# sourceMappingURL=index.js.map