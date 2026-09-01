# Vue Vite Starter

基于 Vue 3 + Vite + TypeScript 的空框架，内置 **GitHub Pages** 与 **Cloudflare Workers** 自动部署，与 `horizon-kit` 主项目同一套部署方式。

## 技术栈

- Vue 3、Vue Router、Pinia
- Vite 6、TypeScript、SCSS
- GitHub Actions（CI + Pages）
- Cloudflare Workers（静态资源 SPA + `/api/*`）

## 快速开始

```bash
cd starter
cp .env.example .env.development
npm install
npm run dev
```

浏览器打开 http://localhost:3000

## 环境变量

| 变量 | 说明 | 示例 |
|------|------|------|
| `VITE_BASE` | 站点根路径 | 本地 `/`，GitHub Pages `/仓库名/` |
| `VITE_APP_TITLE` | 页面标题 | `My App` |
| `VITE_API_BASE` | 可选 API 基址 | `https://xxx.workers.dev` |

## 本地构建

```bash
# 根路径（Cloudflare / 自定义域）
npm run build

# GitHub Pages 子路径
VITE_BASE=/your-repo-name/ npm run build
```

## GitHub Pages 自动部署

1. 将 `starter/` 目录复制为新仓库根目录（或直接把本目录当作独立仓库）。
2. 推送到 `main` 分支。
3. 在仓库 **Settings → Pages** 中：
   - **Source**：Deploy from a branch
   - **Branch**：`gh-pages` / `root`
4. 访问：`https://<用户名>.github.io/<仓库名>/`

工作流会自动设置 `VITE_BASE=/<仓库名>/`，并生成 `404.html` 与 `.nojekyll`。

## Cloudflare Workers 部署

### 本地

```bash
npm run cf:deploy
# 或
npx wrangler login
npm run build
npx wrangler deploy
```

修改 `wrangler.jsonc` 中的 `name` 为你的 Worker 名称。

### GitHub Actions

在仓库 Secrets 中配置：

- `CLOUDFLARE_API_TOKEN`
- `CLOUDFLARE_ACCOUNT_ID`

推送 `main` 后会由 `.github/workflows/cloudflare.yml` 自动构建并部署。

健康检查：`GET /api/health`

## 目录结构

```
starter/
├── .github/workflows/   # CI、Pages、Cloudflare
├── public/
├── src/
│   ├── views/Home.vue   # 占位首页
│   ├── router/
│   └── styles/
├── workers/api.ts       # 最小 Worker
├── wrangler.jsonc
├── cloudflare-build.sh  # Cloudflare 控制台构建脚本
└── vite.config.ts
```

## 从 horizon-kit 复制本模板

```bash
cp -R horizon-kit/starter my-new-app
cd my-new-app
rm -rf node_modules
npm install
git init
```

按需修改 `package.json` 的 `name`、`wrangler.jsonc` 的 `name` 与 `VITE_APP_TITLE`。
