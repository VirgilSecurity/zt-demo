import {
	Request,
	Response
} from 'express';

class KycController {

	async test(req: Request, res:Response) {
		req.app.get('ws').send('test');
		res.json('test')
	}
}


export default new KycController();
