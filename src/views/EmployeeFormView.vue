<template>
  <AdminLayout>
    <PageHeader :title="isEdit ? 'Edit Employee' : 'Add Employee'" :subtitle="isEdit ? 'Update employee details.' : 'Enter employee details to add a new employee.'">
      <RouterLink class="secondary-btn" to="/employees">
        Cancel
        <XMarkIcon class="h-5 w-5" />
      </RouterLink>
      <button class="primary-btn" type="button" :disabled="loading" @click="submit">
        <BookmarkSquareIcon class="h-5 w-5" />
        {{ loading ? 'Saving...' : 'Save Employee' }}
      </button>
    </PageHeader>

    <section class="panel p-6">
      <h2 class="mb-6 text-lg font-extrabold text-ink">Employee Information</h2>
      <div class="grid gap-x-10 gap-y-5 lg:grid-cols-3">
        <TextField v-model="form.employee_code" label="Employee Code" required placeholder="Enter employee code" />
        <TextField v-model="form.id_card_no" label="ID Card No" required placeholder="Enter ID card number" />
        <TextField v-model="form.name" label="Name" required placeholder="Enter first name" />
        <TextField v-model="form.middle_name" label="Middle Name" placeholder="Enter middle name" />
        <TextField v-model="form.surname" label="Surname" required placeholder="Enter surname" />
        <SelectField v-model="form.gender" label="Gender" required :options="genderOptions" />
        <TextField v-model="form.guardian_name" label="Guardian Name" required placeholder="Enter guardian name" />
        <TextField v-model="form.date_of_birth" label="Date of Birth" required type="date" />
        <TextField v-model="form.place_of_birth" label="Place of Birth" required placeholder="Enter place of birth" />
        <TextField v-model="form.nationality" label="Nationality" required placeholder="Enter nationality" />
        <SelectField v-model="form.education_level" label="Education Level" required :options="educationOptions" />
        <TextField v-model="form.date_of_joining" label="Date of Joining" required type="date" />
        <SelectField v-model.number="form.designation" label="Designation" required :options="designationOptions" />
        <SelectField v-model="form.category" label="Category" required :options="categoryOptions" />
        <SelectField v-model="form.employment_type" label="Employment Type" required :options="employmentOptions" />
        <TextField v-model="form.mobile_number" label="Mobile Number" required placeholder="Enter mobile number" />
        <TextField v-model="form.email" label="Email" required type="email" placeholder="Enter email address" />
        <TextField v-model="form.universal_account_number" label="Universal Account Number" placeholder="Enter UAN number" />
        <TextField v-model="form.pan" label="PAN" placeholder="Enter PAN number" />
        <TextField v-model="form.nominee" label="Nominee" placeholder="Enter nominee name" />
      </div>

      <div class="my-7 border-t border-slate-100"></div>

      <div class="grid gap-10 xl:grid-cols-2">
        <div>
          <h3 class="mb-5 text-lg font-extrabold text-ink">Official & Payroll Details</h3>
          <div class="grid gap-5 md:grid-cols-2">
            <TextField v-model="form.eps_nps" label="EPS / NPS" placeholder="Enter EPS / NPS" />
            <TextField v-model.number="form.pay" label="Pay" required type="number" placeholder="Enter pay amount" />
            <TextField v-model="form.promotion" label="Promotion" placeholder="Enter promotion details" />
            <TextField v-model="form.esic_insurance_no" label="ESIC Insurance No." placeholder="Enter ESIC insurance number" />
            <TextField v-model="form.aadhaar_number" label="Aadhaar Number" placeholder="Enter Aadhaar number" />
            <TextField v-model="form.service_book_no" label="Service Book No." placeholder="Enter service book number" />
          </div>
        </div>
        <div>
          <h3 class="mb-5 text-lg font-extrabold text-ink">Bank Details</h3>
          <div class="grid gap-5 md:grid-cols-2">
            <TextField v-model="form.bank_account_no" label="Bank Account No" required placeholder="Enter bank account number" />
            <TextField v-model="form.bank_ifsc" label="IFSC Code" required placeholder="Enter IFSC code" />
            <TextField v-model="form.branch" label="Branch" required placeholder="Enter branch name" />
            <TextField v-model.number="form.organisation_id" label="Organisation ID" required type="number" placeholder="Enter organisation id" />
          </div>
          <h3 class="mb-5 mt-5 text-lg font-extrabold text-ink">Addresses</h3>
          <div class="grid gap-5 md:grid-cols-2">
            <TextAreaField v-model="form.present_address" label="Present Address" required placeholder="Enter present address" />
            <TextAreaField v-model="form.permanent_address" label="Permanent Address" required placeholder="Enter permanent address" />
          </div>
        </div>
      </div>

      <p v-if="error" class="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{{ error }}</p>
    </section>
  </AdminLayout>
</template>

<script setup>
import { computed, defineComponent, h, onMounted, reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { BookmarkSquareIcon, XMarkIcon } from '@heroicons/vue/24/outline'
import AdminLayout from '../layouts/AdminLayout.vue'
import PageHeader from '../components/PageHeader.vue'
import { apiService } from '../services/apiService'

const route = useRoute()
const router = useRouter()
const loading = ref(false)
const error = ref('')
const designations = ref([])
const isEdit = computed(() => Boolean(route.params.id))

const form = reactive({
  employee_code: '',
  id_card_no: '',
  name: '',
  middle_name: '',
  surname: '',
  gender: '',
  guardian_name: '',
  date_of_birth: '',
  place_of_birth: '',
  nationality: '',
  education_level: '',
  date_of_joining: '',
  designation: '',
  category: '',
  employment_type: '',
  mobile_number: '',
  email: '',
  universal_account_number: '',
  pan: '',
  nominee: '',
  eps_nps: '',
  pay: 0,
  promotion: '',
  esic_insurance_no: '',
  aadhaar_number: '',
  bank_account_no: '',
  bank_ifsc: '',
  branch: '',
  present_address: '',
  permanent_address: '',
  service_book_no: '',
  organisation_id: 1,
  employee_app_type: 'employee',
})

const genderOptions = [
  { label: 'Select gender', value: '' },
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Transgender', value: 'transgender' },
]
const educationOptions = ['Select education level', '10th', '12th', 'Graduate', 'Post Graduate'].map((label, index) => ({ label, value: index ? label : '' }))
const categoryOptions = ['Select category', 'Unskilled', 'Semi-skilled', 'Skilled', 'Highly Skilled'].map((label, index) => ({ label, value: index ? label : '' }))
const employmentOptions = [
  { label: 'Select employment type', value: '' },
  { label: 'Permanent', value: 'P' },
  { label: 'Temporary', value: 'T' },
  { label: 'Full Time', value: 'FT' },
  { label: 'B', value: 'B' },
]
const designationOptions = computed(() => [
  { label: 'Select designation', value: '' },
  ...designations.value.map((item) => ({ label: item.name, value: item.id })),
])

const TextField = defineComponent({
  props: ['modelValue', 'label', 'placeholder', 'type', 'required'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => h('label', [
      h('span', { class: 'form-label' }, [props.label, props.required ? h('span', { class: 'required' }, ' *') : null]),
      h('input', {
        class: 'form-control',
        type: props.type || 'text',
        value: props.modelValue,
        placeholder: props.placeholder,
        onInput: (event) => emit('update:modelValue', props.type === 'number' ? Number(event.target.value) : event.target.value),
      }),
    ])
  },
})

const TextAreaField = defineComponent({
  props: ['modelValue', 'label', 'placeholder', 'required'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => h('label', [
      h('span', { class: 'form-label' }, [props.label, props.required ? h('span', { class: 'required' }, ' *') : null]),
      h('textarea', {
        class: 'form-control min-h-16 py-3',
        value: props.modelValue,
        placeholder: props.placeholder,
        onInput: (event) => emit('update:modelValue', event.target.value),
      }),
    ])
  },
})

const SelectField = defineComponent({
  props: ['modelValue', 'label', 'options', 'required'],
  emits: ['update:modelValue'],
  setup(props, { emit }) {
    return () => h('label', [
      h('span', { class: 'form-label' }, [props.label, props.required ? h('span', { class: 'required' }, ' *') : null]),
      h('select', {
        class: 'form-control',
        value: props.modelValue,
        onChange: (event) => emit('update:modelValue', event.target.value),
      }, props.options.map((option) => h('option', { value: option.value }, option.label))),
    ])
  },
})

function normalizePayload() {
  return Object.fromEntries(Object.entries(form).map(([key, value]) => [key, value === '' ? null : value]))
}

async function submit() {
  error.value = ''
  loading.value = true
  try {
    if (isEdit.value) {
      await apiService.updateEmployee(route.params.id, normalizePayload())
    } else {
      await apiService.createEmployee(normalizePayload())
    }
    router.push('/employees')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(async () => {
  const designationResult = await Promise.allSettled([apiService.listDesignations()])
  designations.value = designationResult[0].status === 'fulfilled' && designationResult[0].value.length ? designationResult[0].value : [
    { id: 1, name: 'Driver' },
    { id: 2, name: 'Helper' },
    { id: 3, name: 'Supervisor' },
  ]

  if (isEdit.value) {
    const employee = await apiService.getEmployee(route.params.id)
    Object.assign(form, employee)
  } else {
    form.employee_code = `EMP${Date.now().toString().slice(-6)}`
    const generated = await apiService.generateEmployeeCard().catch(() => null)
    form.id_card_no = generated?.id_card_no || `CARD${Date.now().toString().slice(-8)}`
  }
})
</script>
