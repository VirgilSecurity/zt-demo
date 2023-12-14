import {
	Request,
	Response
} from 'express';
import {
	ProfileDetails
} from '../interfaces/profile.interface.js';
import {
	AccountDetails,
} from '../interfaces/account.interface.js';
import { VirgilPrivateKey } from 'virgil-crypto/dist/types/VirgilPrivateKey';
import { NodeBuffer } from '@virgilsecurity/data-utils';
import { Filter } from '../interfaces/filter.interface';
import {
	ApplicationChartMocks,
	DevicesChartMocks,
	PolicesChartMocks,
	UsersChartMocks
} from '../mocks/charMocks.js';
import { TransactionsChart } from '../interfaces/chart.interface';
import { Axios } from 'axios';

class MainRouterController {

	async getProfileDetails(req: Request, res: Response<{data: ProfileDetails} | {message: string}>) {
		const profileInfo = req.app.get('profileInfo');
		res.json({data: profileInfo});
	}

	async getAccountDetails(req: Request<{id: string}>, res: Response<{data: AccountDetails} | {message: string}>) {
		const accountDetails = req.app.get('accountDetails');
		res.json({data: accountDetails});
	}

	async getTransaction(req: Request<{data: string}>, res: Response<{data: unknown} | {message: string}>) {
		const newTransaction = req.body.data as Filter;
		const profileInfo = req.app.get('profileInfo') as ProfileDetails;
		let flag = true;
		const accountDetails = req.app.get('accountDetails') as AccountDetails;
		profileInfo.accounts.forEach((value) => {
			if (value.currency === newTransaction.currency && +value.balance - newTransaction.amount > 0) {
				accountDetails.transactions.push({
					createdDate: createdDate(),
					amount: newTransaction.amount + '',
					currency: newTransaction.currency,
					type: 'DEBIT'
				});
				value.balance ='' + ((+value.balance - newTransaction.amount).toFixed(2));
				flag = false;
			}
		});
		req.app.set('accountDetails', accountDetails);
		req.app.set('profileInfo', profileInfo);
		if (flag) {
			res.status(404);
			const response = 'No such big money!';
			return res.json({ data: response } );
		}
		const response = '{"id":"555-555-555-555"}'
		return res.json({ data: response } );
	}

	async chartData(req: Request, res: Response<{data: unknown}>) {
		const accountDetails = req.app.get('accountDetails') as AccountDetails;
		const applicationData = JSON.parse(ApplicationChartMocks);
		const policesData = JSON.parse(PolicesChartMocks);
		const usersData = JSON.parse(UsersChartMocks);
		const devicesData = JSON.parse(DevicesChartMocks);
		const dateArray: string[]= [];
		const transactionsData: TransactionsChart[] = [];
		accountDetails.transactions.forEach((value) => {
			if (dateArray.includes(value.createdDate)) {
				transactionsData.find((transaction) => transaction.createdDate === value.createdDate.split(' ')[0])!.count++;
			} else {
				transactionsData.push({
					createdDate: value.createdDate.split(' ')[0],
					count: 1,
				});
				dateArray.push(value.createdDate);
			}
		});
		const collectedData = {
			application: applicationData,
			polices: policesData,
			users: usersData,
			devices: devicesData,
			transactions: transactionsData,
		};
		res.send({data: collectedData});
	}
}

function createdDate(): string {
	const date = new Date();
	const day = +date.getDate() < 10 ? '0' + date.getDate() : date.getDate();
	const month = +date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1;
	const year = +date.getFullYear();
	const hours = +date.getHours() < 10 ? '0' + date.getHours() : date.getHours();
	const minutes = +date.getMinutes() < 10 ? '0' + date.getMinutes() : date.getMinutes();
	return day + '.' + month + '.' + year + ' ' + hours + ':' + minutes;
}


export default new MainRouterController();
