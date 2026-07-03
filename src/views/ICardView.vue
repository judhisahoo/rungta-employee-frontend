<template>
  <main class="min-h-screen bg-slate-50 p-6">
    <section class="mx-auto flex min-h-[calc(100vh-48px)] max-w-6xl flex-col justify-center">
      <form class="rounded-lg border border-slate-200 bg-white p-8 shadow-panel" @submit.prevent="submit">
        <textarea
          v-model.trim="idCardNo"
          class="h-[100px] w-full resize-none rounded-lg border border-slate-300 px-6 py-5 text-[36px] leading-[44px] text-ink outline-none transition placeholder:text-slate-400 focus:border-brand-600 focus:ring-4 focus:ring-brand-50"
          placeholder="Enter your id card number"
          autofocus
        ></textarea>

        <button
          class="mt-8 h-20 w-full rounded-lg bg-brand-600 text-[32px] font-extrabold text-white transition hover:bg-brand-700 disabled:cursor-not-allowed disabled:opacity-60"
          type="submit"
          :disabled="loading"
        >
          {{ loading ? 'Submitting...' : 'Submit' }}
        </button>

        <p v-if="error" class="mt-6 rounded-md bg-red-50 px-5 py-4 text-lg font-semibold text-red-600">
          {{ error }}
        </p>
      </form>
    </section>
  </main>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { apiService } from '../services/apiService'
import { cardLookupStore } from '../services/cardLookupStore'

const router = useRouter()
const idCardNo = ref('')
const loading = ref(false)
const error = ref('')

async function submit() {
  error.value = ''

  if (!idCardNo.value) {
    error.value = 'Please enter your id card number.'
    return
  }

  loading.value = true
  try {
    const employee = await apiService.verifyEmployeeByCard(idCardNo.value)
    cardLookupStore.set(employee)
    router.push('/lcarddetails')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
