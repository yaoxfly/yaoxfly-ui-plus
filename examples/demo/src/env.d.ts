/// <reference types="vite/client" />
/// <reference types="@types/web-bluetooth" />
// declare module '*.vue' {
//   import type { DefineComponent } from 'vue'
//   const component: DefineComponent<object, object, any>
//   export default component
// }
declare module 'qs'
declare module 'postcss-import'
declare module 'rollup-plugin-external-globals'

interface ImportMetaEnv {
  readonly VITE_USER_NODE_ENV:string
  readonly VITE_APP_CURRENT_MODE: string
  readonly VITE_APP_PUBLIC_PATH: string
  // 更多环境变量...
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
