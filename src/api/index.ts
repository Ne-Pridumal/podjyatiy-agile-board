import qs from 'query-string'

enum Methods {
	GET = "GET",
	POST = 'POST',
	PUT = "PUT",
	DELETE = "DELETE",
}

interface ConfigInterface {
	method: Methods
}

export const DOMAIN = 'http://localhost:3001'

class ApiCall {
	private domain: string

	constructor(domain: string) {
		this.domain = domain
	}

	async perform(url: string, data?: object, config?: ConfigInterface) {
		const req = await fetch(
			this.domain + '/' + url,
			{
				...config,
				body: JSON.stringify(data),
				headers: {
					'Content-type': 'app-json'
				}
			}
		);
		return await req.json()
	}

	async get(path: string, params?: object) {
		return await this.perform(`${path}?${qs.stringify(params)}`)
	}
	async post(path: string, data: object) {
		return await this.perform(path, data, {
			method: Methods.POST
		})
	}
	async put(path: string, data: object) {
		return await this.perform(path, data, {
			method: Methods.POST
		})
	}
	async delete(path: string) {
		return await this.perform(path, {
			method: Methods.DELETE
		})
	}
}

export default new ApiCall(DOMAIN)