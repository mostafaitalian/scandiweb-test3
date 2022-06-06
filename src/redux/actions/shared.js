import { getAllCurrencies } from "../../utils/api"

// import { add_all_categories } from "./Categories"
import { addCurrencies } from "./Currencies"
import { addCurrentCurrency } from "./CurrentCurrency"

// handle initial data and setup store
// add all categories in the store
// add all currencies in the store
// add current currency in the store
// using thunk middleware
export function handleInitData() {
  return (dispatch) => {
    Promise.all([getAllCurrencies()])
      .then(([resultCurrencies]) => {
        // if (resultCategories.loading === false) {
        //   dispatch(add_all_categories(resultCategories.data))
        // }
        if (resultCurrencies.loading === false) {
          dispatch(addCurrencies(resultCurrencies.data))
          dispatch(addCurrentCurrency(resultCurrencies.data.currencies[0]))
        }
      })
      // .then(()=>dispatch(addCurrencies()))
      .catch((error) => {
        throw new Error(`${error}`)
      })
  }
}
