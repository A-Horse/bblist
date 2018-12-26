//
import React, { Component } from "react";
import Checkbox from "../CheckBox/CheckBox";
import "./StarCheckbox.scss";

export class StarCheckBox extends Checkbox {
  constructor(props) {
    super(props);

    this.domChecked = <i className="fa fa-star" aria-hidden="true" />;
    this.domUnchecked = <i className="fa fa-star-o" aria-hidden="true" />;

    this.className = "checkbox star";
  }
}
