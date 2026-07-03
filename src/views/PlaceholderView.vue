<template>
  <AdminLayout>
    <PageHeader :title="title" />
    <section class="panel p-8">
      <h2 class="text-xl font-extrabold text-ink">{{ title }}</h2>
      <p class="mt-3 text-slate-600">This module is ready for REST API integration. Employee Management CRUD is implemented now.</p>
    </section>
  </AdminLayout>
</template>

<script setup>
import AdminLayout from '../layouts/AdminLayout.vue'
import PageHeader from '../components/PageHeader.vue'

defineProps({
  title: {
    type: String,
    required: true,
  },
})
</script>
