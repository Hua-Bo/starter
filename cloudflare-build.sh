#!/usr/bin/env bash
# ============================================================
# Cloudflare 控制台构建脚本
# 在 Cloudflare Pages / Workers 控制台的 Build command 中调用：
#   npm run cf:build
# 或直接使用：bash ./cloudflare-build.sh
# ============================================================
set -euo pipefail

echo "Node: $(node -v)"
echo "npm: $(npm -v)"

# 确认在仓库根目录执行
test -f package.json || {
  echo "ERROR: 当前目录不存在 package.json。Cloudflare Root directory 应留空。"
  exit 1
}

# 必须使用 npm + package-lock.json，保证 CI 可复现
test -f package-lock.json || {
  echo "ERROR: 缺少 package-lock.json，请在本地执行 npm install 后提交。"
  exit 1
}

if [ -f pnpm-lock.yaml ] || [ -f yarn.lock ]; then
  echo "ERROR: 检测到其他包管理器锁文件，请删除 pnpm-lock.yaml / yarn.lock。"
  exit 1
fi

npm ci --no-audit --progress=false
npm run build

test -f dist/index.html || {
  echo "ERROR: 构建完成但未发现 dist/index.html。"
  exit 1
}

echo "Cloudflare build completed."
