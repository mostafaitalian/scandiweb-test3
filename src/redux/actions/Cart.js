export const ADD_CART = "ADD_CART"
export const ADD_PRODUCT_CART = "ADD_PRODUCT_CART"
export const CHANGE_PRODUCT_QUANTITY = "CHANGE_PRODUCT_QUNTITY"
export const INC_PRODUCT_QUANTITY = "INC_PRODUCT_QUANTITY"
export const DEC_PRODUCT_QUANTITY = "DEC_PRODUCT_QUANTITY"
export const REMOVE_PRODUCT_CART = "REMOVE_PRODUCT_CART"
export const INC_PRODUCT_QUANTITY_NO_ATTR = "INC_PRODUCT_QUANTITY_NO_ATTR"
// add a new product to cart with quantity 1
export function addProductCart(product, quantity, attrs) {
  return {
    type: ADD_PRODUCT_CART,
    product,
    quantity,
    attrs,
  }
}

// remove the product from cart with selected attributes
// if i have 2 products with same id and different attributes it will remove only the desired one
export function removeProductCart(productId, attrData) {
  return {
    type: REMOVE_PRODUCT_CART,
    productId,
    attrData,
  }
}

// change the quantity of the product in cart -for future use-
export function changeProductQuantity(productId, quantity) {
  return {
    type: CHANGE_PRODUCT_QUANTITY,
    productId,
    quantity,
  }
}

// increase the prroduct quantity in cart
// it will increase the product with desired attributes only
export function incProductQuantity(productId, attrData) {
  return {
    type: INC_PRODUCT_QUANTITY,
    productId,
    attrData,
  }
}
export function incProductQuantityNoAttr(productId) {
  return {
    type: INC_PRODUCT_QUANTITY_NO_ATTR,
    productId,
  }
}

// decrease the prroduct quantity in cart
// it will decrease the product with desired attributes only
export function decProductQuantity(productId, attrData) {
  return {
    type: DEC_PRODUCT_QUANTITY,
    productId,
    attrData,
  }
}
