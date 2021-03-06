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
        <img
          src="https://www.creativefabrica.com/wp-content/uploads/2018/10/Blue-Letter-s-modern-Logo-by-yahyaanasatokillah-580x387.jpg"
          width="400"
        />
        <h1 className={styles.logoName}>Schomato</h1>
        {gotItem === null ? (
          <Link to="/login" className={styles.loginBtn}>
            Login
          </Link>
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
