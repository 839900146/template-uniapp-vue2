import type { TPluginProxy } from '@/plugins/request/request-plugin-proxy'

/** 请求配置 */
export const REQUEST_PRESET_ENV: CustomRequest.IPresetEnv = {
    current: 'prod',
    env: {
        /** 本地/开发环境 */
        // dev: 'http://192.168.3.85:5560',
        dev: 'http://192.168.3.72:9991',
        /** 生产环境 */
        prod: 'https://api.emoz.cloud',
        /** 测试环境 */
        test: 'https://test.playlarp.com',
    },
}

/** 网络代理插件 */
export const PLUGIN_PROXY: TPluginProxy = {
    /** 内网穿透 */
    through: {
        /** 是否启用内网穿透 */
        enable: false,
        /** 内网穿透地址 */
        address: 'http://local-net.nat300.top',
    },
    /** 前端反向代理 */
    proxy: {
        /** 是否启用 */
        enable: false,
        /** 代理列表 */
        list: {
            dev: {
                '^/api': {
                    target: 'http://localhost',
                },
            },
        },
    },
    /** 当前选择的代理 */
    current: REQUEST_PRESET_ENV.current
}