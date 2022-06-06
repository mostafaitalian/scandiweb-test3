import React, { Component } from "react"

import PropTypes from "prop-types"

import { ReactComponent as AddCart } from "../../logos/Vector.svg"

class ProductItemInfo extends Component {
  state = {
    clicked: false,
  }
  static propTypes = {
    product: PropTypes.object,
    dNone: PropTypes.bool.isRequired,
    symbol: PropTypes.string,
    amount: PropTypes.number,
    handleClickOnAddCart: PropTypes.func,
  }

  render() {
    const { product, dNone, symbol, amount, handleClickOnAddCart } = this.props
    return (
      <div className="product-item-info">
        <h4>
          {product.name} {product.brand}
        </h4>
        <h4>
          {symbol} {amount}
        </h4>
        {dNone && (
          <div
            onClick={(e) => {
              e.stopPropagation()
              this.setState(
                {
                  clicked: true,
                },
                () => {
                  setTimeout(() => {
                    this.setState({ clicked: false })
                  }, 500)
                }
              )
              handleClickOnAddCart(product)
            }}
            className={`product-add-cart ${
              this.state.clicked ? "product-add-cart-clicked" : ""
            }`}
          >
            <AddCart height={25} width={25} />
          </div>
        )}
      </div>
    )
  }
}

export default ProductItemInfo
