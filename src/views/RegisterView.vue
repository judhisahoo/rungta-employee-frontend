<template>
  <div class="flex min-h-screen items-center justify-center bg-white p-6">
    <div class="grid min-h-[760px] w-full max-w-[1720px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-panel lg:grid-cols-[0.82fr_1fr]">
      <AuthIllustration />
      <section class="flex items-center justify-center p-8">
        <form class="w-full max-w-2xl" @submit.prevent="submit">
          <div class="mb-10">
            <h2 class="text-5xl font-extrabold text-ink">Create Your Account</h2>
            <p class="mt-4 text-2xl text-slate-500">Join us and get started</p>
          </div>

          <div class="space-y-6">
            <AuthInput v-model="form.name" :icon="UserIcon" placeholder="Full Name" />
            <AuthInput v-model="form.email" :icon="EnvelopeIcon" placeholder="Email Address" type="email" />
            <AuthInput v-model="form.mobile_number" :icon="DevicePhoneMobileIcon" placeholder="Mobile Number" />
            <AuthInput v-model="password" :icon="LockClosedIcon" placeholder="Password" :type="showPassword ? 'text' : 'password'">
              <button type="button" class="text-slate-500" @click="showPassword = !showPassword">
                <EyeIcon class="h-7 w-7" />
              </button>
            </AuthInput>
            <AuthInput v-model="confirmPassword" :icon="LockClosedIcon" placeholder="Confirm Password" :type="showPassword ? 'text' : 'password'">
              <EyeIcon class="h-7 w-7 text-slate-500" />
            </AuthInput>
          </div>

          <p v-if="error" class="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{{ error }}</p>

          <button class="primary-btn mt-8 h-16 w-full text-2xl" :disabled="loading">
            {{ loading ? 'Registering...' : 'Register' }}
          </button>

          <p class="mt-9 text-center text-xl text-slate-500">
            Already have an account?
            <RouterLink class="font-bold text-brand-600" to="/login">Login here</RouterLink>
          </p>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { DevicePhoneMobileIcon, EnvelopeIcon, EyeIcon, LockClosedIcon, UserIcon } from '@heroicons/vue/24/outline'
import AuthIllustration from '../components/AuthIllustration.vue'
import AuthInput from '../components/AuthInput.vue'
import { apiService } from '../services/apiService'

const router = useRouter()
const password = ref('')
const confirmPassword = ref('')
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const form = reactive({
  employee_code: `EMP${Date.now().toString().slice(-6)}`,
  id_card_no: `CARD${Date.now().toString().slice(-8)}`,
  name: '',
  middle_name: '',
  surname: '',
  gender: 'male',
  nationality: 'indian',
  date_of_joining: new Date().toISOString().slice(0, 10),
  designation: 1,
  category: 'Skilled',
  employment_type: 'FT',
  mobile_number: '',
  email: '',
  pay: 0,
  organisation_id: 1,
  employee_app_type: 'employee',
})

async function submit() {
  error.value = ''
  if (password.value !== confirmPassword.value) {
    error.value = 'Password and confirm password must match.'
    return
  }

  loading.value = true
  try {
    await apiService.register(form)
    router.push('/login')
  } catch (err) {
    error.value = `${err.message}. Registration requires valid organisation and designation ids in the backend.`
  } finally {
    loading.value = false
  }
}
</script>
