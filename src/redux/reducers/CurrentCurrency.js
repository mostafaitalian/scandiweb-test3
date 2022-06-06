import { ADD_CURRENT_CURRENCY, CHANGE_CURRENT_CURRENCY } from "../actions/CurrentCurrency"

export default function currenctCurrencyReducer(state = {}, action) {
  switch (action.type) {
    case ADD_CURRENT_CURRENCY:
      return action.currency

    case CHANGE_CURRENT_CURRENCY:
      return action.currency
    default:
      return { ...state }
  }
}
