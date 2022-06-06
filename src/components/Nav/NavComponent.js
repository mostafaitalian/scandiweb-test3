import React, { Component, Fragment } from "react"
import { NavLink, withRouter } from "react-router-dom"
import FadingBalls from "react-cssfx-loading/lib/FadingBalls"

import { connect } from "react-redux"

import PropTypes from "prop-types"

import { ReactComponent as DownArrow } from "../../logos/da.svg"
import { ReactComponent as EmptyCart } from "../../logos/emptycart.svg"
import { ReactComponent as FullCart } from "../../logos/fullcart.svg"
import { ReactComponent as ColorCart } from "../../logos/svg 3.svg"
import { ReactComponent as ColCart } from "../../logos/svg 19.svg"

import CurrencyList from "../CurrencyList/CurrencyList"
import MiniCart from "../MiniCart/MiniCart"

import { NavHeader } from "./NavComponent.style"

import "./navcomponent.style.css"

class NavComponent extends Component {
  constructor(props) {
    super(props)
    this.cartRef = React.createRef()
    this.curRef = React.createRef()
  }
  static propTypes = {
    handleCloseCarMenu: PropTypes.func,
    handleCloseCurMenu: PropTypes.func,
    changeInitialTitle: PropTypes.func,
    handleShowCurrency: PropTypes.func,
    handleShowCart: PropTypes.func,
    history: PropTypes.object,
    car: PropTypes.object,
    currencies: PropTypes.array,
    currentCurrency: PropTypes.object,
    cart: PropTypes.array,
    location: PropTypes.object,
    loading: PropTypes.bool,
    currency: PropTypes.object,
    categories: PropTypes.arrayOf(Object),
    categoriesTitles: PropTypes.object,
    totalItems: PropTypes.number,
  }

  handleOnClick = (t) => {
    this.props.changeInitialTitle(t)
  }

  handleShowHide = (e) => {
    if (e.target === this.curRef.current) {
      this.props.handleCloseCarMenu()
      this.props.handleShowCurrency()
    } else if (e.target === this.cartRef.current) {
      this.props.handleCloseCurMenu()

      this.props.handleShowCart()
    }
  }
  handleNavToCart = () => {
    this.props.handleCloseCarMenu()
    this.props.handleCloseCurMenu()
    this.props.history.push("/cart")
  }
  render() {
    const activeStyle = {
      color: "#5ECE7B",
      borderBottom: "2px solid",
      fontFamily: "Raleway",
      fontStyle: "normal",
      fontWeight: "600",
      fontSize: "16px",
      lineHeight: "120%",
    }

    const { loading, categoriesTitles: titles } = this.props

    return (
      <NavHeader>
        {/* <div
          onClick={() => this.props.handleCloseCarMenu()}
          className={`cart-overlay-container ${
            this.props.car !== undefined ? this.props.car.class : "hide"
          }`}
        ></div> */}
        <div className="item first">
          {loading === true && <FadingBalls color="#00FF00" />}
          {loading === false &&
            titles &&
            titles.categories.map((category) => (
              <NavLink
                to={{ pathname: `/${category.name}` }}
                isActive={() => this.props.location.pathname.includes(category.name)}
                activeStyle={activeStyle}
                onClick={() => this.handleOnClick(category.name)}
                className="cat-item"
                key={category.name}
              >
                {category.name.toUpperCase()}
              </NavLink>
            ))}
        </div>
        <div className="item" onClick={() => this.handleNavToCart()}>
          <ColorCart width={25} height={25} />
          <div className="inside-color-cart-icon">
            <ColCart width={15} height={15} />
          </div>
        </div>

        <div className="item">
          <div
            // ref={this.curRef}
            // onClick={(e) => this.handleShowHide(e)}
            className="currency-switcher-container"
          >
            <div
              ref={this.curRef}
              onClick={(e) => this.handleShowHide(e)}
              className="currency-switcher-container"
            >
              <Fragment>
                {this.props.currentCurrency.symbol}
                <DownArrow
                  width={8}
                  height={7}
                  // ref={this.curRef}
                  // onClick={(e) => this.handleShowHide(e)}
                />
              </Fragment>
            </div>
            {/* <div
                ref={this.curRef}
                onClick={(e) => this.handleShowHide(e)}
                className="currency-switcher-arrow"
              >
                <DownArrow width={8} height={7} />
              </div> */}
            <div
              className={`arrow-layout ${
                this.props.currency !== undefined ? this.props.currency.class : "hide"
              }`}
            >
              <CurrencyList
                currencies={this.props.currencies}
                handleCloseCurMenu={this.props.handleCloseCurMenu}
              />
            </div>
          </div>

          <div className="cart-nav-container">
            {this.props.cart.length === 0 ? (
              <EmptyCart
                ref={this.cartRef}
                onClick={(e) => this.handleShowHide(e)}
                width={20}
                height={16}
              />
            ) : (
              <Fragment
              // ref={this.cartRef}
              // onClick={(e) => this.handleShowHide(e)}
              // className="full-cart-container"
              >
                <FullCart
                  ref={this.cartRef}
                  onClick={(e) => this.handleShowHide(e)}
                  width={23}
                  height={16}
                />
                <div
                  // ref={this.cartRef}
                  // onClick={(e) => this.handleShowHide(e)}
                  className="cart-items-count"
                >
                  {this.props.totalItems}
                </div>
              </Fragment>
            )}
            <div
              className={`cart-layout ${
                this.props.car !== undefined ? this.props.car.class : "hide"
              }`}
            >
              <MiniCart handleCloseCarMenu={this.props.handleCloseCarMenu} />
            </div>
          </div>
        </div>
      </NavHeader>
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
  const category = state.categories.filter((category) => category.name === state.title)

  return {
    category,
    currencies: state.currencies,
    currentCurrency: state.currentCurrency,
    cart: state.cart,
    total,
    totalItems,
  }
}

export default connect(mapStateToProps)(withRouter(NavComponent))
