/**
 * 最小 Cloudflare Worker：健康检查 + 静态资源 SPA
 */
export interface Env {
  ASSETS: Fetcher
}

export default {
  async fetch(request: Request, env: Env): Promise<Response> {
    const url = new URL(request.url)

    if (url.pathname === '/api/health') {
      return Response.json({
        ok: true,
        service: 'vue-vite-starter',
        timestamp: Date.now(),
      })
    }

    if (env.ASSETS) {
      return env.ASSETS.fetch(request)
    }

    return new Response('Worker running. Build dist and deploy with wrangler.', {
      status: 200,
    })
  },
}
