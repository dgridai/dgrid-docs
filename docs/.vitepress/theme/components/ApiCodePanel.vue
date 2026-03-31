<script setup lang="ts">
defineProps<{
  title: string
  label?: string
}>()
</script>

<template>
  <section class="api-code-panel">
    <div class="api-code-panel__header">
      <h3>{{ title }}</h3>
      <span v-if="label">{{ label }}</span>
    </div>
    <div class="api-code-panel__body">
      <slot />
    </div>
  </section>
</template>

<style scoped>
.api-code-panel {
  overflow: hidden;
  border: 1px solid var(--vp-c-divider);
  border-radius: 18px;
  background: var(--vp-c-bg-soft);
}

.api-code-panel__header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 1rem;
  padding: 0.85rem 1rem;
  border-bottom: 1px solid var(--vp-c-divider);
  background: rgba(148, 163, 184, 0.08);
}

.dark .api-code-panel__header {
  background: rgba(148, 163, 184, 0.1);
}

.api-code-panel__header h3 {
  margin: 0;
  font-size: 0.92rem;
}

.api-code-panel__header span {
  color: var(--vp-c-text-3);
  font-size: 0.78rem;
  white-space: nowrap;
}

.api-code-panel__body :deep(.vp-code-group),
.api-code-panel__body :deep(div[class*='language-']) {
  margin: 0;
  border-radius: 0;
  background: transparent;
}

.api-code-panel__body :deep(.vp-code-group .tabs) {
  padding: 0.6rem 0.8rem 0;
}

.api-code-panel__body :deep(pre) {
  margin: 0;
}
</style>
