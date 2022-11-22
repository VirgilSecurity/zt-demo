import cors from 'cors';
import dotenv from 'dotenv';
import express, {
	Express,
	Request,
	Response
} from 'express';
import {
	initCrypto,
	KeyPairType,
	VirgilCrypto,
	VirgilKeyPair
} from 'virgil-crypto';
import morganMiddleware from './logger/morganMiddleware.js';
import router from './routes/routes.js';
import * as http from 'http';
import { WebSocketServer } from 'ws';


dotenv.config();

const app: Express = express();

(async () => {
	await initCrypto();

	const virgilCrypto = new VirgilCrypto({
		defaultKeyPairType: KeyPairType.ED25519
	});
	const keyPair: VirgilKeyPair = virgilCrypto.generateKeys(KeyPairType.ED25519);
	app.set('keyPair', keyPair);
	app.set('virgilCrypto', virgilCrypto);
	app.set('isLogged', false);

	app.use(cors());
	app.use(express.json());
	app.use(morganMiddleware);
	app.use(router);

	app.get('/', (req: Request, res: Response) => {
		res.send('runned');
	});

	const server = http.createServer(app);
	const wss = new WebSocketServer({server});
	wss.on('open', (ws, request, client) => {
		client.send('connected!');
	});
	wss.on('connection', (ws) => {
		app.set('ws', ws);
	});
	server.listen(3004, () => {
		console.log('server is running');
	});
})();


