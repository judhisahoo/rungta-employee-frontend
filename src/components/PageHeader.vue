<template>
  <div class="mb-8 flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
    <div>
      <h1 class="text-2xl font-extrabold text-ink">{{ title }}</h1>
      <p v-if="subtitle" class="mt-2 text-sm text-slate-600">{{ subtitle }}</p>
    </div>
    <div class="flex items-center gap-3">
      <div class="hidden text-sm text-slate-600 sm:block">
        Home <span class="mx-3 text-slate-300">/</span> <span class="font-semibold text-brand-600">{{ title }}</span>
      </div>
      <slot />
    </div>
  </div>
</template>

<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  subtitle: {
    type: String,
    default: '',
  },
})
</script>
