import React, { Component, CSSProperties } from "react";
import octopusImage from "../../../assets/octopus.png";

export class Logo extends Component<{
  style?: CSSProperties
}> {
  render() {
    return (
      <img
        src={octopusImage}
        style={
          {
            width: "30px",
            height: "30px",
            borderRadius: "50%",
            marginTop: "5px",
            ...this.props.style
          }}
      />
    );
  }
}
