import React, { Component } from "react"
import { withRouter } from "react-router-dom"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import {
  incProductQuantity,
  decProductQuantity,
  removeProductCart,
} from "../../redux/actions/Cart"
import { getSelectedAtt, getAllSelectedAttr } from "../../utils"

import "./cart.style.css"

import { ReactComponent as RightArrow } from "../../logos/Vector3.svg"
import { ReactComponent as LeftArrow } from "../../logos/Vector2.svg"

import SwatchComp from "../Shared/SwatchComp"

import CancelItem from "./CancelItem"

class Cart extends Component {
  state = {
    image: {
      index: 0,
      url: "",
    },
    images: {},
  }
  static propTypes = {
    dispatch: PropTypes.func,
    cart: PropTypes.arrayOf(Object),
    currentCurrency: PropTypes.object,
    total: PropTypes.number,
    history: PropTypes.object,
    totalItems: PropTypes.number,
  }
  componentDidMount() {
    if (this.props.cart !== undefined && this.props.cart.length !== 0) {
      for (const cartItem of this.props.cart) {
        const data = getAllSelectedAttr(cartItem.selectedAttrs).join("")
        this.setState((prev) => ({
          images: {
            ...prev.images,
            [cartItem.product.id + data]: {
              index: 0,
              image: cartItem.product.gallery[0],
            },
          },
        }))
      }
    }
  }
  // handle increase the product quantity the + button
  handleInc = (id, selectedAttrs) => {
    this.props.dispatch(incProductQuantity(id, getSelectedAtt(id, selectedAttrs)))
  }

  // handle decrease the product quantity the - button
  handleDec = (id, selectedAttrs) => {
    this.props.dispatch(decProductQuantity(id, getSelectedAtt(id, selectedAttrs)))
  }

  // handle remove the product with selected attributes from cart the X button
  handleRemoveCartProduct = (producId, selectedAttrs) => {
    this.props.dispatch(
      removeProductCart(producId, getSelectedAtt(producId, selectedAttrs))
    )
  }

  handleNavigateToCart = () => {
    this.props.history.push(`/all`)
  }

  handleRightArrow = (e, product, selectedAttrs) => {
    // let initialIndex = 1
    if (product.gallery.length > 1) {
      const data = getAllSelectedAttr(selectedAttrs)
      if (Object.prototype.hasOwnProperty.call(this.state.images, product.id + data)) {
        this.setState((prev) => {
          let index = prev.images[product.id + data].index + 1
          if (index < product.gallery.length) {
            return {
              images: {
                ...prev.images,
                [product.id + data]: {
                  index,
                  image: product.gallery[index],
                },
              },
            }
          } else {
            return {
              images: {
                ...prev.images,
                [product.id + data]: {
                  index: 0,
                  image: product.gallery[0],
                },
              },
            }
          }
        })
      }
    }
  }

  handleLeftArrow = (e, product, selectedAttrs) => {
    // let initialIndex = 1
    if (product.gallery.length > 1) {
      const data = getAllSelectedAttr(selectedAttrs)
      if (Object.prototype.hasOwnProperty.call(this.state.images, product.id + data)) {
        this.setState((prev) => {
          let index = prev.images[product.id + data].index - 1
          if (index < 0) {
            const lastIndex = product.gallery.length - 1
            return {
              images: {
                ...prev.images,
                [product.id + data]: {
                  index: lastIndex,
                  image: product.gallery[lastIndex],
                },
              },
            }
          } else {
            return {
              images: {
                ...prev.images,
                [product.id + data]: {
                  index,
                  image: product.gallery[index],
                },
              },
            }
          }
        })
      }
    }
  }
  render() {
    return (
      <div className="cart-container">
        <div className="cart-header">Cart</div>
        {this.props.cart.map((cartItem) => {
          const { product, selectedAttrs, quantity } = cartItem
          return (
            <div
              className="cart-Item"
              key={`${product.id}${quantity}${JSON.stringify(selectedAttrs)}`}
            >
              <div key={1} className="cart-item-info">
                <div className="cart-item-header" key={1}>
                  <div>{product.name}</div>
                  <div>{product.brand}</div>
                </div>
                <div key={2}>
                  {this.props.currentCurrency.symbol}
                  {product.prices
                    .filter(
                      (price) => price.currency.label === this.props.currentCurrency.label
                    )[0]
                    .amount.toFixed(2)}
                </div>
                <div className="cart-item-attrs" key={3}>
                  {Object.prototype.hasOwnProperty.call(selectedAttrs, "attr") &&
                    Object.keys(selectedAttrs["attr"]).length !== 0 &&
                    Object.keys(selectedAttrs["attr"]).map((attrt) => {
                      if (attrt === "Color") {
                        return (
                          <div className="cart-item-attrs-attr-container" key={attrt}>
                            <div className="mini-cart-item-attrs-header">{attrt}</div>
                            <div className="cart-item-attrs-attr" key={attrt}>
                              {Object.keys(selectedAttrs["attr"][attrt]).map((item) => {
                                if (
                                  selectedAttrs["attr"][attrt][item].selected === true
                                ) {
                                  return (
                                    <div
                                      key={selectedAttrs["attr"][attrt][item].value}
                                      className="outer-selected  sele-border"
                                    >
                                      <SwatchComp
                                        selectedAttrs={selectedAttrs}
                                        item={item}
                                      />
                                    </div>
                                  )
                                } else {
                                  return (
                                    <div
                                      key={selectedAttrs["attr"][attrt][item].value}
                                      className="outer-selected"
                                    >
                                      <SwatchComp
                                        selectedAttrs={selectedAttrs}
                                        item={item}
                                      />
                                    </div>
                                  )
                                }
                              })}
                            </div>
                          </div>
                        )
                      }
                      return (
                        <div className="cart-item-attrs-attr-container" key={attrt}>
                          <div className="mini-cart-item-attrs-header">{attrt}</div>
                          <div className="cart-item-attrs-attr" key={attrt}>
                            {Object.keys(selectedAttrs["attr"][attrt]).map((item) => {
                              if (selectedAttrs["attr"][attrt][item].selected === true) {
                                return (
                                  <div
                                    key={selectedAttrs["attr"][attrt][item].value}
                                    className="selected"
                                  >
                                    {selectedAttrs["attr"][attrt][item].value}
                                  </div>
                                )
                              } else {
                                return (
                                  <div key={selectedAttrs["attr"][attrt][item].value}>
                                    {selectedAttrs["attr"][attrt][item].value}
                                  </div>
                                )
                              }
                            })}
                          </div>
                        </div>
                      )
                    })}
                </div>
              </div>
              <div key={2} className="cart-item-qimg">
                <div className="dec-inc-product">
                  <button
                    disabled={quantity > 10}
                    onClick={() => this.handleInc(product.id, selectedAttrs)}
                  >
                    +
                  </button>
                  <div className="cart-dec-inc-quantity">{quantity}</div>
                  <button
                    disabled={quantity < 2}
                    onClick={() => this.handleDec(product.id, selectedAttrs)}
                  >
                    -
                  </button>
                </div>
                <div className="cart-img">
                  {product.gallery.length > 1 && (
                    <div className="lr-arrow-container">
                      <div
                        onClick={(e) => this.handleLeftArrow(e, product, selectedAttrs)}
                        className="left-arrow-container"
                      >
                        <LeftArrow width={15} height={15} className="left-arrow-icon" />
                      </div>
                      <div
                        onClick={(e) => this.handleRightArrow(e, product, selectedAttrs)}
                        className="right-arrow-container"
                      >
                        <RightArrow className="right-arrow-icon" width={15} height={15} />
                      </div>
                    </div>
                  )}
                  <img
                    src={
                      this.state.images !== undefined &&
                      this.state.images[product.id + getAllSelectedAttr(selectedAttrs)]
                        ? this.state.images[
                            product.id + getAllSelectedAttr(selectedAttrs)
                          ].image
                        : product.gallery.length === 1
                        ? product.gallery[0]
                        : ""
                    }
                    alt="product overview"
                  />
                  <div
                    onClick={() =>
                      this.handleRemoveCartProduct(product.id, selectedAttrs)
                    }
                    className="cart-img-x"
                  >
                    <CancelItem />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="cart-total">
          <div className="total-item">
            <p>Tax 21%:</p>
            <p>
              {this.props.currentCurrency.symbol} {(this.props.total * 0.21).toFixed(2)}
            </p>
          </div>
          <div className="total-item">
            <p>Amount:</p>
            <p>{this.props.totalItems}</p>
          </div>
          <div className="total-item" key={1}>
            <p>Total:</p>
            <p>
              {this.props.currentCurrency.symbol} {this.props.total.toFixed(2)}
            </p>
          </div>
        </div>
        <div className="cart-btns">
          <button onClick={() => this.handleNavigateToCart()} key={1}>
            Add New Items
          </button>
          <button key={2}>Order</button>
        </div>
      </div>
    )
  }
}
function mapStateToProps(state) {
  let total = 0
  let totalItems = 0
  // calculate the total items number and total price
  if (state.cart.length !== 0) {
    for (const cartItem of state.cart) {
      const quantity = cartItem.quantity
      const price = cartItem.product.prices.filter(
        (price) => price.currency.label === state.currentCurrency.label
      )[0].amount
      const cartItemPrice = price * quantity
      total += cartItemPrice
      totalItems += quantity
    }
  }

  return {
    currentCurrency: state.currentCurrency,
    cart: state.cart,
    total,
    totalItems,
  }
}

export default connect(mapStateToProps)(withRouter(Cart))
