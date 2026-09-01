import { fileURLToPath, URL } from 'node:url'
import { defineConfig, loadEnv } from 'vite'
import vue from '@vitejs/plugin-vue'

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  /**
   * 站点根路径（对应 import.meta.env.BASE_URL）
   * - 本地 / Cloudflare / 自定义域：/
   * - GitHub Pages 项目页：/仓库名/
   */
  const base = env.VITE_BASE || '/'

  return {
    base,
    plugins: [vue()],
    resolve: {
      alias: {
        // @ 映射到 src/，与 tsconfig paths 保持一致
        '@': fileURLToPath(new URL('./src', import.meta.url)),
      },
    },
    server: {
      host: '0.0.0.0', // 允许局域网访问
      port: 3000,
    },
    preview: {
      host: '0.0.0.0',
      port: 4173,
    },
    css: {
      preprocessorOptions: {
        scss: {
          // 每个 .vue / .scss 文件自动注入变量，无需手动 @use
          additionalData: '@use "@/styles/variables.scss" as *;',
        },
      },
    },
    build: {
      outDir: 'dist',
      sourcemap: false,
      rollupOptions: {
        output: {
          // 将 Vue 生态与第三方依赖拆分为独立 chunk，优化缓存
          manualChunks(id) {
            if (!id.includes('node_modules')) return undefined
            if (/[\\/]node_modules[\\/](vue|vue-router|pinia)[\\/]/.test(id)) {
              return 'vue-vendor'
            }
            return 'vendor'
          },
        },
      },
    },
  }
})
