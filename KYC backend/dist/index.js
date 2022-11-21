import cors from 'cors';
import dotenv from 'dotenv';
import express from "express";
import { initCrypto, KeyPairType, VirgilCrypto } from "virgil-crypto";
import morganMiddleware from "./logger/morganMiddleware.js";
import router from "./routes/routes.js";
import * as http from "http";
import { WebSocketServer } from "ws";
dotenv.config();
const app = express();
(async () => {
    await initCrypto();
    const virgilCrypto = new VirgilCrypto({
        defaultKeyPairType: KeyPairType.ED25519
    });
    const keyPair = virgilCrypto.generateKeys(KeyPairType.ED25519);
    app.set('keyPair', keyPair);
    app.set('virgilCrypto', virgilCrypto);
    app.set('status', { status: 'not_verified', need_verify: true });
    app.use(cors());
    app.use(express.json());
    app.use(morganMiddleware);
    app.use(router);
    app.get('/', (req, res) => {
        res.send('runned');
    });
    const server = http.createServer(app);
    const wss = new WebSocketServer({ server });
    wss.on("open", (ws, request, client) => {
        console.log(client);
        console.log(request);
        client.send('connected!');
    });
    wss.on("connection", (ws) => {
        app.set('ws', ws);
        ws.on('message', (data) => {
            console.log(data);
        });
        ws.send('data');
    });
    server.listen(3004, () => {
        console.log('server is running');
    });
})();
//# sourceMappingURL=index.js.map