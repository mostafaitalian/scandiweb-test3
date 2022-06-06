import { combineReducers } from "redux"

import categoriesReducer from "./Categories"
import currenciesReducer from "./Currencies"
import currenctCurrencyReducer from "./CurrentCurrency"
import cartReducer from "./Cart"

export default combineReducers({
  categories: categoriesReducer,
  currencies: currenciesReducer,
  currentCurrency: currenctCurrencyReducer,
  cart: cartReducer,
})
