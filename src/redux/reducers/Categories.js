import {
  GET_ALL_CATEGORIES,
  ADD_CATEGORY,
  ADD_ALL_CATEGORIES,
  GET_CATEGORY,
} from "../actions/Categories"

export default function categoriesReducer(state = [], action) {
  switch (action.type) {
    case ADD_ALL_CATEGORIES:
      return [...state, ...action.categories.categories]
    case GET_ALL_CATEGORIES:
      return [...state]
    case ADD_CATEGORY: {
      const filteredCategory = state.filter(
        (category) => category.name !== action.category.name
      )
      return [...filteredCategory, action.category]
    }

    case GET_CATEGORY:
      return state.filter((category) => category.title === action.title)
    default:
      return [...state]
  }
}
