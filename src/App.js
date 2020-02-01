import React from 'react';
import logo from './logo.svg';
import { Link, BrowserRouter as Router, Switch, Route } from "react-router-dom";
import './App.css';

function App() {
  return (
    <div>
      <Helmet>
        <meta
          name="viewport"
          content="minimum-scale=1, initial-scale=1, width=device-width"
        />
      </Helmet>
      <Router className="App">
        <Link to="/login">Go to login</Link>
        <Switch>
          <Route path="/login">
            <div>Login route</div>
          </Route>
          <Route path="/job">
            <div>job route</div>
          </Route>
          <Route path="/profile">
            <div>profile route</div>
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
