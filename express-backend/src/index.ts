import cors from 'cors';
import dotenv from 'dotenv';
import express, {
	Express,
	Request,
	Response
} from 'express';
import morganMiddleware from './logger/morganMiddleware.js';
import routes from './routes/routes.js';
import {
	initCrypto,
	KeyPairType,
	VirgilCrypto,
	VirgilKeyPair
} from 'virgil-crypto';
import { AccountDetailsMocks } from './mocks/accountDetailsMocks.js';
import { AccountDetails } from './interfaces/account.interface.js';
import { ProfileDetailsMocks } from './mocks/profileDetailsMocks.js';
import { ProfileDetails } from './interfaces/profile.interface.js';
import * as http from 'http';
import { WebSocketServer } from 'ws';


dotenv.config();

const app: Express = express();

(async () => {
	// create express app

	await initCrypto();
	const virgilCrypto = new VirgilCrypto({defaultKeyPairType: KeyPairType.ED25519});
	const keyPair: VirgilKeyPair = virgilCrypto.generateKeys(KeyPairType.ED25519);

	//set global app variables
	app.set('keyPair', keyPair);
	app.set('virgilCrypto', virgilCrypto);
	app.set('accountDetails', JSON.parse(AccountDetailsMocks) as unknown as AccountDetails);
	app.set('profileInfo', JSON.parse(ProfileDetailsMocks) as unknown as ProfileDetails);


	// use custom middlewares for logs and json convert
	app.use(cors());
	app.use(express.json());
	app.use(morganMiddleware);

	// apply routes
	app.use(routes);

	app.get('/', (req: Request, res: Response) => {
		res.send('Application is running');
	});

	const server = http.createServer(app);
	const wss = new WebSocketServer({server});
	wss.on('open', (ws, request, client) => {
		console.log(client);
		console.log(request);
		client.send('connected!');
	});
	wss.on('connection', (ws) => {
		app.set('ws', ws);
		ws.on('message', (data) => {
			console.log(data);
		});
		ws.send('data');
	});
	server.listen(3002, () => {
		console.log('server is running');
	});
})();


