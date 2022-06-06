/* eslint-disable react/prop-types */
import React, { Component } from "react"

import SwatchComp from "../Shared/SwatchComp"

// import SwatchComp from "../Shared/SwatchComp"

class AttributeItem extends Component {
  render() {
    let { item, attribute, className, style, handleSelect } = this.props
    let bgStyle = style !== null && { backgroundColor: style }
    if (attribute.type === "swatch") {
      return (
        <SwatchComp
          style={bgStyle}
          selectedAttrs={null}
          ref={this.divRef}
          data={`${item.value}`}
          className={className}
          attribute={attribute}
          handleSelect={handleSelect}
          itemm={item}
          keyy={item.value}
        />
      )
    }
    return (
      <div
        ref={this.divRef}
        data-g={`${item.value}`}
        className={className}
        onClick={(e) =>
          handleSelect(e, {
            attrName: attribute.name,
            selectedItem: {
              id: item.id,
              value: item.value,
              displayValue: item.displayValue,
            },
          })
        }
        key={item.value}
      >
        {attribute.type !== "swatch" ? item.value : ""}
      </div>
    )
  }
}

export default AttributeItem
