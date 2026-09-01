/// <reference types="vite/client" />

/**
 * 环境变量类型声明
 * 新增 VITE_ 变量时在此补充，以获得 TypeScript 提示与校验
 */
interface ImportMetaEnv {
  /** 站点根路径，构建时由 VITE_BASE 注入 */
  readonly VITE_BASE: string
  /** 应用标题 */
  readonly VITE_APP_TITLE: string
  /** 可选的后端 API 基址 */
  readonly VITE_API_BASE: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
