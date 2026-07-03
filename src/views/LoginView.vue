<template>
  <div class="flex min-h-screen items-center justify-center bg-white p-6">
    <div class="grid min-h-[760px] w-full max-w-[1720px] overflow-hidden rounded-lg border border-slate-200 bg-white shadow-panel lg:grid-cols-[0.82fr_1fr]">
      <AuthIllustration />
      <section class="flex items-center justify-center p-8">
        <form class="w-full max-w-2xl" @submit.prevent="submit">
          <div class="mb-12 text-center">
            <h2 class="text-5xl font-extrabold text-ink">Welcome Back!</h2>
            <p class="mt-6 text-2xl text-slate-500">Please sign in to your account</p>
          </div>

          <div class="space-y-7">
            <AuthInput v-model="form.email" :icon="EnvelopeIcon" placeholder="Enter your email" type="email" />
            <AuthInput v-model="form.password" :icon="LockClosedIcon" placeholder="Enter your password" :type="showPassword ? 'text' : 'password'">
              <button type="button" class="text-slate-500" @click="showPassword = !showPassword">
                <EyeIcon class="h-7 w-7" />
              </button>
            </AuthInput>
          </div>

          <div class="mt-8 flex items-center justify-between">
            <label class="flex items-center gap-4 text-lg font-semibold text-ink">
              <input v-model="remember" type="checkbox" class="h-7 w-7 rounded border-slate-300 text-brand-600 focus:ring-brand-500" />
              Remember me
            </label>
            <a href="#" class="text-lg font-bold text-brand-600">Forgot Password?</a>
          </div>

          <p v-if="error" class="mt-6 rounded-md bg-red-50 px-4 py-3 text-sm font-semibold text-red-600">{{ error }}</p>

          <button class="primary-btn mt-10 h-16 w-full text-2xl" :disabled="loading">
            {{ loading ? 'Logging in...' : 'Login' }}
          </button>

          <div class="my-10 flex items-center gap-8 text-lg text-slate-500">
            <div class="h-px flex-1 bg-slate-200"></div>
            or
            <div class="h-px flex-1 bg-slate-200"></div>
          </div>

          <p class="text-center text-xl text-slate-500">
            Don’t have an account?
            <RouterLink class="font-bold text-brand-600" to="/register">Register here</RouterLink>
          </p>
          <p class="mt-4 text-center text-xl text-slate-500">
            Search Employee By ID Card?
            <a class="font-bold text-brand-600" :href="iCardLink">Click</a>
            here.
          </p>
        </form>
      </section>
    </div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { EnvelopeIcon, EyeIcon, LockClosedIcon } from '@heroicons/vue/24/outline'
import AuthIllustration from '../components/AuthIllustration.vue'
import AuthInput from '../components/AuthInput.vue'
import { apiService } from '../services/apiService'
import { authStore } from '../services/authStore'

const router = useRouter()
const form = reactive({ email: '', password: '' })
const remember = ref(false)
const showPassword = ref(false)
const loading = ref(false)
const error = ref('')
const iCardLink = `${import.meta.env.BASE_URL}icard`

async function submit() {
  error.value = ''
  loading.value = true
  try {
    const response = await apiService.login(form)
    authStore.setSession(response)
    router.push('/dashboard')
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}
</script>
