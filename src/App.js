import React from 'react';
import logo from './logo.svg';
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';
import Login from "./components/Login"
import Profile from "./components/Profile"
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar"
import { authRef, dbRef } from "./components/Firebase"
function App() {
  let isLoggedIn = false;
  function checkIfLogged() {
    if(authRef.currentUser !== null) {
      isLoggedIn = true;
    }

    checkIfLogged()
  }

  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <Navbar isLoggedIn = {isLoggedIn}></Navbar>
      <Router className="App">
        <Switch>
          <Route path="/login">
            <Login />
          </Route>
          <Route path="/job">
            <div>job route</div>
          </Route>
          <Route path="/profile">
            <Profile />
          </Route>
          <Route path="/">
            <div>any other route route</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
