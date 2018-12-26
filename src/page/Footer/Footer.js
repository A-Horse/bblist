import React, { Component } from "react";

export const FooterHeight = 20;

const styles = {
  container: {
    height: `${FooterHeight}px`
  }
};

class Footer extends Component {
  constructor() {
    super();
  }

  componentWillMount() {}

  componentDidMount() {}

  componentDidUpdate() {}

  render() {
    return <footer style={styles.container}>@copyright</footer>;
  }
}

export default Footer;
