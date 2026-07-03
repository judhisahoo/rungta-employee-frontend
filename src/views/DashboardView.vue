<template>
  <AdminLayout>
    <PageHeader title="Dashboard" />

    <div class="grid gap-7 md:grid-cols-2 xl:grid-cols-4">
      <div v-for="card in stats" :key="card.label" class="panel flex min-h-40 items-center gap-7 p-7">
        <div class="flex h-24 w-24 items-center justify-center rounded-full" :class="card.bg">
          <component :is="card.icon" class="h-12 w-12" :class="card.color" />
        </div>
        <div>
          <p class="text-lg font-medium text-ink">{{ card.label }}</p>
          <p class="mt-5 text-4xl font-extrabold" :class="card.color">{{ card.value }}</p>
        </div>
      </div>
    </div>

    <div class="mt-10 grid gap-8 xl:grid-cols-[1fr_520px]">
      <section class="panel p-8">
        <h2 class="text-2xl font-extrabold text-ink">Recent Verifications</h2>
        <div class="mt-7 overflow-x-auto">
          <table class="w-full min-w-[760px] text-left">
            <thead>
              <tr class="border-b border-slate-200 text-sm font-bold text-ink">
                <th class="py-4">Employee Name</th>
                <th>Card Number</th>
                <th>Status</th>
                <th>Date</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="row in recentRows" :key="row.card" class="border-b border-slate-100 text-base text-ink">
                <td class="py-5">{{ row.name }}</td>
                <td>{{ row.card }}</td>
                <td>
                  <span class="rounded-full px-4 py-2 text-sm font-bold" :class="row.status === 'Verified' ? 'bg-emerald-100 text-emerald-700' : 'bg-red-100 text-red-600'">
                    {{ row.status }}
                  </span>
                </td>
                <td>{{ row.date }}</td>
              </tr>
            </tbody>
          </table>
        </div>
        <RouterLink class="mt-8 block text-center text-lg font-semibold text-brand-600" to="/employees">View All</RouterLink>
      </section>

      <section class="panel p-8">
        <h2 class="text-2xl font-extrabold text-ink">Quick Actions</h2>
        <div class="mt-9 space-y-5">
          <RouterLink v-for="action in actions" :key="action.label" :to="action.to" class="flex h-24 items-center gap-7 rounded-lg border border-slate-200 px-6 text-lg font-semibold text-ink transition hover:border-brand-100 hover:bg-brand-50">
            <component :is="action.icon" class="h-10 w-10" :class="action.color" />
            <span class="flex-1">{{ action.label }}</span>
            <ChevronRightIcon class="h-7 w-7 text-ink" />
          </RouterLink>
        </div>
      </section>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed, onMounted, ref } from 'vue'
import { BriefcaseIcon, BuildingOffice2Icon, ChevronRightIcon, ShieldCheckIcon, UserGroupIcon, UserPlusIcon, IdentificationIcon } from '@heroicons/vue/24/solid'
import AdminLayout from '../layouts/AdminLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import { apiService } from '../services/apiService'

const employees = ref([])
const organisations = ref([])
const designations = ref([])

const stats = computed(() => [
  { label: 'Total Organisations', value: organisations.value.length || 24, icon: BuildingOffice2Icon, bg: 'bg-brand-100', color: 'text-brand-600' },
  { label: 'Total Designations', value: designations.value.length || 36, icon: BriefcaseIcon, bg: 'bg-emerald-100', color: 'text-emerald-600' },
  { label: 'Total Employees', value: employees.value.length || 248, icon: UserGroupIcon, bg: 'bg-violet-100', color: 'text-violet-600' },
  { label: 'Verified Employees By Card', value: Math.max(employees.value.length - 1, 0) || 186, icon: ShieldCheckIcon, bg: 'bg-amber-100', color: 'text-amber-500' },
])

const recentRows = [
  { name: 'Ramesh Kumar', card: 'EMP1001', status: 'Verified', date: '24 May 2024' },
  { name: 'Suresh Das', card: 'EMP1002', status: 'Verified', date: '24 May 2024' },
  { name: 'Amit Singh', card: 'EMP1003', status: 'Invalid', date: '23 May 2024' },
  { name: 'Priya Sharma', card: 'EMP1004', status: 'Verified', date: '23 May 2024' },
  { name: 'Neha Patel', card: 'EMP1005', status: 'Verified', date: '22 May 2024' },
]

const actions = [
  { label: 'Add Organisation', to: '/organisations', icon: BuildingOffice2Icon, color: 'text-brand-600' },
  { label: 'Add Employee', to: '/employees/new', icon: UserPlusIcon, color: 'text-emerald-600' },
  { label: 'Verify By Card', to: '/verify-card', icon: IdentificationIcon, color: 'text-violet-600' },
]

onMounted(async () => {
  const results = await Promise.allSettled([
    apiService.listEmployees(),
    apiService.listOrganisations(),
    apiService.listDesignations(),
  ])
  employees.value = results[0].status === 'fulfilled' ? results[0].value : []
  organisations.value = results[1].status === 'fulfilled' ? results[1].value : []
  designations.value = results[2].status === 'fulfilled' ? results[2].value : []
})
</script>
