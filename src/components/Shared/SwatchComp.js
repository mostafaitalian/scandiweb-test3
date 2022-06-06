import React, { Component } from "react"
import PropTypes from "prop-types"

class SwatchComp extends Component {
  static propTypes = {
    selectedAttrs: PropTypes.object,
    item: PropTypes.string,
    style: PropTypes.object,
    itemm: PropTypes.object,
    ref: PropTypes.string,
    data: PropTypes.string,
    keyy: PropTypes.string,
    className: PropTypes.string,
    handleSelect: PropTypes.func,
    attribute: PropTypes.object,
  }
  render() {
    let { selectedAttrs, item, itemm } = this.props
    if (selectedAttrs === null) {
      return (
        <div
          style={this.props.style}
          ref={this.props.ref}
          data-g={this.props.data}
          className={this.props.className}
          key={this.props.keyy}
          onClick={(e) =>
            this.props.handleSelect(e, {
              attrName: this.props.attribute.name,
              selectedItem: {
                id: itemm.id,
                value: itemm.value,
                displayValue: itemm.displayValue,
              },
            })
          }
        ></div>
      )
    }
    return (
      <div
        style={
          selectedAttrs !== null
            ? {
                backgroundColor: selectedAttrs["attr"]["Color"][item].value,
                height: "100%",
              }
            : this.props.style
        }
      ></div>
    )
  }
}

export default SwatchComp
