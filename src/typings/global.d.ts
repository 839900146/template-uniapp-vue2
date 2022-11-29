// 全局类型
import type { TSentry } from '@/plugins/report/Sentry'
declare module 'vue' {
	interface ComponentCustomProperties {
		$sentry: TSentry
	}
}

export {}
