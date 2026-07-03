import { createRouter, createWebHistory } from 'vue-router'
import { authStore } from '../services/authStore'
import LoginView from '../views/LoginView.vue'
import RegisterView from '../views/RegisterView.vue'
import DashboardView from '../views/DashboardView.vue'
import EmployeeListView from '../views/EmployeeListView.vue'
import EmployeeFormView from '../views/EmployeeFormView.vue'
import PlaceholderView from '../views/PlaceholderView.vue'
import VerifyCardView from '../views/VerifyCardView.vue'
import ICardView from '../views/ICardView.vue'
import LCardDetailsView from '../views/LCardDetailsView.vue'

const routes = [
  { path: '/', redirect: '/dashboard' },
  { path: '/login', name: 'login', component: LoginView, meta: { public: true } },
  { path: '/register', name: 'register', component: RegisterView, meta: { public: true } },
  { path: '/icard', name: 'icard', component: ICardView, meta: { public: true, allowAuthenticated: true } },
  { path: '/lcarddetails', name: 'lcarddetails', component: LCardDetailsView, meta: { public: true, allowAuthenticated: true } },
  { path: '/dashboard', name: 'dashboard', component: DashboardView },
  { path: '/organisations', name: 'organisations', component: PlaceholderView, props: { title: 'Organisation Management' } },
  { path: '/designations', name: 'designations', component: PlaceholderView, props: { title: 'Designation Management' } },
  { path: '/employees', name: 'employees', component: EmployeeListView },
  { path: '/employees/new', name: 'employee-new', component: EmployeeFormView },
  { path: '/employees/:id/edit', name: 'employee-edit', component: EmployeeFormView, props: true },
  { path: '/verify-card', name: 'verify-card', component: VerifyCardView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

router.beforeEach((to) => {
  if (!to.meta.public && !authStore.isAuthenticated()) {
    return { name: 'login' }
  }

  if (to.meta.public && !to.meta.allowAuthenticated && authStore.isAuthenticated()) {
    return { name: 'dashboard' }
  }

  return true
})

export default router
