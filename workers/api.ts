/**
 * Cloudflare Worker 入口
 *
 * 职责：
 * 1. 处理 /api/* 请求（当前仅提供健康检查）
 * 2. 其余请求回退到 dist/ 静态资源（SPA 模式）
 *
 * 配置见 wrangler.jsonc 的 assets 与 run_worker_first 字段
 */

/** Worker 环境绑定类型，ASSETS 由 wrangler.jsonc 的 assets.binding 注入 */
export interface Env {
  ASSETS: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    // 健康检查接口，用于验证 Worker 是否正常运行
    if (url.pathname === '/api/health') {
      return Response.json({
        ok: true,
        service: 'vue-vite-starter',
        timestamp: Date.now(),
      })
    }

    // 静态资源由 Cloudflare Assets 绑定提供，未找到时自动回退 index.html（SPA）
    if (env.ASSETS) {
      return env.ASSETS.fetch(request)
    }

    // 未构建 dist 时的兜底提示
    return new Response('Worker running. Build dist and deploy with wrangler.', {
      status: 200,
    })
  },
}
