import { createApp } from 'vue'
import App from './App.vue'
import './registerServiceWorker'
import router from './router'
import store from './store'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'



//配置全局baseURL默认值
axios.defaults.baseURL="http://124.71.143.241:8080/"
axios.defaults.headers.post['Content-Type']='application/x-www-form-urlencoded'

const app = createApp(App).use(ElementPlus).use(store).use(router).use(VueAxios,axios)
//初始化图标
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
    app.component(key, component)
}

app.mount('#app')