<template>
  <div class="relative h-full overflow-hidden bg-gradient-to-br from-brand-50 via-white to-blue-50 p-10">
    <LogoMark />

    <div class="mt-24 max-w-xl">
      <h1 class="text-5xl font-extrabold leading-tight tracking-normal text-ink">
        Smart Employee<br />
        Verification System
      </h1>
      <p class="mt-8 max-w-sm text-2xl leading-10 text-slate-600">
        Manage, Verify and<br />
        Track your employees<br />
        efficiently.
      </p>
    </div>

    <svg
      class="absolute bottom-0 left-0 h-[54%] w-full"
      viewBox="0 0 760 500"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      <path
        d="M0 426C88 389 150 396 237 430C327 465 402 443 478 427C573 407 633 460 760 428V500H0V426Z"
        fill="#dbeafe"
        opacity="0.64"
      />
      <path
        d="M141 262C141 157 226 72 331 72H367C418 72 438 111 487 113H548C625 113 688 176 688 253V353C688 396 653 431 610 431H217C175 431 141 397 141 355V262Z"
        fill="#dbeafe"
        opacity="0.64"
      />
      <ellipse cx="158" cy="421" rx="72" ry="12" fill="#c7dcfb" opacity="0.7" />
      <ellipse cx="624" cy="413" rx="68" ry="12" fill="#c7dcfb" opacity="0.7" />

      <g filter="url(#panelShadow)">
        <rect x="190" y="161" width="438" height="202" rx="10" fill="#26364F" />
        <rect x="206" y="178" width="406" height="157" rx="5" fill="white" />
        <rect x="204" y="176" width="410" height="161" rx="7" stroke="#43546F" stroke-width="5" />
        <path d="M352 364H469L480 394H341L352 364Z" fill="#34445F" />
        <rect x="318" y="389" width="186" height="14" rx="7" fill="#34445F" />
      </g>

      <rect x="254" y="219" width="111" height="104" rx="11" fill="#e8f1ff" />
      <circle cx="310" cy="259" r="27" fill="#FF9B72" />
      <path d="M283 255C287 225 334 225 338 255C329 246 293 246 283 255Z" fill="#26364F" />
      <path d="M271 318C276 293 291 279 310 279C329 279 344 293 349 318H271Z" fill="#0f6be8" />
      <path d="M294 286L310 301L326 286V319H294V286Z" fill="#1f7cff" />
      <path d="M304 279H316L310 296L304 279Z" fill="white" />

      <rect x="394" y="226" width="88" height="20" rx="8" fill="#d6e2f6" />
      <rect x="394" y="268" width="165" height="20" rx="8" fill="#e7eef9" />
      <rect x="394" y="307" width="150" height="20" rx="8" fill="#e7eef9" />
      <rect x="394" y="346" width="87" height="20" rx="8" fill="#e7eef9" />

      <g filter="url(#shieldShadow)">
        <path
          d="M551 75C591 102 628 96 653 105V166C653 232 614 270 551 292C488 270 449 232 449 166V105C474 96 511 102 551 75Z"
          fill="url(#shieldGradient)"
        />
        <path
          d="M509 177L540 207L603 140"
          stroke="white"
          stroke-width="15"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </g>

      <g>
        <ellipse cx="95" cy="410" rx="45" ry="10" fill="#c7dcfb" opacity="0.8" />
        <path d="M90 255H106V274H90V255Z" fill="#FF9B72" />
        <path
          d="M72 232C72 211 86 197 104 201C120 204 128 218 124 237C120 257 108 268 91 265C79 263 72 250 72 232Z"
          fill="#FF9B72"
        />
        <path
          d="M71 229C75 207 93 196 116 202C125 204 128 212 124 221C113 226 101 231 87 230C80 230 75 230 71 229Z"
          fill="#26364F"
        />
        <path d="M123 236C130 236 130 250 122 253L119 253L120 238L123 236Z" fill="#FF9B72" />
        <path
          d="M72 273C86 263 109 263 122 273L132 332H61L72 273Z"
          fill="#1f7cff"
        />
        <path d="M91 265H106L99 282L91 265Z" fill="#dbeafe" />
        <path
          d="M125 289L164 266"
          stroke="#FF9B72"
          stroke-width="13"
          stroke-linecap="round"
        />
        <path
          d="M164 266L178 279"
          stroke="#FF9B72"
          stroke-width="8"
          stroke-linecap="round"
        />
        <path
          d="M67 331H94L90 400H63L67 331Z"
          fill="#172640"
        />
        <path
          d="M99 331H125L136 400H108L99 331Z"
          fill="#1E3153"
        />
        <path d="M60 398H94V413H47C48 405 52 400 60 398Z" fill="#0b1533" />
        <path d="M105 398H140V413H94C95 405 99 400 105 398Z" fill="#0b1533" />
      </g>

      <g>
        <path d="M610 378C593 340 601 305 635 275C637 316 629 348 610 378Z" fill="#bfd5f5" opacity="0.75" />
        <path d="M646 375C647 335 666 306 703 292C695 331 676 360 646 375Z" fill="#a8c6f0" opacity="0.75" />
        <path d="M631 380C621 345 630 314 660 287" stroke="#9dbce8" stroke-width="5" stroke-linecap="round" />
        <rect x="602" y="375" width="71" height="49" rx="10" fill="#9bb9e2" />
        <path d="M596 375H679L671 397H604L596 375Z" fill="#8fb0dc" />
      </g>

      <defs>
        <filter id="panelShadow" x="168" y="145" width="482" height="280" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="14" stdDeviation="12" flood-color="#1C315A" flood-opacity="0.16" />
        </filter>
        <filter id="shieldShadow" x="429" y="59" width="244" height="257" filterUnits="userSpaceOnUse">
          <feDropShadow dx="0" dy="12" stdDeviation="10" flood-color="#065EDB" flood-opacity="0.28" />
        </filter>
        <linearGradient id="shieldGradient" x1="449" x2="653" y1="75" y2="292" gradientUnits="userSpaceOnUse">
          <stop stop-color="#0F6BE8" />
          <stop offset="1" stop-color="#0756D3" />
        </linearGradient>
      </defs>
    </svg>

    <div class="absolute left-[78%] top-[16%] h-14 w-14 rounded-full bg-brand-100/70"></div>
    <div class="absolute left-[83%] top-[45%] h-7 w-7 rounded-full bg-brand-100/80"></div>
  </div>
</template>

<script setup>
import LogoMark from './LogoMark.vue'
</script>
