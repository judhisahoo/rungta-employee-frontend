<template>
  <AdminLayout>
    <PageHeader title="Verify Employee By Card" subtitle="Search an employee by ID card number." />
    <section class="panel max-w-3xl p-7">
      <label class="form-label">ID Card Number <span class="required">*</span></label>
      <div class="flex flex-col gap-4 sm:flex-row">
        <input v-model="cardNumber" class="form-control h-12" placeholder="Enter ID card number" />
        <button class="primary-btn" type="button" :disabled="loading" @click="verify">
          <IdentificationIcon class="h-5 w-5" />
          Verify
        </button>
      </div>
      <p v-if="error" class="mt-5 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{{ error }}</p>
      <div v-if="employee" class="mt-7 rounded-lg border border-emerald-200 bg-emerald-50 p-6">
        <p class="text-lg font-extrabold text-emerald-700">Verified</p>
        <dl class="mt-4 grid gap-4 text-sm text-ink sm:grid-cols-2">
          <div><dt class="font-bold">Name</dt><dd>{{ [employee.name, employee.surname].filter(Boolean).join(' ') }}</dd></div>
          <div><dt class="font-bold">Employee Code</dt><dd>{{ employee.employee_code }}</dd></div>
          <div><dt class="font-bold">Card No</dt><dd>{{ employee.id_card_no }}</dd></div>
          <div><dt class="font-bold">Mobile</dt><dd>{{ employee.mobile_number }}</dd></div>
        </dl>
      </div>
    </section>
  </AdminLayout>
</template>

<script setup>
import { ref } from 'vue'
import { IdentificationIcon } from '@heroicons/vue/24/outline'
import AdminLayout from '../layouts/AdminLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import { apiService } from '../services/apiService'

const cardNumber = ref('')
const employee = ref(null)
const loading = ref(false)
const error = ref('')

async function verify() {
  error.value = ''
  employee.value = null
  loading.value = true
  try {
    employee.value = await apiService.verifyEmployeeByCard(cardNumber.value)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
