export const ADD_CURRENT_CURRENCY = " ADD_CURRENT_CURRENCY"
export const CHANGE_CURRENT_CURRENCY = "CHANGE_CURRENT_CURRENCY"

// add selected Currency to store
export function addCurrentCurrency(currency) {
  return {
    type: ADD_CURRENT_CURRENCY,
    currency,
  }
}

// change the current currency
export function changeCurrentCurrency(currency) {
  return {
    type: CHANGE_CURRENT_CURRENCY,
    currency,
  }
}
