import qs from 'query-string';

export const ENDPOINT = '//localhost:3001/';

class ApiCall {
	private domain;
	constructor(domain: string) {
		this.domain = domain;
	}

	async perform(url: string, data?: unknown, config?: object) {
		const request = await fetch(`${this.domain}${url}`, {
			...config,
			body: JSON.stringify(data),
			headers: {
				'Content-Type': 'application/json',
			}
		});

		return await request.json();
	}

	async get(path: string, searchParams: unknown) {
		return await this.perform(`${path}?${qs.stringify(searchParams)}`);
	}

	async post(path: string, payload: unknown) {
		return await this.perform(path, payload, {
			method: 'POST'
		});
	}

	async put(path: string, payload: unknown) {
		return await this.perform(path, payload, {
			method: 'PUT'
		});
	}

	async delete(path: string) {
		return await this.perform(path, null, {
			method: 'DELETE'
		});
	}
}

export default new ApiCall(ENDPOINT);
