import { ADD_ALL_CURRENCIES, ADD_CURRENCY } from "../actions/Currencies"

export default function currenciesReducer(state = [], action) {
  switch (action.type) {
    case ADD_ALL_CURRENCIES:
      return [...state, ...action.currencies.currencies]
    case ADD_CURRENCY:
      return [...state, action.currency]
    default:
      return [...state]
  }
}
