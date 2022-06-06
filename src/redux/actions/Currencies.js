export const ADD_ALL_CURRENCIES = "ADD_ALL_CURRENCIES"
export const ADD_CURRENCY = "ADD_CURRENCY"

export function addCurrencies(currencies) {
  return {
    type: ADD_ALL_CURRENCIES,
    currencies,
  }
}

export function addCurrency(currency) {
  return {
    type: ADD_CURRENCY,
    currency,
  }
}
