export const API_CONFIG = {
  baseURL: import.meta.env.VITE_API_BASE_URL || '/api',
  endpoints: {
    auth: {
      login: '/auth/login',
      register: '/auth/register',
    },
    employees: {
      list: '/employees',
      create: '/employees',
      detail: (id) => `/employees/${id}`,
      generateId: '/employees/generate_id',
      validateCard: '/employees/validate_id_card_no',
      search: '/employees/search',
      publicSearchByCard: '/employees/search_by_id_card',
    },
    organisations: {
      list: '/organisations',
      create: '/organisations',
      detail: (id) => `/organisations/${id}`,
    },
    designations: {
      list: '/designations',
      create: '/designations',
      detail: (id) => `/designations/${id}`,
    },
  },
}
