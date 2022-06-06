import React, { Component } from "react"
import "./attributes.style.css"
import PropTypes from "prop-types"

// import SwatchComp from "../Shared/SwatchComp"

import AttributeItem from "./AttributeItem"

class Attributes extends Component {
  constructor(props) {
    super(props)
    this.state = {
      x: "",
    }
  }

  static propTypes = {
    attributes: PropTypes.array,
    resetFlag: PropTypes.func,
    handleAddSelectedAttrs: PropTypes.func,
    handleOnSelect: PropTypes.func,
    items: PropTypes.object,
    product: PropTypes.object,
  }

  handleSelect = (e, attr) => {
    this.props.resetFlag()
    this.props.handleOnSelect(e, attr)
  }

  render() {
    // destructing attributes from props
    let attributes
    // modified
    // if (this.props.product !== undefined) {
    //   attributes = this.props.product.attributes
    // }
    attributes = this.props.product?.attributes
    return (
      <div>
        {attributes &&
          attributes.map((attribute) => {
            let items
            if (attribute.items && attribute.items.length !== 0) {
              items = attribute.items
            }
            return (
              <div className="attr-container" key={attribute.name}>
                <div className="attr-title">{attribute.name.toUpperCase()}:</div>
                {attribute.type !== "swatch" ? (
                  <div className="items-container">
                    {items !== undefined &&
                      this.props.items &&
                      items.map((item) => {
                        let v,
                          x = ""
                        if (
                          this.props.items[attribute.name] !== undefined &&
                          Object.keys(this.props.items).length !== 0
                        ) {
                          v = item.value
                          x = this.props.items[attribute.name]
                        }

                        return (
                          <AttributeItem
                            className={
                              x !== undefined && v !== undefined ? `${x[v].class}` : ""
                            }
                            key={item.value}
                            attribute={attribute}
                            item={item}
                            handleSelect={this.handleSelect}
                          />
                        )
                      })}
                  </div>
                ) : (
                  <div className="sitems-container">
                    {items !== undefined &&
                      items.map((item) => {
                        let v,
                          x = ""
                        if (
                          this.props.items[attribute.name] !== undefined &&
                          Object.keys(this.props.items).length !== 0
                        ) {
                          v = item.value
                          x = this.props.items[attribute.name]
                        }
                        return (
                          <AttributeItem
                            style={item.value || null}
                            className={
                              x !== undefined && v !== undefined ? `${x[v].class}` : ""
                            }
                            key={item.value}
                            attribute={attribute}
                            item={item}
                            handleSelect={this.handleSelect}
                          />
                        )
                      })}
                  </div>
                )}
              </div>
            )
          })}
      </div>
    )
  }
}
export default Attributes
