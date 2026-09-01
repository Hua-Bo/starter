#!/usr/bin/env bash
set -euo pipefail

echo "Node: $(node -v)"
echo "npm: $(npm -v)"

test -f package.json || {
  echo "ERROR: 当前目录不存在 package.json。Cloudflare Root directory 应留空。"
  exit 1
}

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
