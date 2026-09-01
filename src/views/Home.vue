<script setup lang="ts">
/**
 * 首页（占位页）
 * 开发时可替换为实际业务页面，或删除后改用其他路由作为入口
 */
import { computed } from 'vue'

const appTitle = computed(() => import.meta.env.VITE_APP_TITLE || 'Vue Starter')
/** 当前部署的基路径，用于调试 GitHub Pages 子路径是否正确 */
const baseUrl = computed(() => import.meta.env.BASE_URL)
</script>

<template>
  <main class="home">
    <section class="home__card">
      <p class="home__badge">Vue 3 · Vite · TypeScript</p>
      <h1 class="home__title">{{ appTitle }}</h1>
      <p class="home__desc">
        空框架已就绪。在此开始编写你的页面与逻辑。
      </p>
      <dl class="home__meta">
        <div>
          <dt>BASE_URL</dt>
          <dd>{{ baseUrl }}</dd>
        </div>
      </dl>
    </section>
  </main>
</template>

<style scoped lang="scss">
.home {
  min-height: 100dvh;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
}

.home__card {
  width: min(100%, 480px);
  padding: 32px 28px;
  border-radius: $border-radius-lg;
  background: rgba(255, 255, 255, 0.04);
  border: 1px solid rgba(255, 255, 255, 0.08);
  box-shadow: $box-shadow-lg;
}

.home__badge {
  font-size: 12px;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  color: rgba(247, 248, 255, 0.55);
  margin-bottom: 12px;
}

.home__title {
  font-size: 28px;
  font-weight: 600;
  margin-bottom: 12px;
}

.home__desc {
  color: rgba(247, 248, 255, 0.72);
  line-height: 1.7;
}

.home__meta {
  margin-top: 24px;
  padding-top: 20px;
  border-top: 1px solid rgba(255, 255, 255, 0.08);

  dt {
    font-size: 12px;
    color: rgba(247, 248, 255, 0.5);
    margin-bottom: 4px;
  }

  dd {
    font-family: ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace;
    font-size: 14px;
  }
}
</style>
