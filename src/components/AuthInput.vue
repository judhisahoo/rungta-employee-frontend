<template>
  <label class="input-shell">
    <component :is="icon" class="h-6 w-6 shrink-0 text-slate-500" />
    <input
      :type="type"
      :value="modelValue"
      :placeholder="placeholder"
      class="h-full min-w-0 flex-1 border-0 bg-transparent text-xl text-ink outline-none placeholder:text-slate-500"
      @input="$emit('update:modelValue', $event.target.value)"
    />
    <slot />
  </label>
</template>

<script setup>
defineProps({
  icon: {
    type: [Object, Function],
    required: true,
  },
  modelValue: {
    type: String,
    default: '',
  },
  placeholder: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    default: 'text',
  },
})

defineEmits(['update:modelValue'])
</script>
