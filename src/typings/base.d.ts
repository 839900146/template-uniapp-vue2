declare module CustomRequest {
	/**
	 * 响应体类型
	 */
	interface IResponseFormat<T> {
		/** 状态码 */
		code: number
		/** 提示信息 */
		msg: string
		/** 响应数据 */
		data: T
		[propName: string]: any
	}

	type TPluginOptions = {
		type: 'request' | 'response'
		config: UniApp.RequestOptions & IRequestConfig
		result?: UniApp.RequestSuccessCallbackResult
		params?: string
		options?: UniApp.RequestOptions
	}

	type TPluginKeys = 'request-plugin-inject-data'

	/**
	 * 请求配置项
	 */
	interface IRequestConfig {
		/** 要发送的数据 */
		data?: Record<string, any>
		/** 请求方式 */
		method: 'GET' | 'POST' | 'PUT' | 'DELETE'
		/** 接口URL */
		url: string
		/** 请求体类型，默认：application/json */
		contentType?: string
		/** 请求头 */
		headers?: Record<string, any>
		/** 超时时间(毫秒)，默认5000 */
		timeout?: number
		/** 使用插件 */
		usePlugins?: TPluginKeys[]
	}

	/**
	 * 单项请求配置-排除method
	 */
	type TRequestHandleOption = Omit<IRequestConfig, 'method'>

	/**
	 * 接口返回类型
	 */
	type TResponse<T> = Promise<IResponseFormat<T>>

	/**
	 * 环境变量key
	 */
	type TEnvs = 'dev' | 'prod' | 'test'

	/**
	 * request环境变量配置
	 */
	interface IPresetEnv {
		[x: string]: any
		/** 当前环境 */
		current: TEnvs
		/** 所有环境 */
		env: Record<TEnvs, string>
	}
}