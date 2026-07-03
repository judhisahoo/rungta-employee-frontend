<template>
  <main class="min-h-screen bg-slate-50 p-6">
    <section class="mx-auto max-w-7xl rounded-lg border border-slate-200 bg-white p-8 shadow-panel">
      <div class="mb-6 flex items-center justify-between gap-4">
        <h1 class="text-3xl font-extrabold text-ink">Card Details</h1>
        <RouterLink class="rounded-md bg-brand-600 px-5 py-3 text-sm font-bold text-white hover:bg-brand-700" to="/icard">
          Search Again
        </RouterLink>
      </div>

      <p v-if="!employee" class="rounded-md bg-amber-50 px-5 py-4 text-lg font-semibold text-amber-700">
        No card details found. Please search by id card number first.
      </p>

      <div v-else>
        <p class="rounded-lg bg-emerald-50 px-8 py-10 text-center text-[50px] font-extrabold leading-tight text-emerald-700">
          You have scan a card successfully, Card no is
          <span class="text-brand-600">{{ cardNumber }}</span>
        </p>
      </div>

      <div v-if="false" class="overflow-x-auto">
        <table class="w-full min-w-[900px] border-collapse text-left">
          <thead>
            <tr class="bg-slate-100 text-base font-extrabold text-ink">
              <th class="border border-slate-200 px-5 py-4">Data Key</th>
              <th class="border border-slate-200 px-5 py-4">Data Value</th>
              <th class="border border-slate-200 px-5 py-4">Data Key</th>
              <th class="border border-slate-200 px-5 py-4">Data Value</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="row in tableRows" :key="row[0]?.key || row[1]?.key" class="text-base text-ink">
              <td class="border border-slate-200 px-5 py-4 font-bold">{{ row[0]?.label || '' }}</td>
              <td class="border border-slate-200 px-5 py-4">{{ row[0]?.value ?? '' }}</td>
              <td class="border border-slate-200 px-5 py-4 font-bold">{{ row[1]?.label || '' }}</td>
              <td class="border border-slate-200 px-5 py-4">{{ row[1]?.value ?? '' }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>
  </main>
</template>

<script setup>
import { computed, ref } from 'vue'
import { cardLookupStore } from '../services/cardLookupStore'

const employee = ref(cardLookupStore.get())

const hiddenKeys = new Set(['password'])

const cardNumber = computed(() => employee.value?.id_card_no || '-')

const details = computed(() => {
  if (!employee.value) return []

  return Object.entries(employee.value)
    .filter(([key]) => !hiddenKeys.has(key))
    .map(([key, value]) => ({
      key,
      label: key
        .split('_')
        .map((part) => part.charAt(0).toUpperCase() + part.slice(1))
        .join(' '),
      value: formatValue(value),
    }))
})

const tableRows = computed(() => {
  const rows = []
  for (let index = 0; index < details.value.length; index += 2) {
    rows.push([details.value[index], details.value[index + 1]])
  }
  return rows
})

function formatValue(value) {
  if (value === null || value === undefined || value === '') return '-'
  if (typeof value === 'object') return JSON.stringify(value)
  return value
}
</script>
