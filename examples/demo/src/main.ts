import App from './App.vue'
import router from './router'
import { createPinia } from 'pinia'
import '@/assets/css/index.css'
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
// import { Button } from '@yaoxfly/component-pc'
// console.log(Test)
import ComponentPc from '../../../packages/component-pc/index'
import '../../../packages/theme-chalk/src/index.scss'

createApp(App)
  .use(router)
  .use(createPinia())
  .use(ElementPlus)
  .use(ComponentPc)
  .mount('#app')
