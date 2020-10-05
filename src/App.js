import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Login from "../src/components/Auth/Login";
import Logout from "../src/components/Auth/Logout";
import Register from "../src/components/Auth/Register";
import Pay from "../src/components/Pay/Pay";
import Note from "../src/components/Note/Note";


function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <Route exact path="/">
            <h2>Home</h2>
            <div>
              {localStorage.getItem("pseudo") ? <Logout/> : <Link to="/login">Login</Link>}
            </div>
            <div><Link to="/note">Note</Link></div>
            <div><Link to="/pay">Pay</Link></div>
            
            
          </Route>
          <Route exact path="/login">
            <Login />
          </Route>
          <Route exact path="/logout">
            <Logout />
          </Route>
          <Route exact path="/register">
            <Register />
          </Route>
          <Route exact path="/pay">
            <Pay />
          </Route>
          <Route exact path="/note">
            <Note />
          </Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
