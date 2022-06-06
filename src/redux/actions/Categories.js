export const GET_ALL_CATEGORIES = "GET_ALL_CATEGORIES"
export const ADD_ALL_CATEGORIES = "ADD_ALL_CATEGORIES"
export const ADD_CATEGORY = "ADD_CATEGORY"
export const GET_CATEGORY = "ADD_CATEGORY"

export const get_all_categories = () => {
  return {
    type: GET_ALL_CATEGORIES,
  }
}

// add all categories to store
export const add_all_categories = (categories) => {
  return {
    type: ADD_ALL_CATEGORIES,
    categories,
  }
}

// add category in the store
export function addCategory(category) {
  return {
    type: ADD_CATEGORY,
    category,
  }
}

// get category from store by its title
export function getCategory(title) {
  return {
    type: GET_CATEGORY,
    title,
  }
}
