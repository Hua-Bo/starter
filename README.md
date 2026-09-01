# Vue Vite Starter

基于 **Vue 3 + Vite + TypeScript** 的前端项目模板，内置 **GitHub Pages** 与 **Cloudflare Workers** 双通道自动部署，适合快速搭建 SPA 并上线。

## 特性

- Vue 3 Composition API、Vue Router、Pinia 状态管理
- Vite 6 极速开发与构建
- TypeScript 严格模式 + SCSS 全局变量注入
- GitHub Actions：CI 检查、Pages 静态托管、Cloudflare Workers 部署
- Cloudflare Worker 同时托管静态资源与 `/api/*` 接口

## 技术栈

| 类别 | 技术 |
|------|------|
| 框架 | Vue 3、Vue Router、Pinia |
| 构建 | Vite 6、TypeScript、SCSS |
| 部署 | GitHub Actions、GitHub Pages、Cloudflare Workers（Wrangler） |
| 运行时 | Node.js ≥ 22 |

## 快速开始

### 环境要求

- Node.js **22** 或更高版本
- npm **10** 或更高版本

### 本地开发

```bash
# 1. 复制环境变量模板
cp .env.example .env.development

# 2. 安装依赖
npm install

# 3. 启动开发服务器
npm run dev
```

浏览器访问 http://localhost:3000

### 常用命令

| 命令 | 说明 |
|------|------|
| `npm run dev` | 启动开发服务器（端口 3000） |
| `npm run build` | 类型检查 + 生产构建，输出到 `dist/` |
| `npm run preview` | 本地预览构建产物（端口 4173） |
| `npm run typecheck` | 仅执行 TypeScript 类型检查 |
| `npm run check` | 类型检查 + 构建（CI 本地复现） |
| `npm run cf:deploy` | 构建并部署到 Cloudflare Workers |

## 环境变量

在项目根目录创建 `.env.development`（本地）或 `.env.production`（生产），参考 `.env.example`：

| 变量 | 必填 | 说明 | 示例 |
|------|------|------|------|
| `VITE_BASE` | 是 | 站点根路径，影响路由和资源引用 | 本地 `/`；GitHub Pages `/仓库名/` |
| `VITE_APP_TITLE` | 否 | 浏览器标签页标题 | `我的应用` |
| `VITE_API_BASE` | 否 | 后端 API 基址，前端请求时拼接 | `https://xxx.workers.dev` |

> **注意**：`VITE_` 前缀的变量会暴露到前端代码中，不要存放密钥。

### BASE_URL 说明

- **本地 / Cloudflare / 自定义域**：`VITE_BASE=/`
- **GitHub Pages 项目页**：`VITE_BASE=/仓库名/`（Actions 会自动设置）

构建后可通过 `import.meta.env.BASE_URL` 读取当前基路径。

## 目录结构

```
.
├── .github/workflows/     # GitHub Actions 工作流
│   ├── ci.yml             #   推送/PR 时类型检查与构建
│   ├── pages.yml          #   推 main 时部署 GitHub Pages
│   └── cloudflare.yml     #   推 main 时部署 Cloudflare Workers
├── public/                # 静态资源（不经 Vite 处理，原样复制到 dist）
├── src/
│   ├── views/             # 页面组件
│   ├── router/            # 路由配置
│   ├── styles/            # 全局样式、变量、重置
│   ├── App.vue            # 根组件
│   └── main.ts            # 应用入口
├── workers/
│   └── api.ts             # Cloudflare Worker 入口（API + 静态资源回退）
├── index.html             # HTML 模板
├── vite.config.ts         # Vite 配置
├── wrangler.jsonc         # Cloudflare Workers 配置
├── cloudflare-build.sh    # Cloudflare 控制台构建脚本
└── env.d.ts               # 环境变量 TypeScript 类型声明
```

## 开发指南

### 新增页面

1. 在 `src/views/` 下创建 `.vue` 组件
2. 在 `src/router/index.ts` 的 `routes` 数组中注册路由
3. 通过 `meta.title` 设置页面标题

### 状态管理

项目已集成 Pinia，在 `src/stores/` 下创建 store 即可（目录需自行新建）。

### 样式

- 全局样式入口：`src/styles/index.scss`
- SCSS 变量定义：`src/styles/variables.scss`（已通过 Vite 自动注入，组件内可直接使用 `$primary-color` 等变量）
- 组件内使用 `<style scoped lang="scss">` 编写局部样式

### 路径别名

`@` 指向 `src/`，例如：

```ts
import Home from '@/views/Home.vue'
```

## 构建与预览

```bash
# 根路径部署（Cloudflare / 自定义域）
npm run build

# GitHub Pages 子路径（手动构建时）
VITE_BASE=/your-repo-name/ npm run build

# 本地预览构建结果
npm run preview
```

## 部署

### GitHub Pages

**前置条件**：代码已推送到 GitHub 的 `main` 分支。

1. 打开仓库 **Settings → Pages**
2. **Source** 选择 **Deploy from a branch**
3. **Branch** 选择 `gh-pages`，目录选 `/ (root)`
4. 保存后等待 1～3 分钟

访问地址：`https://<用户名>.github.io/<仓库名>/`

工作流 `pages.yml` 会在每次推送 `main` 时自动：

- 设置 `VITE_BASE=/<仓库名>/`
- 构建项目并推送到 `gh-pages` 分支
- 生成 `404.html`（SPA 路由回退）和 `.nojekyll`

> 若访问 404，通常是 **Pages 未在 Settings 中开启**，或 `gh-pages` 分支尚未生成（首次推送后需等 Actions 跑完）。

### Cloudflare Workers

**前置条件**：拥有 Cloudflare 账号。

#### 本地部署

```bash
# 首次需登录 Cloudflare
npx wrangler login

# 构建并部署
npm run cf:deploy
```

部署前请修改 `wrangler.jsonc` 中的 `name` 为你的 Worker 名称（全局唯一）。

#### GitHub Actions 自动部署

在仓库 **Settings → Secrets and variables → Actions** 中添加：

| Secret | 获取方式 |
|--------|----------|
| `CLOUDFLARE_API_TOKEN` | [Cloudflare Dashboard → API Tokens](https://dash.cloudflare.com/profile/api-tokens)，权限需包含 **Workers Scripts: Edit** |
| `CLOUDFLARE_ACCOUNT_ID` | Cloudflare 控制台右侧栏 **Account ID** |

推送 `main` 后，`cloudflare.yml` 会自动构建并部署。也可在 Actions 页面手动 **Run workflow**。

#### 健康检查

部署成功后访问：

```
GET https://<worker-name>.<account>.workers.dev/api/health
```

返回示例：

```json
{ "ok": true, "service": "vue-vite-starter", "timestamp": 1700000000000 }
```

### 双通道对比

| | GitHub Pages | Cloudflare Workers |
|--|--------------|-------------------|
| 费用 | 免费（公开仓库） | 免费额度内免费 |
| 域名 | `*.github.io` | `*.workers.dev` 或自定义域 |
| API 支持 | 仅静态 | Worker 可处理 `/api/*` |
| SPA 路由 | 依赖 `404.html` 回退 | 内置 SPA 回退 |
| 适用场景 | 纯静态展示 | 需要边缘 API 或自定义域 |

## 故障排查

| 现象 | 可能原因 | 处理方式 |
|------|----------|----------|
| GitHub Pages 404 | Pages 未开启或分支未选对 | Settings → Pages，选 `gh-pages` / `root` |
| 页面空白、资源 404 | `VITE_BASE` 与部署路径不一致 | GitHub Pages 必须用 `/仓库名/` |
| Cloudflare 部署失败 | 缺少 Secrets | 配置 `CLOUDFLARE_API_TOKEN` 和 `CLOUDFLARE_ACCOUNT_ID` |
| CI 构建失败 | 类型错误或依赖问题 | 本地执行 `npm run check` 定位 |
| 路由刷新 404 | SPA 回退未配置 | Pages 需 `404.html`；Cloudflare 已在 `wrangler.jsonc` 配置 |

查看部署日志：仓库 **Actions** 标签页 → 选择对应工作流运行记录。

## 自定义项目

新建项目后建议修改：

1. `package.json` → `name`
2. `wrangler.jsonc` → `name`（Worker 名称）
3. `.env.development` → `VITE_APP_TITLE`
4. `index.html` → `<title>`
5. `workers/api.ts` → `service` 字段

## 许可证

私有项目，按需自行添加 LICENSE。
