<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(defineProps<{
  id?: string
  title: string
  summary?: string
  method: string
  path: string
  baseUrl?: string
  auth?: string
  requestType?: string
  responseCode?: string
  responseType?: string
}>(), {
  baseUrl: 'https://api.dgrid.ai'
})

const methodLabel = computed(() => props.method.toUpperCase())
const responseLabel = computed(() => {
  if (props.responseCode && props.responseType) {
    return `${props.responseCode} · ${props.responseType}`
  }

  return props.responseCode || props.responseType || ''
})
</script>

<template>
  <section :id="id" class="api-endpoint">
    <div class="api-endpoint__header">
      <div class="api-endpoint__header-copy">
        <h2 class="api-endpoint__title">
          {{ title }}
        </h2>
        <p v-if="summary" class="api-endpoint__summary">
          {{ summary }}
        </p>
      </div>
      <span class="api-endpoint__pill" :data-method="methodLabel">
        {{ methodLabel }}
      </span>
    </div>

    <div class="api-endpoint__request">
      <div class="api-endpoint__host">
        {{ baseUrl }}
      </div>
      <div class="api-endpoint__path">
        <span class="api-endpoint__method" :data-method="methodLabel">
          {{ methodLabel }}
        </span>
        <code>{{ path }}</code>
      </div>
      <dl class="api-endpoint__meta">
        <div v-if="auth">
          <dt>Authorization</dt>
          <dd><code>{{ auth }}</code></dd>
        </div>
        <div v-if="requestType">
          <dt>Request</dt>
          <dd><code>{{ requestType }}</code></dd>
        </div>
        <div v-if="responseLabel">
          <dt>Response</dt>
          <dd><code>{{ responseLabel }}</code></dd>
        </div>
      </dl>
    </div>

    <div class="api-endpoint__content">
      <div class="api-endpoint__main">
        <slot />
      </div>
      <aside class="api-endpoint__rail">
        <slot name="code" />
      </aside>
    </div>
  </section>
</template>

<style scoped>
.api-endpoint {
  margin: 2.5rem 0 4rem;
  scroll-margin-top: 88px;
}

.api-endpoint__header {
  display: flex;
  gap: 1rem;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 1rem;
}

.api-endpoint__header-copy {
  min-width: 0;
}

.api-endpoint__title {
  margin: 0;
  font-size: 1.85rem;
  line-height: 1.15;
}

.api-endpoint__summary {
  margin: 0.65rem 0 0;
  color: var(--vp-c-text-2);
  font-size: 1rem;
  line-height: 1.7;
}

.api-endpoint__pill,
.api-endpoint__method {
  border-radius: 999px;
  font-size: 0.72rem;
  font-weight: 700;
  letter-spacing: 0.08em;
  text-transform: uppercase;
}

.api-endpoint__pill {
  padding: 0.42rem 0.78rem;
  color: #0b6bcb;
  background: rgba(11, 107, 203, 0.1);
}

.api-endpoint__pill[data-method='POST'],
.api-endpoint__method[data-method='POST'] {
  color: #0b6bcb;
  background: rgba(11, 107, 203, 0.1);
}

.api-endpoint__pill[data-method='WSS'],
.api-endpoint__method[data-method='WSS'] {
  color: #8b5cf6;
  background: rgba(139, 92, 246, 0.12);
}

.api-endpoint__request {
  padding: 1rem 1.15rem 1.15rem;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.95), rgba(246, 248, 250, 0.98));
  box-shadow: 0 14px 32px rgba(15, 23, 42, 0.05);
}

.dark .api-endpoint__request {
  background:
    linear-gradient(180deg, rgba(24, 24, 27, 0.98), rgba(17, 24, 39, 0.95));
  box-shadow: none;
}

.api-endpoint__host {
  margin-bottom: 0.8rem;
  color: var(--vp-c-text-3);
  font-size: 0.84rem;
  text-align: center;
}

.api-endpoint__path {
  display: flex;
  gap: 0.8rem;
  align-items: center;
  flex-wrap: wrap;
}

.api-endpoint__method {
  padding: 0.34rem 0.66rem;
}

.api-endpoint__path code {
  font-size: 1rem;
  font-weight: 600;
  word-break: break-all;
}

.api-endpoint__meta {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 0.85rem;
  margin: 1rem 0 0;
}

.api-endpoint__meta div {
  padding-top: 0.85rem;
  border-top: 1px solid var(--vp-c-divider);
}

.api-endpoint__meta dt {
  margin-bottom: 0.4rem;
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
  font-weight: 600;
}

.api-endpoint__meta dd {
  margin: 0;
}

.api-endpoint__content {
  display: grid;
  grid-template-columns: minmax(0, 1.7fr) minmax(300px, 0.95fr);
  gap: 1.5rem;
  margin-top: 1.5rem;
}

.api-endpoint__main :deep(h3) {
  margin-top: 2rem;
  margin-bottom: 0.75rem;
  font-size: 1.2rem;
}

.api-endpoint__main :deep(h4) {
  margin-top: 1.5rem;
  margin-bottom: 0.6rem;
  font-size: 1rem;
}

.api-endpoint__main :deep(p),
.api-endpoint__main :deep(li) {
  line-height: 1.75;
}

.api-endpoint__main :deep(table) {
  display: table;
  width: 100%;
  margin: 1rem 0 1.4rem;
  font-size: 0.93rem;
}

.api-endpoint__main :deep(th) {
  font-weight: 700;
  white-space: nowrap;
}

.api-endpoint__main :deep(td code),
.api-endpoint__main :deep(li code),
.api-endpoint__main :deep(p code) {
  font-size: 0.88em;
}

.api-endpoint__rail {
  position: sticky;
  top: 88px;
  align-self: start;
}

.api-endpoint__rail :deep(.api-code-panel + .api-code-panel) {
  margin-top: 1rem;
}

@media (max-width: 1100px) {
  .api-endpoint__content {
    grid-template-columns: 1fr;
  }

  .api-endpoint__rail {
    position: static;
  }
}

@media (max-width: 640px) {
  .api-endpoint__header {
    flex-direction: column;
  }

  .api-endpoint__title {
    font-size: 1.55rem;
  }

  .api-endpoint__request {
    padding: 0.95rem;
    border-radius: 16px;
  }
}
</style>
