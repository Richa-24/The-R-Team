import React from "react";
import styles from "./Style.module.css"

export default class About extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  render() {
    return <h1 className={styles.AboutText}>About</h1>;
  }
}
