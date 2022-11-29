import requestPluginProxy from './request-plugin-proxy'

export type TLifeCycle = 'request' | 'response' | 'error'

export type TPlugin = {
	name: string
	lifeCycle: TLifeCycle
	use: (options?: unknown) => void
}

class RequestPlugin {
	private collects: Record<TLifeCycle, Map<string, TPlugin>>

	constructor() {
		this.collects = {
			request: new Map(),
			response: new Map(),
			error: new Map(),
		} as Record<TLifeCycle, Map<string, TPlugin>>
	}

	/**
	 * 注入插件
	 */
	inject(plugin: TPlugin) {
		if (!this.collects[plugin.lifeCycle].get(plugin.name)) {
			this.collects[plugin.lifeCycle].set(plugin.name, plugin)
		}
	}

	/**
	 * 执行插件
	 */
	async apply(type: TLifeCycle, options?: unknown) {
		return new Promise<void>(async (resolve) => {
			let values = this.collects[type].values()

			for (const iterator of values) {
				try {
					await iterator.use(options)
				} catch (e) {
					console.error('插件执行出错', e)
				}
			}

			resolve()
		})
	}
}

const instance = new RequestPlugin

instance.inject(requestPluginProxy)

export default instance