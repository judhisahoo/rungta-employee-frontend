<template>
  <div class="relative h-full overflow-hidden bg-gradient-to-br from-brand-50 via-white to-slate-100 p-10">
    <LogoMark />
    <div class="mt-24 max-w-md">
      <h1 class="text-5xl font-extrabold leading-tight tracking-normal text-ink">
        Smart Employee Verification System
      </h1>
      <p class="mt-8 text-2xl leading-10 text-slate-600">Manage, Verify and Track your employees efficiently.</p>
    </div>

    <div class="absolute bottom-20 left-20 right-20 h-80">
      <div class="absolute bottom-0 left-16 h-56 w-96 rounded-[2rem] bg-brand-100/80"></div>
      <div class="absolute bottom-14 left-28 h-36 w-80 rounded-lg border-8 border-slate-700 bg-white shadow-panel">
        <div class="mx-8 mt-8 flex gap-5">
          <div class="flex h-20 w-20 items-center justify-center rounded-lg bg-brand-50">
            <UserIcon class="h-12 w-12 text-brand-600" />
          </div>
          <div class="flex-1 space-y-3 pt-2">
            <div class="h-4 w-24 rounded-full bg-slate-100"></div>
            <div class="h-4 w-44 rounded-full bg-slate-100"></div>
            <div class="h-4 w-36 rounded-full bg-slate-100"></div>
          </div>
        </div>
      </div>
      <ShieldCheckIcon class="absolute bottom-28 left-80 h-36 w-36 text-brand-600 drop-shadow-xl" />
      <div class="absolute bottom-2 left-4">
        <div class="h-20 w-14 rounded-t-full bg-blue-300"></div>
        <div class="h-36 w-16 rounded-lg bg-brand-600"></div>
        <div class="mx-auto h-24 w-10 rounded-b-full bg-slate-800"></div>
      </div>
      <div class="absolute bottom-0 right-16 h-28 w-24 rounded-t-full bg-brand-100"></div>
    </div>
  </div>
</template>

<script setup>
import { ShieldCheckIcon, UserIcon } from '@heroicons/vue/24/solid'
import LogoMark from './LogoMark.vue'
</script>
