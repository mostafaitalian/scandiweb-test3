import {
  ADD_PRODUCT_CART,
  INC_PRODUCT_QUANTITY,
  DEC_PRODUCT_QUANTITY,
  REMOVE_PRODUCT_CART,
  INC_PRODUCT_QUANTITY_NO_ATTR,
} from "../actions/Cart"
import { getSelectedAtt, checkArraysEqual } from "../../utils"

export default function cartReducer(state = [], action) {
  switch (action.type) {
    case ADD_PRODUCT_CART:
      return [
        ...state,
        {
          product: action.product,
          quantity: action.quantity,
          selectedAttrs: action.attrs,
        },
      ]
    case REMOVE_PRODUCT_CART: {
      const cartProduct = state.filter((cartProduct) => {
        const a = getSelectedAtt(cartProduct.product.id, cartProduct.selectedAttrs)
        return (
          cartProduct.product.id === action.productId &&
          checkArraysEqual(a, action.attrData)
        )
      })[0]

      // keep the items in the cart unchanged

      const index = state.indexOf(cartProduct)
      const arrayBefore = state.slice(0, index)
      const arrayAfter = state.slice(index + 1, state.length)
      return [...arrayBefore, ...arrayAfter]
    }
    //cart item with id and selected attributes

    case INC_PRODUCT_QUANTITY: {
      const cartProduct = state.filter((cartProduct) => {
        const a = getSelectedAtt(cartProduct.product.id, cartProduct.selectedAttrs)
        return (
          cartProduct.product.id === action.productId &&
          checkArraysEqual(a, action.attrData)
        )
      })[0]

      // keep the items in the cart unchanged
      const index = state.indexOf(cartProduct)
      const arrayBefore = state.slice(0, index)
      const arrayAfter = state.slice(index + 1, state.length)
      const { product, quantity, selectedAttrs } = cartProduct
      const incQuantity = quantity + 1
      return [
        ...arrayBefore,
        { product, quantity: incQuantity, selectedAttrs },
        ...arrayAfter,
      ]
    }
    case INC_PRODUCT_QUANTITY_NO_ATTR: {
      const cartProduct = state.filter(
        (cartProduct) => cartProduct.product.id === action.productId
      )[0]

      // keep the items in the cart unchanged
      const index = state.indexOf(cartProduct)
      const arrayBefore = state.slice(0, index)
      const arrayAfter = state.slice(index + 1, state.length)
      const { product, quantity, selectedAttrs } = cartProduct
      const incQuantity = quantity + 1
      return [
        ...arrayBefore,
        { product, quantity: incQuantity, selectedAttrs },
        ...arrayAfter,
      ]
    }
    case DEC_PRODUCT_QUANTITY: {
      const cartProduct = state.filter((cartProduct) => {
        const a = getSelectedAtt(cartProduct.product.id, cartProduct.selectedAttrs)
        return (
          cartProduct.product.id === action.productId &&
          checkArraysEqual(a, action.attrData)
        )
      })[0]

      // keep the items in the cart unchanged

      const index = state.indexOf(cartProduct)
      const arrayBefore = state.slice(0, index)
      const arrayAfter = state.slice(index + 1, state.length)
      const { product, quantity, selectedAttrs } = cartProduct
      const incQuantity = quantity - 1
      if (incQuantity <= 0) {
        return [...arrayBefore, { product, quantity, selectedAttrs }, ...arrayAfter]
      }
      // const cartWithoutProduct = state.filter(cartProduct=>cartProduct.product.id!==action.productId)
      return [
        ...arrayBefore,
        { product, quantity: incQuantity, selectedAttrs },
        ...arrayAfter,
      ]
    }
    default:
      return [...state]
  }
}
