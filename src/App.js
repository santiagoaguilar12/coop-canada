import React from "react";
import logo from "./logo.svg";
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";

import "./App.css";
import Login from "./components/Login";
import { Helmet } from "react-helmet";
import Navbar from "./components/Navbar";
import Profile from "./components/Profile"
import Jobs from "./components/Jobs";
import JobDetail from "./components/JobDetail";
import { authRef } from "./components/Firebase"
import { useState, useEffect } from 'react';
import SignUp from './components/Sign-Up';
function App() {
  
  const [isLoggedIn, setIfLoggedIn] = useState(false);
  const [isOnLoginPage, setIsOnLoginPage] = useState(false);
  useEffect(async () => {
      async function checkIfLogged() {
      if(await authRef.currentUser !== null) {
         setIfLoggedIn(true) ;
      } else {
        setIfLoggedIn(false);
      }
    }
    checkIfLogged()
  },[]);
  const onLoginPage = () => {
    setIsOnLoginPage(true)
  }
  const notOnLoginPage = () => {
    setIsOnLoginPage(false)
  }
  
  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
     

      <Router className="App">
      {!isOnLoginPage &&
        <Navbar isLoggedIn = {isLoggedIn} isOnLoginPage = {isOnLoginPage}></Navbar>
      }
        <Switch>
          <Route path="/login" >
            <Login onLoginPage = {onLoginPage} />
          </Route>
          <Route path="/jobs">
            <Jobs  notOnLoginPage= {notOnLoginPage} />
          </Route>
          <Route path="/job">
            <JobDetail />
          </Route>
          <Route path="/profile">
            <Profile firstName="Adam" lastName="Cooke" notOnLoginPage= {notOnLoginPage} />
          </Route>
          <Route path="/signup">
            <SignUp onLoginPage = {onLoginPage}/>
          </Route>
          <Route path="/" >
            <div>any other route route</div>
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
