import { PLUGIN_PROXY } from '@/config/config'
import { TPlugin } from './request-plugin'

/** 代理配置 */
export type TProxy = Record<
    string,
    {
        /** 目标地址 */
        target: string
        /** 重写URL */
        rewrite?: Record<string, string>
    }
>

/** 代理列表 */
export type TProxyList = Partial<Record<string, TProxy>>

/** 插件配置 */
export type TPluginProxy = {
    /** 内网穿透 */
    through: {
        /** 是否启用内网穿透 */
        enable: boolean,
        /** 内网穿透地址 */
        address: string,
    },
    proxy: {
        /** 是否启用 */
        enable: boolean,
        /** 代理列表 */
        list: TProxyList
    },
    /** 当前选择的代理 */
    current: string
}

const proxy = PLUGIN_PROXY.proxy.list[PLUGIN_PROXY.current]

export default {
    name: 'request-plugin-proxy',
    lifeCycle: 'request',
    use: (params: CustomRequest.TPluginOptions) => {

        try {
            let { config, options } = params

            if (PLUGIN_PROXY.proxy.enable !== true) return

            if (!options) return

            let prefix = config.url

            if (PLUGIN_PROXY.through.enable === true) {
                return (options.url = `${PLUGIN_PROXY.through.address}${config.url}`)
            }

            if(!proxy) return;

            let proxyKey = Object.keys(proxy).find((item) => {
                return new RegExp(item).test(prefix)
            })

            if (!proxyKey) return

            let proxyConfig = proxy?.[proxyKey]

            let proxyUrl = proxyConfig?.target

            if (!proxyUrl) return

            if (proxyConfig?.rewrite) {
                let result = Object.entries(proxyConfig.rewrite)?.pop?.()
                if (result?.length === 2) {
                    prefix = prefix.replace(new RegExp(result[0]), result[1])
                }
            }

            options.url = `${proxyUrl}${prefix}`
        } catch (e) {
            console.error('请求代理插件执行失败', e)
        }
    },
} as TPlugin
