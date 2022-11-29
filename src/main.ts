import Vue from 'vue'
import App from './App.vue'
import fsPlugin from 'uniapp-fs/fs-plugin'
import toPlugin from 'uniapp-to/to-plugin'

Vue.config.productionTip = false

Vue.use(fsPlugin).use(toPlugin)

const app = new (typeof App === 'function' ? App : Vue.extend(Object.assign({}, App)))

app.$mount();
