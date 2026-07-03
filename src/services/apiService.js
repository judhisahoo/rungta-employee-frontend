import { API_CONFIG } from '../config/api'
import { http } from './http'

const { endpoints } = API_CONFIG

export const apiService = {
  login(payload) {
    return http.post(endpoints.auth.login, payload)
  },
  register(payload) {
    return http.post(endpoints.auth.register, payload)
  },
  listEmployees() {
    return http.get(endpoints.employees.list)
  },
  createEmployee(payload) {
    return http.post(endpoints.employees.create, payload)
  },
  getEmployee(id) {
    return http.get(endpoints.employees.detail(id))
  },
  updateEmployee(id, payload) {
    return http.put(endpoints.employees.detail(id), payload)
  },
  deleteEmployee(id) {
    return http.delete(endpoints.employees.detail(id))
  },
  generateEmployeeCard() {
    return http.post(endpoints.employees.generateId, {})
  },
  verifyEmployeeByCard(id_card_no) {
    return http.post(endpoints.employees.publicSearchByCard, { id_card_no })
  },
  listOrganisations() {
    return http.get(endpoints.organisations.list)
  },
  listDesignations() {
    return http.get(endpoints.designations.list)
  },
}
