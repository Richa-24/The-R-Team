import React from "react";
import { Link } from "react-router-dom";
import Template from "./Template";
import styles from "./Style.module.css";

export default class Dashboard extends React.Component {
  constructor(props) {
    super(props);

    this.state = {};
  }

  handleLogout = () => {
    window.localStorage.clear();
    this.props.history.push("/login");
  };

  render() {
    let gotItem = JSON.parse(window.localStorage.getItem("user"));
    return (
      <div>
        <h1>Dashboard</h1>
        {gotItem === null ? (
          <Link to="/login">Login</Link>
        ) : (
          <>
            <button onClick={this.handleLogout}>Logout</button>
            <Template />
          </>
        )}
      </div>
    );
  }
}
