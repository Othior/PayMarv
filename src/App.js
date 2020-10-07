import React from 'react';
import { BrowserRouter as Router, Route, Switch, Link } from "react-router-dom";
import './App.css';
import Header from "../src/components/Header/Header"
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
            <Header>

            
            </Header>
            <h2>Home</h2>
            
            
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
