<template>
  <div class="flex min-h-screen bg-slate-50">
    <aside class="fixed inset-y-0 left-0 z-30 hidden w-72 border-r border-slate-200 bg-white lg:block">
      <div class="px-8 py-8">
        <LogoMark />
      </div>
      <nav class="space-y-2 px-5">
        <RouterLink
          v-for="item in menuItems"
          :key="item.to"
          :to="item.to"
          class="flex items-center gap-5 rounded-lg px-4 py-4 text-base font-semibold text-ink transition hover:bg-brand-50 hover:text-brand-600"
          :class="{ 'bg-brand-50 text-brand-600': route.path === item.to || route.path.startsWith(`${item.to}/`) }"
        >
          <component :is="item.icon" class="h-8 w-8 shrink-0" />
          <span class="leading-7">{{ item.label }}</span>
        </RouterLink>
      </nav>
    </aside>

    <div class="flex min-h-screen flex-1 flex-col lg:pl-72">
      <header class="sticky top-0 z-20 flex h-24 items-center justify-between border-b border-slate-200 bg-white px-6 lg:px-8">
        <button class="text-slate-700" type="button" aria-label="Menu">
          <Bars3Icon class="h-8 w-8" />
        </button>
        <div class="flex items-center gap-6">
          <BellIcon class="h-8 w-8 text-slate-600" />
          <div class="group relative flex items-center gap-3 pb-4 pt-4">
            <UserCircleIcon class="h-14 w-14 text-brand-600" />
            <ChevronDownIcon class="h-5 w-5 text-slate-600" />
            <div class="invisible absolute right-0 top-20 w-48 rounded-lg border border-slate-200 bg-white p-3 opacity-0 shadow-panel transition group-hover:visible group-hover:opacity-100">
              <button class="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-slate-700 hover:bg-slate-50">
                <UserIcon class="h-5 w-5" />
                My Profile
              </button>
              <div class="my-2 border-t border-slate-100"></div>
              <button class="flex w-full items-center gap-3 rounded-md px-3 py-3 text-left text-sm font-semibold text-red-600 hover:bg-red-50" @click="logout">
                <ArrowRightOnRectangleIcon class="h-5 w-5" />
                Logout
              </button>
            </div>
          </div>
        </div>
      </header>

      <main class="flex-1 px-6 py-8 lg:px-8">
        <slot />
      </main>

      <footer class="flex min-h-20 items-center justify-between border-t border-slate-200 bg-white px-6 text-sm text-slate-600 lg:px-8">
        <span>© 2024 Company Name. All rights reserved.</span>
        <span>Version 1.0.0</span>
      </footer>
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from 'vue-router'
import {
  ArrowRightOnRectangleIcon,
  Bars3Icon,
  BellIcon,
  BriefcaseIcon,
  BuildingOffice2Icon,
  ChevronDownIcon,
  HomeIcon,
  IdentificationIcon,
  UserGroupIcon,
  UserIcon,
  UserCircleIcon,
} from '@heroicons/vue/24/outline'
import LogoMark from '../components/LogoMark.vue'
import { authStore } from '../services/authStore'

const route = useRoute()
const router = useRouter()

const menuItems = [
  { label: 'Dashboard', to: '/dashboard', icon: HomeIcon },
  { label: 'Organisation Management', to: '/organisations', icon: BuildingOffice2Icon },
  { label: 'Designation Management', to: '/designations', icon: BriefcaseIcon },
  { label: 'Employee Management', to: '/employees', icon: UserGroupIcon },
  { label: 'Verify Employee By Card', to: '/verify-card', icon: IdentificationIcon },
]

function logout() {
  authStore.clear()
  router.push('/login')
}
</script>
