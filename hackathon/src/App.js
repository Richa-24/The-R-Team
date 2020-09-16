import React from "react";
// import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import About from "./Component/About";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";
import styles from "./Component/Style.module.css"

function App() {
  return (
    <div className="App">
      <div className={styles.homeAndAboutContainer}>
        <Link className={styles.homeLink} to="/">Home <i className="fa fa-home"></i> </Link>
        <Link className={styles.homeLink} to="/about">About <i className="fa fa-question-circle"></i> </Link>
      </div>
      

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <div className={styles.DashboardLoginMainComponent}>
          <Route path="/" exact component={Dashboard}></Route>
          <Route path="/login" component={Login}></Route>
        </div>
        
      </Switch>
    </div>
  );
}

export default App;
