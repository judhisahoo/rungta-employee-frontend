<template>
  <AdminLayout>
    <PageHeader title="Employee Management" subtitle="Manage your all employees, view details, add new employee or update existing information.">
      <RouterLink class="primary-btn" to="/employees/new">
        <PlusIcon class="h-5 w-5" />
        Add Employee
      </RouterLink>
    </PageHeader>

    <section class="panel mb-6 p-7">
      <div class="grid gap-6 xl:grid-cols-[1.2fr_0.9fr_0.8fr_auto_auto]">
        <label class="form-control flex items-center gap-3">
          <MagnifyingGlassIcon class="h-5 w-5 text-slate-500" />
          <input v-model="filters.search" class="min-w-0 flex-1 border-0 bg-transparent outline-none" placeholder="Search by name, email or card number" />
        </label>
        <label>
          <span class="form-label">Designation</span>
          <select v-model="filters.designation" class="form-control">
            <option value="">All Designations</option>
            <option v-for="designation in designations" :key="designation.id" :value="designation.id">{{ designation.name }}</option>
          </select>
        </label>
        <label>
          <span class="form-label">Status</span>
          <select v-model="filters.status" class="form-control">
            <option value="">All Status</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </label>
        <button class="secondary-btn self-end" type="button" @click="resetFilters">
          <ArrowPathIcon class="h-5 w-5" />
          Reset
        </button>
        <button class="primary-btn self-end" type="button">
          <FunnelIcon class="h-5 w-5" />
          Filter
        </button>
      </div>
    </section>

    <section class="panel p-7">
      <div class="mb-7 flex items-center justify-between">
        <p class="font-semibold text-ink">Total Employees: {{ filteredEmployees.length }}</p>
        <label class="flex items-center gap-3 text-sm text-slate-600">
          Show
          <select v-model.number="pageSize" class="h-10 rounded-md border border-slate-200 px-3 text-ink">
            <option :value="10">10</option>
            <option :value="25">25</option>
            <option :value="50">50</option>
          </select>
          entries
        </label>
      </div>

      <div class="overflow-x-auto">
        <table class="w-full min-w-[1180px] text-left text-sm">
          <thead class="bg-slate-50 text-xs font-extrabold uppercase text-ink">
            <tr>
              <th class="px-3 py-4">#</th>
              <th class="px-3 py-4">Employee Name</th>
              <th class="px-3 py-4">Employee ID</th>
              <th class="px-3 py-4">Email Address</th>
              <th class="px-3 py-4">Mobile Number</th>
              <th class="px-3 py-4">Designation</th>
              <th class="px-3 py-4">Status</th>
              <th class="px-3 py-4 text-center">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(employee, index) in pagedEmployees" :key="employee.id || employee.employee_code" class="border-b border-slate-100 text-ink">
              <td class="px-3 py-4">{{ index + 1 }}</td>
              <td class="px-3 py-4">
                <div class="flex items-center gap-4">
                  <span class="flex h-9 w-9 items-center justify-center rounded-full bg-brand-100 text-xs font-bold text-brand-600">{{ initials(employee) }}</span>
                  <span class="font-semibold">{{ fullName(employee) }}</span>
                </div>
              </td>
              <td class="px-3 py-4">{{ employee.employee_code }}</td>
              <td class="px-3 py-4">{{ employee.email || '-' }}</td>
              <td class="px-3 py-4">{{ employee.mobile_number }}</td>
              <td class="px-3 py-4">{{ designationName(employee.designation) }}</td>
              <td class="px-3 py-4">
                <span class="rounded-full px-4 py-2 text-xs font-bold" :class="employee.date_of_exit ? 'bg-red-100 text-red-600' : 'bg-emerald-100 text-emerald-700'">
                  {{ employee.date_of_exit ? 'Inactive' : 'Active' }}
                </span>
              </td>
              <td class="px-3 py-4">
                <div class="flex justify-center gap-3">
                  <button class="icon-btn" type="button" @click="selected = employee">
                    <EyeIcon class="h-5 w-5" />
                  </button>
                  <RouterLink class="icon-btn" :to="`/employees/${employee.id}/edit`">
                    <PencilIcon class="h-5 w-5" />
                  </RouterLink>
                  <button class="icon-btn border-red-200 text-red-500 hover:bg-red-50" type="button" @click="remove(employee)">
                    <TrashIcon class="h-5 w-5" />
                  </button>
                </div>
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div class="mt-7 flex flex-col gap-4 text-sm text-slate-600 sm:flex-row sm:items-center sm:justify-between">
        <span>Showing 1 to {{ pagedEmployees.length }} of {{ filteredEmployees.length }} entries</span>
        <div class="flex gap-3">
          <button class="icon-btn" type="button" @click="page = Math.max(1, page - 1)">
            <ChevronLeftIcon class="h-5 w-5" />
          </button>
          <button class="h-10 min-w-10 rounded-md bg-brand-600 px-4 font-bold text-white">{{ page }}</button>
          <button class="icon-btn" type="button" @click="page = page + 1">
            <ChevronRightIcon class="h-5 w-5" />
          </button>
        </div>
      </div>
    </section>

    <div v-if="selected" class="fixed inset-0 z-50 flex items-center justify-center bg-ink/40 p-6" @click.self="selected = null">
      <div class="w-full max-w-xl rounded-lg bg-white p-7 shadow-panel">
        <div class="flex items-center justify-between">
          <h2 class="text-xl font-extrabold text-ink">{{ fullName(selected) }}</h2>
          <button class="icon-btn" type="button" @click="selected = null">
            <XMarkIcon class="h-5 w-5" />
          </button>
        </div>
        <dl class="mt-6 grid gap-4 text-sm sm:grid-cols-2">
          <div><dt class="font-bold">Card No</dt><dd>{{ selected.id_card_no }}</dd></div>
          <div><dt class="font-bold">Employee Code</dt><dd>{{ selected.employee_code }}</dd></div>
          <div><dt class="font-bold">Email</dt><dd>{{ selected.email || '-' }}</dd></div>
          <div><dt class="font-bold">Mobile</dt><dd>{{ selected.mobile_number }}</dd></div>
          <div><dt class="font-bold">Designation</dt><dd>{{ designationName(selected.designation) }}</dd></div>
          <div><dt class="font-bold">Joining Date</dt><dd>{{ selected.date_of_joining || '-' }}</dd></div>
        </dl>
      </div>
    </div>
  </AdminLayout>
</template>

<script setup>
import { computed, onMounted, reactive, ref } from 'vue'
import {
  ArrowPathIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  EyeIcon,
  FunnelIcon,
  MagnifyingGlassIcon,
  PencilIcon,
  PlusIcon,
  TrashIcon,
  XMarkIcon,
} from '@heroicons/vue/24/outline'
import AdminLayout from '../layouts/AdminLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import { apiService } from '../services/apiService'

const employees = ref([])
const designations = ref([])
const selected = ref(null)
const page = ref(1)
const pageSize = ref(10)
const filters = reactive({ search: '', designation: '', status: '' })

const sampleEmployees = [
  { id: 1, employee_code: 'EMP1001', id_card_no: 'EMP1001', name: 'Ramesh', surname: 'Kumar', email: 'ramesh.kumar@example.com', mobile_number: '9876543210', designation: 1 },
  { id: 2, employee_code: 'EMP1002', id_card_no: 'EMP1002', name: 'Suresh', surname: 'Das', email: 'suresh.das@example.com', mobile_number: '9876543211', designation: 2 },
  { id: 3, employee_code: 'EMP1003', id_card_no: 'EMP1003', name: 'Amit', surname: 'Singh', email: 'amit.singh@example.com', mobile_number: '9876543212', designation: 3, date_of_exit: '2024-05-23' },
  { id: 4, employee_code: 'EMP1004', id_card_no: 'EMP1004', name: 'Priya', surname: 'Sharma', email: 'priya.sharma@example.com', mobile_number: '9876543213', designation: 4 },
]

const filteredEmployees = computed(() => {
  const query = filters.search.toLowerCase().trim()
  return employees.value.filter((employee) => {
    const text = [fullName(employee), employee.email, employee.employee_code, employee.id_card_no].join(' ').toLowerCase()
    const matchesSearch = !query || text.includes(query)
    const matchesDesignation = !filters.designation || String(employee.designation) === String(filters.designation)
    const employeeStatus = employee.date_of_exit ? 'Inactive' : 'Active'
    const matchesStatus = !filters.status || employeeStatus === filters.status
    return matchesSearch && matchesDesignation && matchesStatus
  })
})

const pagedEmployees = computed(() => filteredEmployees.value.slice((page.value - 1) * pageSize.value, page.value * pageSize.value))

function fullName(employee) {
  return [employee.name, employee.middle_name, employee.surname].filter(Boolean).join(' ')
}

function initials(employee) {
  return fullName(employee)
    .split(' ')
    .map((part) => part[0])
    .join('')
    .slice(0, 2)
    .toUpperCase()
}

function designationName(id) {
  return designations.value.find((item) => String(item.id) === String(id))?.name || 'Designation'
}

function resetFilters() {
  filters.search = ''
  filters.designation = ''
  filters.status = ''
}

async function remove(employee) {
  if (!employee.id || !confirm(`Delete ${fullName(employee)}?`)) return
  await apiService.deleteEmployee(employee.id)
  employees.value = employees.value.filter((item) => item.id !== employee.id)
}

onMounted(async () => {
  const [employeeResult, designationResult] = await Promise.allSettled([apiService.listEmployees(), apiService.listDesignations()])
  employees.value = employeeResult.status === 'fulfilled' && employeeResult.value.length ? employeeResult.value : sampleEmployees
  designations.value = designationResult.status === 'fulfilled' && designationResult.value.length ? designationResult.value : [
    { id: 1, name: 'Driver' },
    { id: 2, name: 'Helper' },
    { id: 3, name: 'Supervisor' },
    { id: 4, name: 'Clerk' },
  ]
})
</script>
