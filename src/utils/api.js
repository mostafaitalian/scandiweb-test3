import { gql } from "@apollo/client"

import { client } from "../index"

// get all currencies from database
export function getAllCurrencies() {
  const currencies = gql`
    query CurrenciesQuery {
      currencies {
        label
        symbol
      }
    }
  `
  return client.query({
    query: currencies,
  })
}

//get product by id
export function getProduct(id) {
  const product = gql`
    query Product($productId: String!) {
      product(id: $productId) {
        id
        name
        inStock
        gallery
        description
        category
        attributes {
          id
          name
          items {
            displayValue
            value
            id
          }
          type
        }
        prices {
          currency {
            label
            symbol
          }
          amount
        }
        brand
      }
    }
  `
  return client.query({
    query: product,
    variables: {
      productId: id,
    },
  })
}

// get all categories from database
export function getCategory(title) {
  const category = gql`
    query Category($input: CategoryInput) {
      category(input: $input) {
        products {
          id
          attributes {
            id
            name
            type
            items {
              displayValue
              value
              id
            }
          }
          name
          inStock
          gallery
          description
          category
          prices {
            currency {
              symbol
              label
            }
            amount
          }
          brand
        }
        name
      }
    }
  `
  return client.query({
    query: category,
    variables: {
      input: { title },
    },
  })
}

// get all categories api
export function getAllCategories() {
  const categories = gql`
    query CategoriesQuery {
      categories {
        name
        products {
          name
          inStock
          gallery
          description
          category
          attributes {
            name
            type
            items {
              value
              displayValue
            }
          }
          prices {
            currency {
              symbol
              label
            }
            amount
          }
          brand
          id
        }
      }
    }
  `
  return client.query({
    query: categories,
  })
}
