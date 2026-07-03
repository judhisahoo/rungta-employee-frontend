const CARD_LOOKUP_KEY = 'rungta_card_lookup_result'

export const cardLookupStore = {
  set(employee) {
    sessionStorage.setItem(CARD_LOOKUP_KEY, JSON.stringify(employee || {}))
  },
  get() {
    const raw = sessionStorage.getItem(CARD_LOOKUP_KEY)
    return raw ? JSON.parse(raw) : null
  },
  clear() {
    sessionStorage.removeItem(CARD_LOOKUP_KEY)
  },
}
