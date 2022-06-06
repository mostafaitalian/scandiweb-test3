import React, { Component } from "react"
import { connect } from "react-redux"
import PropTypes from "prop-types"

import { changeCurrentCurrency } from "../../redux/actions/CurrentCurrency"

import { StyledCurrencyList, CurrencyListItem } from "./CurrencyList.styles"

class CurrencyList extends Component {
  static propTypes = {
    currencies: PropTypes.array,
    dispatch: PropTypes.func,
    handleCloseCurMenu: PropTypes.func,
  }

  handleOnClick = (currency) => {
    this.props.dispatch(changeCurrentCurrency(currency))
    this.props.handleCloseCurMenu()
  }

  render() {
    // destructring currencies
    const { currencies } = this.props
    return (
      // currency list
      <StyledCurrencyList>
        {currencies.map((currency) => (
          <CurrencyListItem
            key={currency.label}
            onClick={() => this.handleOnClick(currency)}
          >
            {currency.symbol} {currency.label}
          </CurrencyListItem>
        ))}
      </StyledCurrencyList>
    )
  }
}

export default connect()(CurrencyList)
