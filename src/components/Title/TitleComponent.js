import React, { Component } from "react"

import { Query } from "@apollo/client/react/components"
import { gql } from "@apollo/client"
import PropTypes from "prop-types"

import NavComponent from "../Nav/NavComponent"
const categotiesQuery = gql`
  query categories {
    categories {
      name
    }
  }
`

class TitleComponent extends Component {
  static propTypes = {
    handleCloseCarMenu: PropTypes.func,
    handleCloseCurMenu: PropTypes.func,
    handleShowCart: PropTypes.func,
    handleShowCurrency: PropTypes.func,
    car: PropTypes.object,
    changeInitialTitle: PropTypes.func,
    initialTitle: PropTypes.string,
    currency: PropTypes.object,
  }

  render() {
    const {
      handleCloseCarMenu,
      handleCloseCurMenu,
      handleShowCart,
      handleShowCurrency,
      currency,
      car,
      initialTitle,
      changeInitialTitle,
    } = this.props
    return (
      <Query query={categotiesQuery}>
        {(result) => {
          if (result.loading === true) {
            return <NavComponent loading={true} />
          } else {
            return (
              <NavComponent
                handleCloseCarMenu={handleCloseCarMenu}
                handleCloseCurMenu={handleCloseCurMenu}
                handleShowCart={handleShowCart}
                handleShowCurrency={handleShowCurrency}
                categoriesTitles={result.data}
                currency={currency}
                car={car}
                // cartt={this.props.cartt}
                initialTitle={initialTitle}
                changeInitialTitle={changeInitialTitle}
                loading={false}
              />
            )
          }
        }}
      </Query>
    )
  }
}

export default TitleComponent
