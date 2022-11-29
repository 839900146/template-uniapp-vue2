import { REQUEST_PRESET_ENV } from '@/config/config'
import RequestPlugin from '@/plugins/request/request-plugin'

/**
 * 请求配置
 */
export const PRESET_ENV: CustomRequest.IPresetEnv = REQUEST_PRESET_ENV

/** 请求方法 */
export const request = <T>(config: CustomRequest.IRequestConfig): CustomRequest.TResponse<T> => {

	return new Promise(async (resolve, reject) => {
		// 请求配置
		const baseConfig = {
			url: `${PRESET_ENV.env[PRESET_ENV.current]}${config.url}`,
			method: config.method,
			data: config.data || {},
			timeout: config.timeout || 5000,
			header: {
				'content-Type': config.contentType || 'application/json',
				// @ts-ignore
				...config.headers,
			},
		}

		// 成功处理函数
		const success: UniNamespace.RequestOptions['success'] = async (result) => {
			if (result.statusCode === 200) {
				// 执行插件
				await RequestPlugin.apply('response', { config, options, result })
				// 返回数据
				resolve(result.data as CustomRequest.IResponseFormat<T>)
			} else {
				reject(result)
			}
		}

		const fail: UniNamespace.RequestOptions['fail'] = async (error) => {
			// 执行插件
			await RequestPlugin.apply('error', { config, options })
			reject(error)
		}

		const options: UniApp.RequestOptions = {
			...baseConfig,
			success,
			fail,
		}

		// 执行插件
		await RequestPlugin.apply('request', { config, options })

		uni.getNetworkType({
			success: ({ networkType }) => {
				if (networkType === 'none') {
					return uni.showModal({
						title: '提示',
						content: '网络异常，请检查网络后重试',
						showCancel: false,
						confirmText: '确定',
					})
				} else {
					// 发起请求
					uni.request(options)
				}
			},
		})
	})
}

/** get请求 */
export const get = <T>(config: CustomRequest.TRequestHandleOption): CustomRequest.TResponse<T> => {
	return request({ ...config, method: 'GET' })
}

/** post请求 */
export const post = <T>(config: CustomRequest.TRequestHandleOption): CustomRequest.TResponse<T> => {
	return request({ ...config, method: 'POST' })
}

/** put请求 */
export const put = <T>(config: CustomRequest.TRequestHandleOption): CustomRequest.TResponse<T> => {
	return request({ ...config, method: 'PUT' })
}

/** del请求 */
export const del = <T>(config: CustomRequest.TRequestHandleOption): CustomRequest.TResponse<T> => {
	return request({ ...config, method: 'DELETE' })
}

/** form请求 */
export const form = <T>(config: CustomRequest.TRequestHandleOption): CustomRequest.TResponse<T> => {
	return request({
		...config,
		method: 'POST',
		contentType: 'application/x-www-form-urlencoded',
	})
}
