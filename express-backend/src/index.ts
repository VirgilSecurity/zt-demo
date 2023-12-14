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
import { ZtMiddleware } from './middleware/InitializeClass.js';
import fs from "fs";


dotenv.config();

const app: Express = express();

const TemplateStorage: Map<string, any> = new Map<string, any>();

const storageSave = (key: unknown, isClient: boolean) => {
	TemplateStorage.set(isClient ? 'client' : 'server', key);
};

const storageLoad = (isClient: boolean) => {
	return isClient ? TemplateStorage.get('client') : TemplateStorage.get('server');
};

function storage(isSave: boolean, isClient: boolean, key?: unknown) {
	if (isSave) {
		storageSave(key, isClient);
		return;
	}
	return storageLoad(isClient);
}

const virgil = new ZtMiddleware({
	baseUrl: '/api',
	loginPath: '/login',
	registerPath: '/register',
	keyType: KeyPairType.ED25519,
	replayingId: 'zt.virgilsecurity.com',
	expectedOrigin: ['https://zt.virgilsecurity.com/', 'https://zt.virgilsecurity.com' ],
	storageControl: storage,
	encoding: 'base64'
});

app.set('accountDetails', JSON.parse(AccountDetailsMocks) as unknown as AccountDetails);
app.set('profileInfo', JSON.parse(ProfileDetailsMocks) as unknown as ProfileDetails);
app.set('virgil', virgil);


// use custom middlewares for logs and json convert
app.use(cors());
app.use(express.json());
app.use(morganMiddleware);
app.use(virgil.zeroTrustMiddleware);

// apply routes
app.use(routes);

app.get('/', (req: Request, res: Response) => {
	res.send('Application is running');
});

const server = http.createServer(app);
const wss = new WebSocketServer({server});
wss.on('open', (ws, request, client) => {
	client.send('connected!');
});
wss.on('connection', (ws) => {
	app.set('ws', ws);
});
server.listen(33433, () => {
	console.log('server is running');
});

[ 'exit', 'SIGINT', 'SIGUSR1', 'SIGUSR2', 'uncaughtException', 'SIGTERM' ].forEach((eventType) => {
	process.on(eventType, () => {
		console.log('write to file');
		const saveObject: { serverKeys: unknown[], clientKeys: unknown[] } = {serverKeys: [], clientKeys: []};
		TemplateStorage.forEach((value: unknown, key) => {
			if (key == 'server') {
				saveObject.serverKeys.push(value);
			} else {
				saveObject.clientKeys.push(value);
			}
		});
		fs.writeFile('storage.json', JSON.stringify(saveObject), (err) => {
			console.log(err);
			console.log('Saved to file!');
		});
	});
});



