import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { withRouter } from "react-router-dom"

import {
  incProductQuantity,
  decProductQuantity,
  removeProductCart,
} from "../../redux/actions/Cart"
import { getSelectedAtt } from "../../utils"

import "./minicart.style.css"
import CancelItem from "../Cart/CancelItem"
import SwatchComp from "../Shared/SwatchComp"

class MiniCart extends Component {
  state = { total: 0 }
  static propTypes = {
    dispatch: PropTypes.func,
    currentCurrency: PropTypes.object,
    cart: PropTypes.array,
    total: PropTypes.number,
    totalItems: PropTypes.number,
    totalItem: PropTypes.number,
    history: PropTypes.object,
    handleCloseCarMenu: PropTypes.func,
  }

  handleInc = (id, selectedAttrs) => {
    this.props.dispatch(incProductQuantity(id, getSelectedAtt(id, selectedAttrs)))
  }
  handleDec = (id, selectedAttrs) => {
    this.props.dispatch(decProductQuantity(id, getSelectedAtt(id, selectedAttrs)))
  }
  handleRemoveCartProduct = (producId, selectedAttrs) => {
    this.props.dispatch(
      removeProductCart(producId, getSelectedAtt(producId, selectedAttrs))
    )
  }
  handleNavigateToCart = () => {
    this.props.history.push(`/cart`)
    this.props.handleCloseCarMenu()
  }
  render() {
    return (
      <div className="mini-cart-container">
        <div className="mini-cart-title">
          My Bag, <span>{this.props.totalItems} </span>
          <span>{this.props.totalItems === 1 ? "item" : "items"}</span>
        </div>
        {this.props.cart.map((cartItem) => {
          const { product, selectedAttrs, quantity } = cartItem
          return (
            <div
              className="mini-cart-Item"
              key={`${product.id}${quantity}${JSON.stringify(selectedAttrs)}`}
            >
              <div key={1} className="mini-cart-item-info">
                <div className="mini-cart-item-header" key={1}>
                  <div>{product.name}</div>
                  <div>{product.brand}</div>
                </div>
                <div key={2}>
                  {this.props.currentCurrency.symbol}&nbsp;
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
                          <div className="mini-cart-item-attrs-cnttainer" key={attrt}>
                            <div className="mini-cart-item-attrs-header">{attrt}:</div>
                            <div className="mini-cart-item-attrs-attr">
                              {Object.keys(selectedAttrs["attr"][attrt]).map((item) => {
                                if (
                                  selectedAttrs["attr"][attrt][item].selected === true
                                ) {
                                  return (
                                    <div
                                      key={selectedAttrs["attr"][attrt][item].value}
                                      className="mini-outer-selected  sele-border"
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
                                      className="mini-outer-selected"
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
                        <div className="mini-cart-item-attrs-cnttainer" key={attrt}>
                          <div className="mini-cart-item-attrs-header">{attrt}:</div>
                          <div className="mini-cart-item-attrs-attr">
                            {Object.keys(selectedAttrs["attr"][attrt]).map((item) => {
                              if (selectedAttrs["attr"][attrt][item].selected === true) {
                                return (
                                  <div
                                    key={selectedAttrs["attr"][attrt][item].value}
                                    className="selected-mini"
                                  >
                                    {selectedAttrs["attr"][attrt][item].value}
                                  </div>
                                )
                              } else {
                                return (
                                  <div
                                    className="not-selected"
                                    key={selectedAttrs["attr"][attrt][item].value}
                                  >
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
              <div key={2} className="mini-cart-item-qimg">
                <div className="dec-inc-product" key={1}>
                  <button
                    disabled={quantity > 10}
                    onClick={() => this.handleInc(product.id, selectedAttrs)}
                  >
                    +
                  </button>
                  <div className="mini-cart-dec-inc-quantity">{quantity}</div>
                  <button
                    disabled={quantity < 2}
                    onClick={() => this.handleDec(product.id, selectedAttrs)}
                  >
                    -
                  </button>
                </div>
                <div className="mini-cart-img" key={2}>
                  <img src={product.gallery[0]} alt="product overview" />
                  <div
                    onClick={() =>
                      this.handleRemoveCartProduct(product.id, selectedAttrs)
                    }
                    className="mini-cart-img-x"
                  >
                    <CancelItem />
                  </div>
                </div>
              </div>
            </div>
          )
        })}
        <div className="mini-cart-total">
          <div className="total-value" key={1}>
            Total
          </div>
          <div className="total-amount" key={2}>
            {this.props.currentCurrency.symbol} {this.props.total.toFixed(2)}
            {/* {(this.props.cart.length !== 0 && this.props.cart !== undefined && this.props.cart.product !== undefined && this.props.currentCurrency) && this.totalCost(this.props.cart,this.props.currentCurrency)} */}
          </div>
        </div>
        <div className="mini-cart-btns">
          <button onClick={() => this.handleNavigateToCart()} key={1}>
            View Bag
          </button>
          <button key={2}>Checkout</button>
        </div>
      </div>
    )
  }
}

function mapStateToProps(state) {
  let total = 0
  let totalItems = 0
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
    totalItem: state.cart.length,
  }
}
export default connect(mapStateToProps)(withRouter(MiniCart))
