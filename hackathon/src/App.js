import React from "react";
import "./App.css";
import { Switch, Route, Link } from "react-router-dom";
import About from "./Component/About";
import Dashboard from "./Component/Dashboard";
import Login from "./Component/Login";

function App() {
  return (
    <div className="App">
      <Link to="/">Home</Link>
      <Link to="/about">About</Link>

      <Switch>
        <Route path="/about">
          <About />
        </Route>
        <Route path="/" exact component={Dashboard}></Route>
        <Route path="/login" component={Login}></Route>
      </Switch>
    </div>
  );
}

export default App;
